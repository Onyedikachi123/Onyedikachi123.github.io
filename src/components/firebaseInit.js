import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

const firbaseApp = firebase.initializeApp
(firebaseConfig)
export default firbaseApp.firestore()
