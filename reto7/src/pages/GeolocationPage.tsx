import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { useGeolocation } from '../hooks/useGeolocation';

const GeolocationPage: React.FC = () => {
  const { position, startTracking, stopTracking } = useGeolocation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Geolocalización</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Prueba de GPS</h2>
        <IonButton expand="block" onClick={startTracking}>Iniciar Rastreo</IonButton>
        <IonButton expand="block" color="danger" onClick={stopTracking}>Detener Rastreo</IonButton>
        
        <div style={{ marginTop: '20px' }}>
          <p><strong>Latitud:</strong> {position?.latitude}</p>
          <p><strong>Longitud:</strong> {position?.longitude}</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GeolocationPage;