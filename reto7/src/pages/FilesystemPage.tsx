import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/react';
import { useFilesystem } from '../hooks/useFilesystem';

const FilesystemPage: React.FC = () => {
  const { writeFile, readFile } = useFilesystem();

  const handleSave = () => writeFile("reto7.json", { msg: "Hola desde Reto 7", fecha: new Date() });
  const handleRead = async () => {
    const data = await readFile("reto7.json");
    console.log("Datos leídos:", data);
    if(data) alert("Mensaje recuperado: " + data.msg);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Sistema de Archivos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={handleSave}>Guardar JSON</IonButton>
        <IonButton expand="block" color="success" onClick={handleRead}>Leer JSON</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default FilesystemPage;