import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { useNetwork } from "../hooks/useNetwork";

export default function ContactsPage() {
  const { data, add, remove } = useCollection("contacts");
  const { connected } = useNetwork();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleAdd = async () => {
    if (!name || !phone) return;

    await add({ name, phone });
    setName("");
    setPhone("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>Estado de red: {connected ? "Conectado" : "Sin internet"}</p>

        <IonItem>
          <IonInput
            label="Nombre"
            labelPlacement="stacked"
            value={name}
            onIonInput={(e) => setName(e.detail.value || "")}
          />
        </IonItem>

        <IonItem>
          <IonInput
            label="Teléfono"
            labelPlacement="stacked"
            value={phone}
            onIonInput={(e) => setPhone(e.detail.value || "")}
          />
        </IonItem>

        <IonButton expand="block" onClick={handleAdd} disabled={!connected}>
          Agregar contacto
        </IonButton>

        <IonList>
          {data.map((contact: any) => (
            <IonItem key={contact.id}>
              <IonLabel>
                <h2>{contact.name}</h2>
                <p>{contact.phone}</p>
              </IonLabel>

              <IonButton
                color="danger"
                onClick={() => remove(contact.id)}
                disabled={!connected}
              >
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}