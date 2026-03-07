import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useParams } from "react-router-dom";

interface Params {
  id: string;
}

const DetalleVisitaPage: React.FC = () => {
  const { id } = useParams<Params>();
  const visitas = JSON.parse(localStorage.getItem("tasks-v1") || "[]");

  const visita = visitas.find((item: any) => String(item.id) === id);

  const colorEstado = (estado: string) => {
    if (estado === "pendiente") return "warning";
    if (estado === "en_camino") return "primary";
    if (estado === "finalizada") return "success";
    if (estado === "cancelada") return "danger";
    return "medium";
  };

  const textoEstado = (estado: string) => {
    if (estado === "en_camino") return "En camino";
    if (estado === "finalizada") return "Finalizada";
    if (estado === "cancelada") return "Cancelada";
    return "Pendiente";
  };

  if (!visita) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Detalle de visita</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>Visita no encontrada.</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de visita</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <h2>{visita.paciente}</h2>
            <p><strong>Hora:</strong> {visita.hora}</p>
            <p>
              <strong>Estado:</strong>{" "}
              <IonBadge color={colorEstado(visita.estado)}>
                {textoEstado(visita.estado)}
              </IonBadge>
            </p>
            <p><strong>Diagnóstico:</strong> {visita.diagnostico}</p>

            <IonText color="primary">
              <p><strong>Receta:</strong> {visita.receta}</p>
            </IonText>

            {visita.motivoCancelacion && (
              <IonText color="danger">
                <p><strong>Motivo de cancelación:</strong> {visita.motivoCancelacion}</p>
              </IonText>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DetalleVisitaPage;