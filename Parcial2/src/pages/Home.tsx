import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonProgressBar, IonBadge, IonCard, IonCardContent } from '@ionic/react';
import { cameraOutline, walkOutline, stopwatchOutline, checkmarkCircle, trophyOutline, logOutOutline } from 'ionicons/icons';
import { useMissions } from '../context/MissionContext';
import { useAuth } from '../context/AuthContext'; // Importamos el user

const Home: React.FC = () => {
  const { points, missions, completeMission, startGpsMission, currentDistance, isWalking, logout } = useMissions();
  const { user } = useAuth(); // Traemos el user aquí
  const getMission = (id: number) => missions.find(m => m.id === id);

  // Sacamos el nombre del correo (ej: davidcraft@... -> davidcraft)
  const userName = user?.email ? user.email.split('@')[0] : "Usuario";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButton slot="start" fill="clear" color="light" onClick={logout}>
            <IonIcon icon={logOutOutline} />
          </IonButton>
          <IonTitle>{userName}</IonTitle>
          <IonBadge slot="end" color="warning" className="ion-margin-end">
            {points} pts
          </IonBadge>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonCard>
            <IonItem lines="none">
              <IonIcon icon={cameraOutline} slot="start" color="primary" />
              <IonLabel>
                <h2>{getMission(1)?.title}</h2>
                <p>{getMission(1)?.points} pts</p>
              </IonLabel>
              {getMission(1)?.completed ? (
                <IonIcon icon={checkmarkCircle} color="success" slot="end" size="large" />
              ) : (
                <IonButton slot="end" onClick={() => completeMission(1)}>Hacer</IonButton>
              )}
            </IonItem>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonItem lines="none" className="ion-no-padding">
                <IonIcon icon={walkOutline} slot="start" color="secondary" />
                <IonLabel>
                  <h2>{getMission(2)?.title}</h2>
                  <p><strong>{currentDistance}m / 35m</strong></p>
                </IonLabel>
                {getMission(2)?.completed ? (
                  <IonIcon icon={checkmarkCircle} color="success" slot="end" size="large" />
                ) : (
                  <IonButton slot="end" onClick={startGpsMission} disabled={isWalking}>
                    {isWalking ? "..." : "Hacer"}
                  </IonButton>
                )}
              </IonItem>
              {!getMission(2)?.completed && (
                <IonProgressBar value={currentDistance / 35} color="success" />
              )}
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonItem lines="none">
              <IonIcon icon={stopwatchOutline} slot="start" color="tertiary" />
              <IonLabel>
                <h2>{getMission(3)?.title}</h2>
                <p>{getMission(3)?.points} pts</p>
              </IonLabel>
              {getMission(3)?.completed ? (
                <IonIcon icon={checkmarkCircle} color="success" slot="end" size="large" />
              ) : (
                <IonButton slot="end" onClick={() => completeMission(3)}>Hacer</IonButton>
              )}
            </IonItem>
          </IonCard>
        </IonList>

        <div className="ion-text-center ion-margin-top">
          <IonButton fill="clear" routerLink="/ranking">
            <IonIcon icon={trophyOutline} slot="start" />
            Ranking
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;