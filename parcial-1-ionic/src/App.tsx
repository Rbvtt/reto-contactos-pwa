import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, useHistory } from "react-router-dom";
import {
  calendarOutline,
  peopleOutline,
  personCircleOutline
} from "ionicons/icons";

import LoginPage from "./pages/LoginPage";
import VisitasPage from "./pages/VisitasPage";
import MisPacientesPage from "./pages/MisPacientesPage";
import PerfilMedicoPage from "./pages/PerfilMedicoPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DetalleVisitaPage from "./pages/DetalleVisitaPage";

setupIonicReact();

const TabsLayout: React.FC = () => {
  const history = useHistory();
  const visitasGuardadas = JSON.parse(localStorage.getItem("tasks-v1") || "[]");
  const pendientes = visitasGuardadas.filter((visita: any) => visita.estado === "pendiente").length;

  return (
    <IonTabs>
      <IonRouterOutlet>
        <ProtectedRoute exact path="/visitas/:id" component={DetalleVisitaPage} />
        <ProtectedRoute exact path="/visitas" component={VisitasPage} />
        <ProtectedRoute exact path="/pacientes" component={MisPacientesPage} />
        <ProtectedRoute exact path="/perfil" component={PerfilMedicoPage} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="visitas" onClick={() => history.push("/visitas")}>
  <IonIcon icon={calendarOutline} />
  <IonLabel>Visitas</IonLabel>
  {pendientes > 0 && <IonBadge color="danger">{pendientes}</IonBadge>}
</IonTabButton>

        <IonTabButton tab="pacientes" onClick={() => history.push("/pacientes")}>
          <IonIcon icon={peopleOutline} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="perfil" onClick={() => history.push("/perfil")}>
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/visitas/:id" component={TabsLayout} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/visitas" component={TabsLayout} />
          <Route exact path="/pacientes" component={TabsLayout} />
          <Route exact path="/perfil" component={TabsLayout} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;