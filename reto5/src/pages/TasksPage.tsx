import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useTasksContext } from "../context/TasksContext";
import { useAuthContext } from "../context/AuthContext";

export default function TasksPage() {
  const { tasks } = useTasksContext();
  const { logout } = useAuthContext();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => history.push("/tasks/new")}>
          Crear tarea
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          fill="outline"
          className="ion-margin-top"
          onClick={handleLogout}
        >
          Logout
        </IonButton>

        <IonList className="ion-margin-top">
          {tasks.map((task) => (
            <IonItem
              key={task.id}
              button
              onClick={() => history.push(`/tasks/${task.id}`)}
            >
              <IonLabel>
                <h2>{task.title}</h2>
                <p>{task.completed ? "Completada" : "Pendiente"}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}