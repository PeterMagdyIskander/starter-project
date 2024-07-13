import { createStore } from 'vuex'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';

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
      commit('setFailed', true)
      commit('setLoading', true)
      const provider = new GoogleAuthProvider();
      return signInWithPopup(getAuth(), provider).then(res => {

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
              }
              setDoc(doc(firestore, "users", res.user.uid), user, { merge: true }).then(() => {
                commit('setUser', user);
                resolve(user);
              }).catch(reject);
            } else {
              const userDoc = doc(userCollectionReference, res.user.uid)
              onSnapshot(userDoc, snapshot => {
                const data = snapshot.data();
                user = {
                  uid: res.user.uid,
                  ...data
                }
                commit('setUser', user);
                resolve(user);
              }, reject);
            }
          }, reject);
        });
      }).catch(err => {
        console.error(err)
        commit('setFailed', true)
      }).finally(() => {
        commit('setLoading', false)
      })
    },
    updateUser({ commit }, user) {
      commit('setUser', user);
    },
    setQuests({ commit }) {
      const firestore = getFirestore();
      const questsCollectionReference = collection(firestore, 'quests');
      onSnapshot(questsCollectionReference, snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        commit('setQuests', data)
      })
    }
  },
  modules: {
  }
})