import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonTextarea,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTasksContext } from "../context/TasksContext";

interface Params {
  id?: string;
}

export default function TaskFormPage() {
  const { id } = useParams<Params>();
  const history = useHistory();
  const { addTask, updateTask, getTaskById } = useTasksContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const task = getTaskById(id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    }
  }, [id, getTaskById]);

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (id) {
      updateTask(id, title, description);
    } else {
      addTask(title, description);
    }

    history.push("/tasks");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>{id ? "Editar tarea" : "Crear tarea"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Título</IonLabel>
          <IonInput
            value={title}
            onIonChange={(e) => setTitle(e.detail.value || "")}
            placeholder="Escribe el título"
          />
        </IonItem>

        <IonItem className="ion-margin-top">
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea
            value={description}
            onIonChange={(e) => setDescription(e.detail.value || "")}
            placeholder="Escribe la descripción"
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton expand="block" className="ion-margin-top" onClick={handleSave}>
          {id ? "Actualizar tarea" : "Guardar tarea"}
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          className="ion-margin-top"
          onClick={() => history.push("/tasks")}
        >
          Volver
        </IonButton>
      </IonContent>
    </IonPage>
  );
}