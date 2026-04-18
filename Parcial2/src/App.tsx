import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* 1. Core CSS requerido para que Ionic se vea y no quede en blanco */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* 2. Utilidades de CSS (opcional pero recomendado) */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* 3. Variables de tu tema (colores) */
import './theme/variables.css';

/* 4. Importamos los Contextos (El orden importa) */
import { AuthProvider } from './context/AuthContext';
import { MissionProvider } from './context/MissionContext';

/* 5. Importamos las Páginas */
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Results from './pages/Results';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    {/* AuthProvider DEBE ir por fuera, porque MissionProvider depende de él */}
    <AuthProvider>
      <MissionProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            
            <Route exact path="/results" component={Results} />
            
            <Route exact path="/login">
              <Login />
            </Route>
            
            <Route exact path="/register">
              <Register />
            </Route>
            
            <Route exact path="/home">
              <Home />
            </Route>
            
            {/* Si el usuario entra a la ruta raíz '/', lo mandamos al login */}
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>

          </IonRouterOutlet>
        </IonReactRouter>
      </MissionProvider>
    </AuthProvider>
  </IonApp>
);

export default App;