import React, { createContext, useState, useContext, useEffect } from "react";
import { db, auth } from "../firebase/config";
import { doc, setDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { localDB } from "../db";
import { useAuth } from "./AuthContext";
import { Geolocation } from "@capacitor/geolocation";

export const MissionContext = createContext<any>(null);

export const MissionProvider: React.FC<{children: any}> = ({ children }) => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [ranking, setRanking] = useState<any[]>([]);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [missions, setMissions] = useState<any[]>([
    { id: 1, title: "Tomar foto", points: 50, completed: false },
    { id: 2, title: "Moverse 35m", points: 100, completed: false },
    { id: 3, title: "Permanencia 10s", points: 150, completed: false }
  ]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; 
    const p1 = lat1 * Math.PI/180;
    const p2 = lat2 * Math.PI/180;
    const dp = (lat2-lat1) * Math.PI/180;
    const dl = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(dp/2) * Math.sin(dp/2) + Math.cos(p1) * Math.cos(p2) * Math.sin(dl/2) * Math.sin(dl/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; 
  };

  const syncData = async () => {
    if (!user) return;
    try {
      const local = await localDB.state.where('userId').equals(user.uid).first();
      if (local) {
        setPoints(local.points);
        setMissions(local.missions);
      }

      const q = query(collection(db, "users"), orderBy("points", "desc"), limit(10));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        console.log("No se encontraron documentos en la coleccion 'users'");
      }

      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      console.log("Datos cargados al ranking:", data);
      setRanking(data);
    } catch (error) { 
      console.error("ERROR CRITICO EN RANKING:", error); 
    }
  };

  useEffect(() => { syncData(); }, [user]);

  const logout = async () => {
    try {
      await signOut(auth);
      setPoints(0);
      setCurrentDistance(0);
      setMissions([
        { id: 1, title: "Tomar foto", points: 50, completed: false },
        { id: 2, title: "Moverse 35m", points: 100, completed: false },
        { id: 3, title: "Permanencia 10s", points: 150, completed: false }
      ]);
      window.location.href = "/login";
    } catch (e) { console.error(e); }
  };

  const completeMission = async (id: number) => {
    if (!user) return;
    const mission = missions.find(m => m.id === id);
    if (mission?.completed) return;
    const newMissions = missions.map(m => m.id === id ? { ...m, completed: true } : m);
    const newPoints = points + (mission?.points || 0);
    setMissions(newMissions);
    setPoints(newPoints);
    try {
      await localDB.state.put({ userId: user.uid, points: newPoints, missions: newMissions });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid, email: user.email, points: newPoints, lastUpdate: new Date()
      }, { merge: true });
      syncData();
    } catch (error) { console.error(error); }
  };

  const startGpsMission = async () => {
    try {
      setIsWalking(true);
      const startPos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      const { latitude: lat1, longitude: lon1 } = startPos.coords;
      const watchId = await Geolocation.watchPosition({ enableHighAccuracy: true }, (position) => {
        if (position) {
          const d = calculateDistance(lat1, lon1, position.coords.latitude, position.coords.longitude);
          const meters = Math.round(d);
          setCurrentDistance(meters);
          if (meters >= 35) {
            completeMission(2);
            Geolocation.clearWatch({ id: watchId });
            setIsWalking(false);
          }
        }
      });
    } catch (e) { setIsWalking(false); }
  };

  return (
    <MissionContext.Provider value={{ points, missions, completeMission, ranking, syncData, startGpsMission, currentDistance, isWalking, logout }}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMissions = () => useContext(MissionContext);