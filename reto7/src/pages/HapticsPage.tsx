import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/react';
import { useHaptics } from '../hooks/useHaptics';

const HapticsPage: React.FC = () => {
  const { vibrate, impactLight, impactHeavy } = useHaptics();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Vibración (Haptics)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={vibrate}>Vibración Larga</IonButton>
        <IonButton expand="block" color="secondary" onClick={impactLight}>Impacto Suave</IonButton>
        <IonButton expand="block" color="danger" onClick={impactHeavy}>Impacto Fuerte</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default HapticsPage;