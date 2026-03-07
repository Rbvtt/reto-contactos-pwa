import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { cerrarSesionStorage, obtenerSesion } from "../utils/storage";

const PerfilMedicoPage: React.FC = () => {
  const history = useHistory();
  const usuario = obtenerSesion();

  const cerrarSesion = () => {
    cerrarSesionStorage();
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonAvatar style={{ width: "96px", height: "96px", margin: "0 auto 16px auto" }}>
            {usuario?.avatar ? (
             <IonImg src={usuario.avatar} alt={usuario.nombre} />
  ) : (
    <div
      style={{
        width: "96px",
        height: "96px",
        borderRadius: "50%",
        background: "#3880ff",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "28px"
      }}
    >
      {usuario?.nombre
        ?.split(" ")
        .map((p: string) => p[0])
        .join("")
        .slice(0, 2)}
    </div>
  )}
</IonAvatar>

        <h2>{usuario?.nombre}</h2>
        <IonText color="medium">
          <p>Rol: {usuario?.rol}</p>
          <p>Correo: {usuario?.email}</p>
        </IonText>

        <IonButton expand="block" color="danger" onClick={cerrarSesion}>
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PerfilMedicoPage;