import {
  IonAlert,
  IonBadge,
  IonContent,
  IonHeader,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail
} from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { visitasMock } from "../data/visitasMock";

interface Visita {
  id: number;
  paciente: string;
  hora: string;
  estado: string;
  diagnostico: string;
  receta: string;
  motivoCancelacion: string;
}

const VisitasPage: React.FC = () => {
  const history = useHistory();
  const [filtro, setFiltro] = useState("todas");
  const [visitas, setVisitas] = useState<Visita[]>(() => {
    const guardadas = localStorage.getItem("tasks-v1");

    if (!guardadas) return visitasMock;

    const parseadas = JSON.parse(guardadas);
    return parseadas.length > 0 ? parseadas : visitasMock;
  });

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [visitaACancelar, setVisitaACancelar] = useState<number | null>(null);
  const [motivoTemporal, setMotivoTemporal] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks-v1", JSON.stringify(visitas));
  }, [visitas]);

  const marcarEnCamino = (id: number) => {
    const actualizadas = visitas.map((visita) =>
      visita.id === id ? { ...visita, estado: "en_camino" } : visita
    );
    setVisitas(actualizadas);
  };

  const abrirCancelacion = (id: number) => {
    setVisitaACancelar(id);
    setMotivoTemporal("");
    setMostrarAlerta(true);
  };

  const confirmarCancelacion = (motivo: string) => {
    if (visitaACancelar === null) return;

    const actualizadas = visitas.map((visita) =>
      visita.id === visitaACancelar
        ? {
            ...visita,
            estado: "cancelada",
            motivoCancelacion: motivo || "Sin motivo especificado"
          }
        : visita
    );

    setVisitas(actualizadas);
    setMostrarAlerta(false);
    setVisitaACancelar(null);
    setMotivoTemporal("");
  };

  const ordenarBase = (items: Visita[]) => {
    const pendientes = items.filter((v) => v.estado === "pendiente");
    const otras = items.filter((v) => v.estado !== "pendiente");
    return [...pendientes, ...otras];
  };

  const doReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    const pendientes = visitas.filter((v) => v.estado === "pendiente");
    const otras = visitas.filter((v) => v.estado !== "pendiente");

    const reordered = [...pendientes];
    const movedItem = reordered.splice(event.detail.from, 1)[0];
    reordered.splice(event.detail.to, 0, movedItem);

    const nuevoArray = [...reordered, ...otras];
    setVisitas(nuevoArray);
    event.detail.complete();
  };

  const visitasFiltradas = useMemo(() => {
    const ordenadas = ordenarBase(visitas);

    if (filtro === "todas") return ordenadas;
    if (filtro === "pendiente") return ordenadas.filter((v) => v.estado === "pendiente");
    if (filtro === "en_curso") return ordenadas.filter((v) => v.estado === "en_camino");
    if (filtro === "finalizada") {
      return ordenadas.filter(
        (v) => v.estado === "finalizada" || v.estado === "cancelada"
      );
    }

    return ordenadas;
  }, [visitas, filtro]);

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agenda del día</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonSegment
          value={filtro}
          onIonChange={(e) => setFiltro(String(e.detail.value || "todas"))}
        >
          <IonSegmentButton value="todas">
            <IonLabel>Todas</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="pendiente">
            <IonLabel>Pendientes</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="en_curso">
            <IonLabel>En curso</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="finalizada">
            <IonLabel>Finalizadas</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonList className="ion-margin-top">
          <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
            {visitasFiltradas.map((visita) => (
              <IonItemSliding key={visita.id}>
                <IonItemOptions side="start">
                  <IonItemOption
                    color="primary"
                    onClick={() => marcarEnCamino(visita.id)}
                  >
                    En camino
                  </IonItemOption>

                  <IonItemOption
                    color="danger"
                    onClick={() => abrirCancelacion(visita.id)}
                  >
                    Cancelar
                  </IonItemOption>
                </IonItemOptions>

                <IonItem button onClick={() => history.push(`/visitas/${visita.id}`)}>
                  <IonLabel>
                    <h2>{visita.paciente}</h2>
                    <p>{visita.hora}</p>
                    <IonBadge color={colorEstado(visita.estado)}>
                      {textoEstado(visita.estado)}
                    </IonBadge>
                  </IonLabel>

                  {visita.estado === "pendiente" && <IonReorder slot="end" />}
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption
                    color="secondary"
                    onClick={() => history.push(`/visitas/${visita.id}`)}
                  >
                    Ver detalle
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonReorderGroup>
        </IonList>

        <IonAlert
          isOpen={mostrarAlerta}
          onDidDismiss={() => setMostrarAlerta(false)}
          header="Cancelar visita"
          message="Escribe el motivo de cancelación"
          inputs={[
            {
              name: "motivo",
              type: "text",
              placeholder: "Motivo"
            }
          ]}
          buttons={[
            {
              text: "Volver",
              role: "cancel"
            },
            {
              text: "Confirmar",
              handler: (data) => {
                confirmarCancelacion(data.motivo || "");
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default VisitasPage;