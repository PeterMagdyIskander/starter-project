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
        let shouldLevelUp = false;
        let nextExp = 0;
        let nextLevel = 0;
        const firestore = getFirestore();
        const userCollectionReference = collection(firestore, 'users');

        let allUsers = [];
        let newUser = false;
        onSnapshot(userCollectionReference, snapshot => {
          allUsers = snapshot.docs.map(doc => doc.id);
          if (!allUsers.includes(res.user.uid)) {
            newUser = true;
            let userDB = {}
            setDoc(doc(firestore, "users", res.user.uid), {
              assignedQuestId: "",
              attackAmp: 1,
              blockAmp: 1,
              healAmp: 1,
              exp: 0,
              gold: 0,
              level: 1,
              name: res.user.displayName,
              role: userDB[res.user.email].role.toUpperCase(),
              teamId: userDB[res.user.email].team,
              timeStamp: [
                "2023-08-09T18:05:35.146Z",
                "2023-08-09T18:05:35.146Z",
                "2023-08-09T18:05:35.146Z"
              ],
            }, { merge: true });
            let user = {
              uid: res.user.uid,
              assignedQuestId: "",
              attackAmp: 1,
              blockAmp: 1,
              healAmp: 1,
              exp: 0,
              gold: 0,
              level: 1,
              name: res.user.displayName,
              role: userDB[res.user.email].role.toUpperCase(),
              teamId: userDB[res.user.email].team,
              timeStamp: [
                "2023-08-09T18:05:35.146Z",
                "2023-08-09T18:05:35.146Z",
                "2023-08-09T18:05:35.146Z"
              ],
            }
            commit('setUser', user)
          }
        })
        if (!newUser) {
          const userDoc = doc(userCollectionReference, res.user.uid)
          onSnapshot(userDoc, snapshot => {

            let computeLevel = {
              0: {
                neededExp: 20,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              1: {
                neededExp: 25,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              2: {
                neededExp: 35,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              3: {
                neededExp: 50,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              4: {
                neededExp: 70,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              5: {
                neededExp: 95,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              6: {
                neededExp: 125,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              7: {
                neededExp: 155,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              8: {
                neededExp: 200,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              9: {
                neededExp: 250,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              10: {
                neededExp: 300,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              11: {
                neededExp: 350,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              12: {
                neededExp: 350,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              13: {
                neededExp: 350,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              },
              14: {
                neededExp: 35000000,
                attackAmp: 0.1,
                healAmp: 0.1,
                blockAmp: 0.1
              }
            }

            const data = snapshot.data();
            let user = {
              uid: res.user.uid
              , ...data
            }
            if (user.level != null) {
              if (user.exp >= computeLevel[user.level].neededExp) {
                shouldLevelUp = true;
                nextLevel = user.level + 1;
                nextExp = user.exp - computeLevel[user.level].neededExp;
                updateDoc(userDoc, { level: nextLevel, exp: nextExp, healAmp: increment(computeLevel[user.level].healAmp), blockAmp: increment(computeLevel[user.level].blockAmp), attackAmp: increment(computeLevel[user.level].attackAmp) })
              }
              commit('setUser', user)
            }
          })
        }

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
