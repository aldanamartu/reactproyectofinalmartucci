import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGc-B3IxWfX-XFmpluChMBYx4ab9LXg2Y",
    authDomain: "proyectofinalmartucci.firebaseapp.com",
    projectId: "proyectofinalmartucci",
    storageBucket: "proyectofinalmartucci.appspot.com",
    messagingSenderId: "981976673959",
    appId: "1:981976673959:web:ecc0627bfc51e0a4597582",
    measurementId: "G-BQWKSBDZQ0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
//export const googleProvider = new GoogleAuthProvider();

// Get a list of cities from your database
/*
async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}
*/