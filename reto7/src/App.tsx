import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Importación de Páginas */
import Home from './pages/Home';
import GeolocationPage from './pages/GeolocationPage';
import CameraPage from './pages/CameraPage';
import MotionPage from './pages/MotionPage';
import DevicePage from './pages/DevicePage';
import HapticsPage from './pages/HapticsPage';
import NotificationsPage from './pages/NotificationsPage';
import FilesystemPage from './pages/FilesystemPage';
import PushPage from './pages/PushPage'; 

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/push">
          <PushPage />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/geolocation">
          <GeolocationPage />
        </Route>
        
        <Route exact path="/camera">
          <CameraPage />
        </Route>

        <Route exact path="/motion">
          <MotionPage />
        </Route>

        <Route exact path="/device">
          <DevicePage />
        </Route>

        <Route exact path="/haptics">
          <HapticsPage />
        </Route>

        <Route exact path="/notifications">
          <NotificationsPage />
        </Route>

        <Route exact path="/filesystem">
          <FilesystemPage />
        </Route>

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;