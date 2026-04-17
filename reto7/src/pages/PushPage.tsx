import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/react';
import { usePushNotifications } from '../hooks/usePushNotifications';

const PushPage: React.FC = () => {
  const { token, notification, requestPermission } = usePushNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Push Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={requestPermission}>Activar Push</IonButton>
        <p><strong>Token:</strong> {token || "No registrado"}</p>
        {notification && (
          <div style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>{notification.title}</h3>
            <p>{notification.body}</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};
export default PushPage;