import { useEffect, useState } from "react";
import { ref, push, set, remove, onValue, get } from "firebase/database";
import { realtimeDb } from "../firebase/config";

export function useRealTimeCollection(path: string) {
  const [data, setData] = useState<any[]>([]);

  const collectionRef = ref(realtimeDb, path);

  const getAll = async () => {
    const snapshot = await get(collectionRef);

    if (snapshot.exists()) {
      const raw = snapshot.val();
      const parsed = Object.keys(raw).map((key) => ({
        id: key,
        ...raw[key],
      }));
      setData(parsed);
      return parsed;
    }

    setData([]);
    return [];
  };

  const add = async (newItem: any) => {
    const newRef = push(collectionRef);
    await set(newRef, newItem);
  };

  const update = async (id: string, updatedItem: any) => {
    await set(ref(realtimeDb, `${path}/${id}`), updatedItem);
  };

  const deleteItem = async (id: string) => {
    await remove(ref(realtimeDb, `${path}/${id}`));
  };

  useEffect(() => {
    const unsubscribe = onValue(collectionRef, (snapshot) => {
      if (snapshot.exists()) {
        const raw = snapshot.val();
        const parsed = Object.keys(raw).map((key) => ({
          id: key,
          ...raw[key],
        }));
        setData(parsed);
      } else {
        setData([]);
      }
    });

    return () => unsubscribe();
  }, [path]);

  return { data, getAll, add, update, deleteItem };
}