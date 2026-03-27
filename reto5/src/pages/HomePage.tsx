import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function HomePage() {
  const history = useHistory();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenge 06</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => history.push("/contacts")}>
          Contacts
        </IonButton>

        <IonButton expand="block" onClick={() => history.push("/tasks")}>
          Tasks
        </IonButton>

        <IonButton expand="block" onClick={() => history.push("/fruits")}>
          Fruits
        </IonButton>

        <IonButton expand="block" color="danger" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
}