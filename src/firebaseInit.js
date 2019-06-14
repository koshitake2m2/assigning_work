import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig.js'
export default firebase.initializeApp(firebaseConfig)