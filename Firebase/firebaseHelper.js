import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, } from 'firebase/firestore';
import { database } from './firebaseSetup';

export async function writeToDB(collectionName, data) {
  try {
    const docRef = addDoc(collection(database, collectionName), data);
    return docRef;
  } catch (error) {
    console.log("Error writing to DB: ", error);
  }
};

export async function deleteFromDB(collectionName, deletedId) {
  try {
    await deleteDoc(doc(database, collectionName, deletedId));
  } catch (error) {
    console.log("Error deleting from DB: ", error);
  }
}

export async function updateToDB(collectionName, docId, data) {
  try {
    const docRef = doc(database, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.log("Error updating to DB: ", error);
  }
}

export async function readAllDocsFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    let arrayOfDocs = [];
    querySnapshot.forEach((docSnapshot) => {
      arrayOfDocs.push(docSnapshot.data());
    });
    return arrayOfDocs;
  } catch (error) {
    console.log("Error reading all docs: ", error);
  }
}