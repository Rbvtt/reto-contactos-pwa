import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/react';
import { useLocalNotifications } from '../hooks/useLocalNotifications';

const NotificationsPage: React.FC = () => {
  const { scheduleNotification } = useLocalNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Notificaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => scheduleNotification("¡Hola!", "Esta es una prueba del Reto 7")}>
          Enviar Notificación (en 2s)
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default NotificationsPage;