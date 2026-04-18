import React, { useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonList, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await login(email, password);
      history.push("/home");
    } catch (err: any) {
      alert("Error al entrar: " + err.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login Parcial</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img src="https://ionicframework.com/docs/img/demos/avatar.svg" width="100" alt="avatar" />
            <h1>Bienvenido</h1>
        </div>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Correo</IonLabel>
            <IonInput value={email} onIonInput={(e) => setEmail(e.detail.value!)} type="email" placeholder="email@ejemplo.com" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput value={password} onIonInput={(e) => setPassword(e.detail.value!)} type="password" />
          </IonItem>
        </IonList>

        <IonButton expand="block" onClick={handleLogin} className="ion-margin-top">
          Entrar
        </IonButton>
        <IonButton expand="block" fill="clear" onClick={() => history.push("/register")}>
          ¿No tienes cuenta? Regístrate
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;