import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { useAccelerometer } from '../hooks/useAccelerometer';

const MotionPage: React.FC = () => {
  const { acceleration, isShaking, isMoving } = useAccelerometer({ threshold: 15 });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Sensor de Movimiento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <div style={{ padding: '20px', border: isMoving ? '2px solid green' : '2px solid red' }}>
           <h2>Ejes</h2>
           <p>X: {acceleration.x.toFixed(2)}</p>
           <p>Y: {acceleration.y.toFixed(2)}</p>
           <p>Z: {acceleration.z.toFixed(2)}</p>
        </div>

        {isShaking && (
          <h1 style={{ color: 'orange', animation: 'bounce 0.5s infinite' }}>
            ¡SHAKE DETECTADO! 📱💥
          </h1>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MotionPage;