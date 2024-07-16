import {ref, push, set, get, remove, update} from "firebase/database";
import { database } from "./fireBaseConfig";

// Function to write data to the database
export const writeCodeData = async (data) => {
  const newCodeRef = push(ref(database, 'codes/'));
  await set(newCodeRef, {
    code: data.code,
    title: data.title,
    language: data.language,
  });
};

export const readCodeData = async () => {
  const codesRef = ref(database, 'codes/');
  const snapshot = await get(codesRef);

  if (snapshot.exists()) {
    const codesList = [];
    snapshot.forEach((childSnapshot) => {
      codesList.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });
    return codesList;
  } else {
    return [];
  }
};

// Function to delete a user from the database
export const deleteCodeData = async (codeId) => {
  const codeRef = ref(database, `codes/${codeId}`);
  await remove(codeRef);
};

// Function to update a code in the database
export const updateCodeData = async (codeId, data) => {
  const codeRef = ref(database, `codes/${codeId}`);
  await update(codeRef, data);
};
