import React from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonLabel, IonBadge, IonButtons, IonBackButton, IonIcon 
} from '@ionic/react';
import { trophyOutline, personOutline } from 'ionicons/icons';
import { useMissions } from '../context/MissionContext';

const Ranking: React.FC = () => {
  const { ranking } = useMissions();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Ranking Global</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {ranking && ranking.length > 0 ? ranking.map((u: any, index: number) => (
            <IonItem key={u.id || index}>
              <IonBadge slot="start" color={index === 0 ? "warning" : "light"}>
                {index + 1}
              </IonBadge>
              <IonIcon icon={personOutline} slot="start" color="medium" />
              <IonLabel>
                <h2>{u.email}</h2>
                <p>Puntaje total acumulado</p>
              </IonLabel>
              <IonBadge slot="end" color="secondary">
                {u.points || 0} pts
              </IonBadge>
            </IonItem>
          )) : (
            <div className="ion-padding ion-text-center">
              <IonIcon icon={trophyOutline} style={{ fontSize: '64px', color: '#ccc' }} />
              <p>Cargando ranking o no hay datos...</p>
            </div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Ranking;