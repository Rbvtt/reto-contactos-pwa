import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import { AuthProvider } from './context/AuthContext';
import { MissionProvider } from './context/MissionContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Results from './pages/Results';
import Ranking from './pages/Ranking';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <MissionProvider>
        <IonReactRouter>
          <IonRouterOutlet>

            <Route exact path="/ranking">
  <Ranking />
</Route>

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