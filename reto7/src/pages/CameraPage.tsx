// src/pages/CameraPage.tsx
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonImg, IonText } from '@ionic/react';
import { useCamera } from '../hooks/useCamera';
import { useGeolocation } from '../hooks/useGeolocation';
import { getAddress } from '../services/opencagedata';

const CameraPage: React.FC = () => {
  const { photo, takePhoto } = useCamera();
  const { position, getCurrentLocation } = useGeolocation();
  const [address, setAddress] = useState<string>("");

  // 1. Obtener la ubicación apenas entramos a la página
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // 2. Cuando la posición cambie, obtener la dirección de texto
  useEffect(() => {
    if (position) {
      getAddress(position.latitude, position.longitude).then(res => {
        setAddress(res?.results[0]?.formatted || "");
      });
    }
  }, [position]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Cámara con Ubicación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <IonButton expand="block" onClick={takePhoto}>Tomar Foto</IonButton>
        
        {photo && (
          <div style={{ position: 'relative', marginTop: '20px', display: 'inline-block' }}>
            {/* La foto capturada */}
            <IonImg src={photo} alt="Foto" />
            
            {/* LA MARCA DE AGUA: Se posiciona sobre la imagen */}
            <div style={{
              position: 'absolute',
              bottom: '15px',
              left: '0',
              right: '0',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '10px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              📍 {address || "Obteniendo dirección..."}
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;