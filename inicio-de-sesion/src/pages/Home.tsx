import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const List: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('logged');
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="font-bold text-blue-600 text-center">Contactos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <div className="max-w-md mx-auto mt-10 px-4">
          
          <h3 className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest px-2">
            Tus Amigos
          </h3>

          {/* Contenedor de lista con diseño de tarjeta */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
            <IonList lines="full" className="py-0">
              <IonItem className="hover:bg-blue-50 transition-colors">
                <IonLabel>
                  <h2 className="font-bold text-gray-700">Contact 1</h2>
                  <p className="text-gray-400">Hace 2 horas</p>
                </IonLabel>
              </IonItem>
              
              <IonItem className="hover:bg-blue-50 transition-colors">
                <IonLabel>
                  <h2 className="font-bold text-gray-700">Contact 2</h2>
                </IonLabel>
              </IonItem>
              
              <IonItem lines="none" className="hover:bg-blue-50 transition-colors">
                <IonLabel>
                  <h2 className="font-bold text-gray-700">Contact 3</h2>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>

          <IonButton 
            expand="block" 
            color="danger" 
            onClick={handleLogout}
            className="mt-12 font-black shadow-lg"
            style={{ '--border-radius': '15px' }}
          >
            CERRAR SESIÓN
          </IonButton>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default List;