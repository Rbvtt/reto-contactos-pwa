import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonButton, IonList, IonItem, IonLabel, IonToast 
} from '@ionic/react';
import { useState } from 'react';
import { apiService } from '../services/apiService';

const Home: React.FC = () => {
  const [mensaje, setMensaje] = useState('Listo para peticiones');

  const ejecutarGet = async () => {
    const res = await apiService.getProducts();
    console.log('GET:', res);
    setMensaje(`Se obtuvieron ${res.length} productos.`);
  };

  const ejecutarPost = async () => {
    const nuevo = { title: 'Nuevo', body: 'Contenido', userId: 1 };
    const res = await apiService.createProduct(nuevo);
    setMensaje(`Creado con ID: ${res.id}`);
  };

  const ejecutarPut = async () => {
    const edit = { id: 1, title: 'Actualizado', body: 'Nuevo contenido', userId: 1 };
    const res = await apiService.updateProduct(1, edit);
    setMensaje(`Actualizado: ${res.title}`);
  };

  const ejecutarDelete = async () => {
    await apiService.deleteProduct(1);
    console.log('DELETE: eliminado');
    setMensaje('Producto 1 eliminado correctamente.');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Reto 10 - API Axios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem lines="none">
          <IonLabel className="ion-text-wrap"><strong>Estado:</strong> {mensaje}</IonLabel>
        </IonItem>
        
        <IonButton expand="block" onClick={ejecutarGet}>Ejecutar GET</IonButton>
        <IonButton expand="block" color="success" onClick={ejecutarPost}>Ejecutar POST</IonButton>
        <IonButton expand="block" color="warning" onClick={ejecutarPut}>Ejecutar PUT</IonButton>
        <IonButton expand="block" color="danger" onClick={ejecutarDelete}>Ejecutar DELETE</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;