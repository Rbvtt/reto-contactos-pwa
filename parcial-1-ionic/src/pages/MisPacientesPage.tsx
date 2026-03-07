import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";

const pacientes = [
  { id: 1, nombre: "Juan Vila", diagnostico: "Taquicardia supraventricular" },
  { id: 2, nombre: "Juan David Cuero", diagnostico: "Angina estable" },
  { id: 3, nombre: "Juan José Solarte", diagnostico: "Hipertensión arterial no controlada" },
  { id: 4, nombre: "Juan Camilo Rojas", diagnostico: "Arritmia cardíaca intermitente" },
  { id: 5, nombre: "Juan Esteban Vera", diagnostico: "Insuficiencia cardíaca congestiva" }
];

const MisPacientesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {pacientes.map((paciente) => (
            <IonItem key={paciente.id}>
              <IonAvatar slot="start">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#3880ff",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold"
                  }}
                >
                  {paciente.nombre
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              </IonAvatar>

              <IonLabel>
                <h2>{paciente.nombre}</h2>
                <p>{paciente.diagnostico}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MisPacientesPage;