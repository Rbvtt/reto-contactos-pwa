// src/pages/MapPage.tsx
import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/react';
import MapComponent from '../components/MapComponent';
import { useGeolocation } from '../hooks/useGeolocation';
import { useHaptics } from '../hooks/useHaptics';
import { useDevice } from '../hooks/useDevice';

const MapPage: React.FC = () => {
  const { startTracking, stopTracking } = useGeolocation();
  const { impact } = useHaptics();
  const { battery } = useDevice();

  const handleStart = () => {
    impact('medium'); // Feedback vibratorio al iniciar 
    startTracking();
  };

  useEffect(() => {
    // Smart Stop: Detener si la batería baja del 20% 
    if (battery && battery.batteryLevel < 0.2) {
      stopTracking();
      alert("Ahorro de energía: GPS detenido.");
    }
  }, [battery]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Mapa Inteligente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MapComponent />
        <div className="ion-padding">
          <IonButton expand="block" onClick={handleStart}>Iniciar Ruta</IonButton>
          <IonButton expand="block" color="danger" onClick={stopTracking}>Detener</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default MapPage;