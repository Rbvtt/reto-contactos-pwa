// src/hooks/useCollection.ts
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export function useCollection(collectionName: string) {
  const [data, setData] = useState<any[]>([]);

  const getAll = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const results = querySnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    setData(results);
    return results;
  };

  const add = async (newItem: any) => {
    await addDoc(collection(db, collectionName), newItem);
    await getAll();
  };

  const update = async (id: string, updatedItem: any) => {
    await updateDoc(doc(db, collectionName, id), updatedItem);
    await getAll();
  };

  const remove = async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
    await getAll();
  };

  useEffect(() => {
    getAll();
  }, []);

  return { data, getAll, add, update, remove };
}