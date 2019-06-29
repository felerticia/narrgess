// Local requirements
import firebase from '../general/firebase';

// -- DOWNLOAD URL -- //
export const getDownloadURL = ref => firebase.storage().ref(ref).getDownloadURL();

// -- PUT -- //
export const addStorage = (ref, data) => firebase.storage().ref(ref).put(data);

// -- DELETE -- //
export const deleteStorage = ref => firebase.storage().ref(ref).delete();