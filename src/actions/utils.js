// React requirements
import axios from 'axios';
import sha256 from 'sha256';

// actions
import { getLoggedUser } from './auth.action';

// env variables
const backUrl = process.env.REACT_APP_BACK_URL;
const backApiKey = process.env.REACT_APP_BACK_API_KEY;

// ---- AUTH KEY ---- //

const getAuthKey = () => {
    const loggedUser = getLoggedUser();
    const uid = loggedUser ? loggedUser.uid : "no-user";
    return sha256(`${backApiKey}${uid}`);
};

// --- SEND PROMISE --- //

export const request = (url, data, config) => (
    axios.post(`${backUrl}/${url}`,
        Object.assign({
            firebaseCurrentUser: getLoggedUser(),
        }, data),
        {
            headers: {
                Authorization: getAuthKey(),
                'Content-Type': config ? config['Content-Type'] ? config['Content-Type'] : "application/json" : "application/json",
            },
            responseType: config ? config.responseType ? config.responseType : "json" : "json",
        }
    ).then(res => url === "get/firebaseRef" || url === "get/firebaseStorageRef" ? res.data.data : res.data)
);

// -- FIREBASE DATA -- //

export const requestGetFirebase = (ref, def) => request("get/firebaseRef", { ref, def });
export const requestPushFirebase = (ref, payloads) => request("add/firebaseRef", { ref, payloads });
export const requestSetFirebase = (ref, payloads) => request("edit/firebaseRef", { ref, payloads });
export const requestRemoveFirebase = ref => request("delete/firebaseRef", { ref });
// export const requestStorageDownloadURL = ref => request("get/firebaseStorageRef", { ref });
// export const requestStoragePut = (ref, data) => request("add/firebaseStorageRef", { ref, data });
// export const requestStorageDelete = ref => request("delete/firebaseStorageRef", { ref });