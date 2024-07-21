import { createStore } from 'vuex'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';

function areCredentialsValid(credentials) {
  if (!credentials) return false;
  const { token, expiry } = credentials;
  const now = new Date().getTime();
  return token && expiry && now < expiry;
}

function saveCredentials(credentials) {
  localStorage.setItem('userCredentials', JSON.stringify(credentials));
}

function getStoredCredentials() {
  const storedCredentials = localStorage.getItem('userCredentials');
  return storedCredentials ? JSON.parse(storedCredentials) : null;
}

export default createStore({
  state: {
    user: null,
    quests: [],
    loading: false,
    failed: false,
  },
  getters: {
    getUser: (state) => state.user,
    getQuests: (state) => state.quests,
    getLoading: (state) => state.loading,
    getFailed: (state) => state.failed
  },
  mutations: {
    setUser: (state, user) => (state.user = user),
    setQuests: (state, quests) => (state.quests = quests),
    setLoading: (state, loading) => (state.loading = loading),
    setFailed: (state, failed) => (state.failed = failed)
  },
  actions: {
    async login({ commit }) {
      commit('setFailed', false);
      commit('setLoading', true);

      const storedCredentials = getStoredCredentials();
      if (areCredentialsValid(storedCredentials)) {
        commit('setUser', storedCredentials.user);
        commit('setLoading', false);
        return Promise.resolve(storedCredentials.user);
      }

      const provider = new GoogleAuthProvider();
      return signInWithPopup(getAuth(), provider).then(async res => {
        const firestore = getFirestore();
        const userCollectionReference = collection(firestore, 'users');

        let allUsers = [];
        return new Promise((resolve, reject) => {
          onSnapshot(userCollectionReference, snapshot => {
            allUsers = snapshot.docs.map(doc => doc.id);
            let newUser = !allUsers.includes(res.user.uid);
            let user = null;
            if (newUser) {
              user = {
                uid: res.user.uid,
                name: res.user.displayName,
                assignedQuestId: "",
                isTeamLead: false,
                email: res.user.email
              }
              setDoc(doc(firestore, "users", res.user.uid), user, { merge: true }).then(() => {
                const credentials = {
                  user,
                  token: res.user.accessToken,
                  expiry: new Date().getTime() + 3600 * 1000 // 1 hour expiry
                };
                saveCredentials(credentials);
                commit('setUser', user);
                resolve(user);
              }).catch(reject);
            } else {
              const userDoc = doc(userCollectionReference, res.user.uid);
              onSnapshot(userDoc, snapshot => {
                const data = snapshot.data();
                user = {
                  uid: res.user.uid,
                  email: res.user.email,
                  ...data
                }
                const credentials = {
                  user,
                  token: res.user.accessToken,
                  expiry: new Date().getTime() + 3600 * 1000 // 1 hour expiry
                };
                saveCredentials(credentials);
                commit('setUser', user);
                resolve(user);
              }, reject);
            }
          }, reject);
        });
      }).catch(err => {
        console.error(err);
        commit('setFailed', true);
      }).finally(() => {
        commit('setLoading', false);
      });
    },
    updateUser({ commit }, user) {
      commit('setUser', user);
    },
    setQuests({ commit }) {
      const firestore = getFirestore();
      const questsCollectionReference = collection(firestore, 'quests');
      onSnapshot(questsCollectionReference, snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        commit('setQuests', data);
      });
    }
  },
  modules: {
  }
});