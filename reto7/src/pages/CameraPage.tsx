import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonImg } from '@ionic/react';
import { useCamera } from '../hooks/useCamera';

const CameraPage: React.FC = () => {
  const { photo, takePhoto } = useCamera();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Cámara</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <IonButton expand="block" onClick={takePhoto}>
          Tomar Foto
        </IonButton>
        
        {photo ? (
          <div style={{ marginTop: '20px' }}>
            <IonImg src={photo} alt="Foto capturada" />
          </div>
        ) : (
          <p>No se ha capturado ninguna foto aún.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;