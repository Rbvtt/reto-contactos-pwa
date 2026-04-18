import React, { useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const history = useHistory();

  const handleRegister = async () => {
    try {
      await register(email, password);
      alert("¡Cuenta creada!");
      history.push("/home");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Crear Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Tu Correo</IonLabel>
            <IonInput onIonInput={(e) => setEmail(e.detail.value!)} type="email" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña Nueva</IonLabel>
            <IonInput onIonInput={(e) => setPassword(e.detail.value!)} type="password" />
          </IonItem>
        </IonList>
        <IonButton expand="block" color="secondary" onClick={handleRegister}>
          Registrarme
        </IonButton>
        <IonButton expand="block" fill="clear" onClick={() => history.push("/login")}>
          Ya tengo cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;