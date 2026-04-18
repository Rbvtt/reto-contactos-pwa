import Dexie, { Table } from 'dexie';

export interface AppState {
  id?: number;
  userId: string;
  points: number;
  missions: any[];
}

export class ParcialDB extends Dexie {
  state!: Table<AppState>;
  constructor() {
    super('Parcial2DB');
    this.version(2).stores({ state: '++id, userId' });
  }
}

export const localDB = new ParcialDB();