import React from "react";
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonLabel, IonBadge, IonButtons, IonBackButton 
} from "@ionic/react";
import { useMissions } from "../context/MissionContext";

const Results: React.FC = () => {
  const { ranking } = useMissions();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Atrás" />
          </IonButtons>
          <IonTitle>Ranking Global</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {(ranking || []).map((u: any, i: number) => (
            <IonItem key={i}>
              <IonLabel>
                <h2>{i + 1}. {u.email?.split('@')[0]}</h2>
                <p>{u.points >= 300 ? "¡Maestro de Sensores!" : "En camino..."}</p>
              </IonLabel>
              <IonBadge slot="end" color="primary">{u.points} pts</IonBadge>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Results;