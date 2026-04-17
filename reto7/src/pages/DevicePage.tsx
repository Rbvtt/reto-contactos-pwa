import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonSpinner } from '@ionic/react';
import { useDevice } from '../hooks/useDevice';

const DevicePage: React.FC = () => {
  const { battery, info, deviceId, loading } = useDevice();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Dispositivo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? <IonSpinner /> : (
          <IonList>
            <IonItem><IonLabel><h2>Modelo</h2><p>{info?.model}</p></IonLabel></IonItem>
            <IonItem><IonLabel><h2>Batería</h2><p>{(battery?.batteryLevel * 100).toFixed(0)}%</p></IonLabel></IonItem>
            <IonItem><IonLabel><h2>Plataforma</h2><p>{info?.platform}</p></IonLabel></IonItem>
            <IonItem><IonLabel><h2>ID Único</h2><p>{deviceId}</p></IonLabel></IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;