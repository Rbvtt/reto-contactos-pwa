import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { locationOutline, cameraOutline, moveOutline, hardwareChipOutline, volumeHighOutline, notificationsOutline, folderOpenOutline, cloudUploadOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  const sensors = [
    { name: 'Geolocalización', path: '/geolocation', icon: locationOutline },
    { name: 'Cámara', path: '/camera', icon: cameraOutline },
    { name: 'Movimiento', path: '/motion', icon: moveOutline },
    { name: 'Dispositivo', path: '/device', icon: hardwareChipOutline },
    { name: 'Vibración (Haptics)', path: '/haptics', icon: volumeHighOutline },
    { name: 'Notificaciones Locales', path: '/notifications', icon: notificationsOutline },
    { name: 'Filesystem', path: '/filesystem', icon: folderOpenOutline },
    { name: 'Push Notifications', path: '/push', icon: cloudUploadOutline },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Reto 07 - Sensores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {sensors.map((sensor, index) => (
            <IonItem key={index} button routerLink={sensor.path} detail={true}>
              <IonIcon slot="start" icon={sensor.icon} />
              <IonLabel>{sensor.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;