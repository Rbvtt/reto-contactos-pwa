import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import type { Visita } from "../App";

interface Params {
  id: string;
}

interface Props {
  visitas: Visita[];
  setVisitas: React.Dispatch<React.SetStateAction<Visita[]>>;
}

const DetalleVisitaPage: React.FC<Props> = ({ visitas, setVisitas }) => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const [medicamento, setMedicamento] = useState("");

  const visita = useMemo(
    () => visitas.find((item) => String(item.id) === id),
    [visitas, id]
  );

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

  const agregarMedicamento = () => {
    if (!medicamento.trim() || !visita) return;

    setVisitas((prev) =>
      prev.map((item) =>
        item.id === visita.id
          ? {
              ...item,
              prescripciones: [...(item.prescripciones || []), medicamento.trim()]
            }
          : item
      )
    );

    setMedicamento("");
  };

  const finalizarVisita = () => {
    if (!visita) return;

    setVisitas((prev) =>
      prev.map((item) =>
        item.id === visita.id
          ? {
              ...item,
              estado: "finalizada",
              receta: (item.prescripciones || []).join(", ")
            }
          : item
      )
    );

    history.replace("/visitas");
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
            <p>
              <strong>Hora:</strong> {visita.hora}
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              <IonBadge color={colorEstado(visita.estado)}>
                {textoEstado(visita.estado)}
              </IonBadge>
            </p>
            <p>
              <strong>Diagnóstico:</strong> {visita.diagnostico}
            </p>

            {visita.motivoCancelacion && (
              <IonText color="danger">
                <p>
                  <strong>Motivo de cancelación:</strong> {visita.motivoCancelacion}
                </p>
              </IonText>
            )}
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <h3>Agregar medicamento</h3>

            <IonItem>
              <IonLabel position="stacked">Medicamento</IonLabel>
              <IonInput
                value={medicamento}
                placeholder="Ej: Atenolol 50 mg"
                onIonChange={(e) => setMedicamento(e.detail.value || "")}
              />
            </IonItem>

            <IonButton expand="block" className="ion-margin-top" onClick={agregarMedicamento}>
              Agregar a receta
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <h3>Carrito de prescripciones</h3>

            {visita.prescripciones && visita.prescripciones.length > 0 ? (
              <IonList>
                {visita.prescripciones.map((med, index) => (
                  <IonItem key={index}>
                    <IonLabel>{med}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            ) : (
              <p>No hay medicamentos agregados todavía.</p>
            )}
          </IonCardContent>
        </IonCard>

        <IonButton
          expand="block"
          color="success"
          className="ion-margin-top"
          onClick={finalizarVisita}
        >
          Finalizar visita
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DetalleVisitaPage;