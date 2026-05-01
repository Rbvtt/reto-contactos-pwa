import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    if (email === 'user@mail.com' && password === '123') {
      localStorage.setItem('logged', 'true');
      history.push('/Home');
    } else {
      setMessage('Credenciales incorrectas');
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="font-bold text-blue-600">Reto 09 - Tailwind</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        {/* Contenedor Flex para centrar todo */}
        <div className="flex flex-col items-center justify-center min-h-full px-6 bg-gray-100">
          
          {/* Tarjeta blanca de Tailwind */}
          <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">¡Bienvenido!</h2>
              <p className="text-gray-500 mt-2">Ingresa tus datos para continuar</p>
            </div>

            <div className="space-y-6">
              {/* Estilizamos el IonItem mediante clases de Tailwind en el contenedor */}
              <div className="overflow-hidden border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-400">
                <IonItem lines="none" style={{ '--background': 'transparent' }}>
                  <IonLabel position="stacked" className="font-semibold text-gray-600">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    placeholder="user@mail.com"
                    className="mt-1"
                  />
                </IonItem>
              </div>

              <div className="overflow-hidden border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-400">
                <IonItem lines="none" style={{ '--background': 'transparent' }}>
                  <IonLabel position="stacked" className="font-semibold text-gray-600">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    placeholder="123"
                    className="mt-1"
                  />
                </IonItem>
              </div>
            </div>

            {message && (
              <div className="p-3 mt-6 bg-red-50 border border-red-200 rounded-lg animate-pulse">
                <p className="text-sm font-bold text-center text-red-600">{message}</p>
              </div>
            )}

            <IonButton 
              expand="block" 
              onClick={handleLogin}
              className="mt-10 font-bold h-14"
              style={{ '--border-radius': '12px', '--box-shadow': 'none' }}
            >
              INICIAR SESIÓN
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;