import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { useTasksContext } from "../context/TasksContext";

interface Params {
  id: string;
}

export default function TaskDetailPage() {
  const { id } = useParams<Params>();
  const history = useHistory();
  const { getTaskById, toggleTask, deleteTask } = useTasksContext();

  const task = getTaskById(id);

  if (!task) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tasks" />
            </IonButtons>
            <IonTitle>Detalle</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonText color="danger">
            <p>Tarea no encontrada</p>
          </IonText>

          <IonButton expand="block" onClick={() => history.push("/tasks")}>
            Volver a tareas
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const handleDelete = () => {
    deleteTask(id);
    history.push("/tasks");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Estado: {task.completed ? "Completada" : "Pendiente"}</p>

        <IonButton expand="block" onClick={() => toggleTask(id)}>
          Cambiar estado
        </IonButton>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={() => history.push(`/tasks/edit/${id}`)}
        >
          Editar
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          fill="outline"
          className="ion-margin-top"
          onClick={handleDelete}
        >
          Eliminar
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          className="ion-margin-top"
          onClick={() => history.push("/tasks")}
        >
          Volver a tareas
        </IonButton>
      </IonContent>
    </IonPage>
  );
}