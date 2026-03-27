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
import { useDexie } from "../hooks/useDexie";

export default function FruitsPage() {
  const { data, add, deleteItem } = useDexie();

  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const handleAdd = async () => {
    if (!name || !color) return;

    await add({ name, color });
    setName("");
    setColor("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Fruits</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Fruta"
            labelPlacement="stacked"
            value={name}
            onIonInput={(e) => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonInput
            label="Color"
            labelPlacement="stacked"
            value={color}
            onIonInput={(e) => setColor(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={handleAdd}>
          Agregar fruta
        </IonButton>

        <IonList>
          {data.map((fruit: any) => (
            <IonItem key={fruit.id}>
              <IonLabel>
                <h2>{fruit.name}</h2>
                <p>{fruit.color}</p>
              </IonLabel>

              <IonButton color="danger" onClick={() => deleteItem(fruit.id)}>
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}