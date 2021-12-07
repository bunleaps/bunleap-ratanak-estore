import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDFjB5oS9otXrzh6Fi04uQUtWV-o2V_oGo",
  authDomain: "estore-d62dd.firebaseapp.com",
  databaseURL: "https://estore-d62dd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "estore-d62dd",
  storageBucket: "estore-d62dd.appspot.com",
  messagingSenderId: "718243028823",
  appId: "1:718243028823:web:d627d7ce84c0b822daa812",
  measurementId: "G-JVQ8DS6PCT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {

  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  
  if(snapShot.exists === false){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error){
      console.log('error creating user', error.message)
    }
  }
  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;