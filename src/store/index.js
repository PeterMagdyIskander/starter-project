import { createStore } from 'vuex'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot, updateDoc, setDoc, increment } from 'firebase/firestore';
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
    login({ commit }) {
      commit('setFailed', true)
      commit('setLoading', true)
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider).then(res => {
        
        const firestore = getFirestore();
        const userCollectionReference = collection(firestore, 'users');

        let allUsers = [];
        let newUser = false;
        onSnapshot(userCollectionReference, snapshot => {
          allUsers = snapshot.docs.map(doc => doc.id);
          if (!allUsers.includes(res.user.uid)) {//new user
            newUser = true;
            let userDB = {}
            setDoc(doc(firestore, "users", res.user.uid), {
              name: res.user.displayName,
            }, { merge: true });
          }
          let user = {
            name: res.user.displayName,
          }
          commit('setUser', user)
        })
        
        commit('setFailed', false)
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
