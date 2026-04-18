import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase/config";
import { 
  doc, setDoc, getDoc, collection, query, 
  orderBy, limit, getDocs, onSnapshot 
} from "firebase/firestore";
import { localDB } from "../db";
import { useAuth } from "./AuthContext";

export const MissionContext = createContext<any>(null);

export const MissionProvider: React.FC<{children: any}> = ({ children }) => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [ranking, setRanking] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([
    { id: 1, title: "Tomar foto", points: 50, completed: false },
    { id: 2, title: "Moverse 50m", points: 100, completed: false },
    { id: 3, title: "Permanencia 10s", points: 150, completed: false }
  ]);

  const resetMissions = () => {
    setPoints(0);
    setMissions([
      { id: 1, title: "Tomar foto", points: 50, completed: false },
      { id: 2, title: "Moverse 50m", points: 100, completed: false },
      { id: 3, title: "Permanencia 10s", points: 150, completed: false }
    ]);
  };

  const syncData = async () => {
    if (!user) {
      resetMissions();
      return;
    }

    try {
      const local = await localDB.state.where('userId').equals(user.uid).first();
      
      if (local) {
        setPoints(local.points);
        setMissions(local.missions);
      } else {
        resetMissions();
      }

      const q = query(collection(db, "users"), orderBy("points", "desc"), limit(10));
      const snap = await getDocs(q);
      const rankingData = snap.docs.map(d => d.data());
      setRanking(rankingData);

    } catch (error) {
      console.error("Error en sincronización:", error);
    }
  };

  useEffect(() => {
    syncData();
  }, [user]);

  const completeMission = async (id: number) => {
    if (!user) return;


    const newMissions = missions.map(m => m.id === id ? { ...m, completed: true } : m);
    const missionPoints = missions.find(m => m.id === id)?.points || 0;
    const newPoints = points + missionPoints;

  
    setMissions(newMissions);
    setPoints(newPoints);

    try {
      
      await localDB.state.put({
        userId: user.uid,
        points: newPoints,
        missions: newMissions
      });

    
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        points: newPoints,
        lastUpdate: new Date()
      }, { merge: true });


      syncData();

    } catch (error) {
      console.error("Error al guardar misión:", error);
      alert("Error al conectar con Firebase. Revisa el AdBlock.");
    }
  };

  return (
    <MissionContext.Provider value={{ points, missions, completeMission, ranking, syncData }}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMissions = () => useContext(MissionContext);