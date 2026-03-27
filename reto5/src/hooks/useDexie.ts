import Dexie, { Table } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

export interface Fruit {
  id?: number;
  name: string;
  color: string;
}

class AppDB extends Dexie {
  fruits!: Table<Fruit, number>;

  constructor() {
    super("reto6DB");
    this.version(1).stores({
      fruits: "++id,name,color",
    });
  }
}

const db = new AppDB();

export function useDexie() {
  const fruits = useLiveQuery(() => db.fruits.toArray(), []);

  const getAll = async () => {
    return await db.fruits.toArray();
  };

  const add = async (fruit: Fruit) => {
    await db.fruits.add(fruit);
  };

  const update = async (id: number, fruit: Fruit) => {
    await db.fruits.update(id, fruit);
  };

  const deleteItem = async (id: number) => {
    await db.fruits.delete(id);
  };

  return {
    data: fruits || [],
    getAll,
    add,
    update,
    deleteItem,
  };
}