import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA0sVQVkrSsTpBpyT35MX8qfAhXDgkOyQ4",
    authDomain: "instagram-clone-react-2463d.firebaseapp.com",
    projectId: "instagram-clone-react-2463d",
    storageBucket: "instagram-clone-react-2463d.appspot.com",
    messagingSenderId: "727631469759",
    appId: "1:727631469759:web:263e3176fd96416fd7fa0a",
    measurementId: "G-4YBCTP9D12"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error){
            console.log('error creating user', error.message);
        }
    }
    return userDocRef;
}