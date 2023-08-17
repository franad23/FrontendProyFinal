import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyApH0PJNIR1DlznafOubrX5gjOsIGRRt9g",
  authDomain: "proyectofinalg5-6be40.firebaseapp.com",
  projectId: "proyectofinalg5-6be40",
  storageBucket: "proyectofinalg5-6be40.appspot.com",
  messagingSenderId: "320447098014",
  appId: "1:320447098014:web:fdbe6a2ec23bf52bae9f8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile (file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}