import React, { useState, useEffect } from "react";
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonLabel, IonButton, IonProgressBar, 
  IonButtons, IonIcon, IonBadge, IonText 
} from "@ionic/react";
import { logOutOutline, trophyOutline, cameraOutline, walkOutline, stopOutline } from 'ionicons/icons';
import { useMissions } from "../context/MissionContext";
import { useMissionActions } from "../hooks/useMissionActions";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const { points, missions, completeMission } = useMissions();
  const { takePhoto, getPos, isStill, vibrate } = useMissionActions();
  const { logout, user } = useAuth();
  const history = useHistory();

  const [startPos, setStartPos] = useState<any>(null);
  const [waiting, setWaiting] = useState(false);
  const [sec, setSec] = useState(0);

  const currentMissions = missions || [];
  const prog = currentMissions.filter((m: any) => m.completed).length / (currentMissions.length || 1);

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  const do1 = async () => { 
    const photo = await takePhoto();
    if (photo) {
        await completeMission(1);
        vibrate();
    }
  };

  const do2 = async () => {
    const c = await getPos();
    if (!startPos) { 
      setStartPos(c); 
      alert("Inicio fijado. ¡Camina 30 metros para completar la misión!"); 
      return; 
    }
    const dist = Math.sqrt(Math.pow(c.latitude - startPos.latitude, 2) + Math.pow(c.longitude - startPos.longitude, 2)) * 111320;
    if (dist > 30) { 
      await completeMission(2); 
      vibrate(); 
      alert("¡Misión de movimiento lograda!");
    } else {
      alert(`Llevas ${dist.toFixed(0)}m. Faltan ${(30 - dist).toFixed(0)}m`);
    }
  };

  const do3 = async () => {
    if (!currentMissions[1]?.completed) {
        alert("Primero debes completar la misión de movimiento (Misión 2).");
        return;
    }
    setWaiting(true);
    let t = 10; 
    setSec(t);
    const i = setInterval(async () => {
      const still = await isStill();
      if (!still) { 
        clearInterval(i); 
        setWaiting(false); 
        alert("¡Te moviste! Debes mantenerte quieto para completar el tiempo."); 
        return; 
      }
      t--; 
      setSec(t);
      if (t <= 0) { 
        clearInterval(i); 
        await completeMission(3); 
        vibrate(); 
        setWaiting(false); 
      }
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>UAO Parcial</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push("/results")}>
              <IonIcon icon={trophyOutline} />
            </IonButton>
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ marginBottom: '20px' }}>
          <IonText color="medium">Hola, {user?.email?.split('@')[0]}</IonText>
          <h1 style={{ marginTop: '5px' }}>Tus Puntos: <IonText color="primary">{points}</IonText></h1>
          <IonProgressBar value={prog} color="success" style={{ height: '8px', borderRadius: '4px' }} />
          <p style={{ fontSize: '12px' }}>Progreso del Parcial: {Math.round(prog * 100)}%</p>
        </div>

        <IonList lines="full">
          {currentMissions.map((m: any) => (
            <IonItem key={m.id}>
              <IonIcon 
                slot="start" 
                icon={m.id === 1 ? cameraOutline : m.id === 2 ? walkOutline : stopOutline} 
                color={m.completed ? "success" : "medium"}
              />
              <IonLabel>
                <h2>{m.title}</h2>
                <p>{m.points} puntos</p>
              </IonLabel>
              <IonButton 
                slot="end" 
                color={m.completed ? "success" : "primary"}
                disabled={m.completed || (m.id === 3 && waiting)} 
                onClick={m.id === 1 ? do1 : m.id === 2 ? do2 : do3}
              >
                {m.completed ? "✓" : (m.id === 3 && waiting ? `${sec}s` : "Hacer")}
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonButton expand="block" fill="outline" className="ion-margin-top" onClick={() => history.push("/results")}>
          Ver Ranking Global
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;  