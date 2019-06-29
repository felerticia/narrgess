// Local requirements
import firebase from '../general/firebase';

// Logged user
export const getLoggedUser = () => firebase.auth().currentUser;
export const onAuthStateChanged = func => firebase.auth().onAuthStateChanged(func);

// Logging In
export const signInWithEmailAndPassword = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
export const facebookProvider = () => new firebase.auth.FacebookAuthProvider();
export const googleProvider = () => new firebase.auth.GoogleAuthProvider();
export const twitterProvider = () => new firebase.auth.TwitterAuthProvider();
export const signInWithPopup = provider => firebase.auth().signInWithPopup(provider);

// Mdp Forgotten
export const sendPasswordResetEmail = email => firebase.auth().sendPasswordResetEmail(email);
export const checkActionCode = oobCode => firebase.auth().checkActionCode(oobCode);
export const confirmPasswordReset = (actionCode, password) => firebase.auth().confirmPasswordReset(actionCode, password);

// Sign out
export const signOut = () => firebase.auth().signOut();
