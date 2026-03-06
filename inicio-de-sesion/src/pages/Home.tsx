import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const List: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('logged');
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>Contact 1</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Contact 2</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Contact 3</IonLabel>
          </IonItem>
        </IonList>

        <IonButton expand="block" color="danger" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default List;