import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { usuariosMock } from "../data/usuariosMock";
import { guardarSesion } from "../utils/storage";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [mensajeToast, setMensajeToast] = useState("");
  const [cargando, setCargando] = useState(false);

  const history = useHistory();

  const iniciarSesion = () => {
    if (!email.trim() || !password.trim()) {
      setMensajeToast("Todos los campos son obligatorios");
      setMostrarToast(true);
      return;
    }

    setCargando(true);

    setTimeout(() => {
      const usuarioEncontrado = usuariosMock.find(
        (usuario) => usuario.email === email && usuario.password === password
      );

      setCargando(false);

      if (!usuarioEncontrado) {
        setMensajeToast("Credenciales incorrectas");
        setMostrarToast(true);
        return;
      }

      guardarSesion(usuarioEncontrado);
      history.replace("/visitas");
    }, 1200);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ingreso médico</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Bienvenido a MediCare+</h2>
        <p>Inicia sesión para continuar</p>

        <IonItem>
          <IonLabel position="stacked">Correo electrónico</IonLabel>
          <IonInput
            type="email"
            value={email}
            placeholder="katar@clinica.com"
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput
            type={mostrarPassword ? "text" : "password"}
            value={password}
            placeholder="123456"
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton
          expand="block"
          fill="outline"
          className="ion-margin-top"
          onClick={() => setMostrarPassword(!mostrarPassword)}
        >
          {mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        </IonButton>

        <IonButton expand="block" className="ion-margin-top" onClick={iniciarSesion}>
          Ingresar
        </IonButton>

        <IonText color="medium">
          <p className="ion-margin-top">
            Usuario sugerido: katar@clinica.com / 123456
          </p>
        </IonText>

        <IonLoading isOpen={cargando} message="Validando credenciales..." />

        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message={mensajeToast}
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;