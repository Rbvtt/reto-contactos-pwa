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
import { Redirect, Route } from "react-router-dom";
import {
  calendarOutline,
  peopleOutline,
  personCircleOutline
} from "ionicons/icons";
import { useEffect, useState } from "react";

import LoginPage from "./pages/LoginPage";
import VisitasPage from "./pages/VisitasPage";
import MisPacientesPage from "./pages/MisPacientesPage";
import PerfilMedicoPage from "./pages/PerfilMedicoPage";
import DetalleVisitaPage from "./pages/DetalleVisitaPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { visitasMock } from "./data/visitasMock";

setupIonicReact();

export interface Visita {
  id: number;
  paciente: string;
  hora: string;
  estado: string;
  diagnostico: string;
  receta: string;
  motivoCancelacion: string;
  prescripciones?: string[];
}

interface TabsLayoutProps {
  visitas: Visita[];
  setVisitas: React.Dispatch<React.SetStateAction<Visita[]>>;
  pendientes: number;
}

const TabsLayout: React.FC<TabsLayoutProps> = ({ visitas, setVisitas, pendientes }) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <ProtectedRoute
          exact
          path="/visitas"
          component={() => <VisitasPage visitas={visitas} setVisitas={setVisitas} />}
        />
        <ProtectedRoute
          exact
          path="/visitas/:id"
          component={() => <DetalleVisitaPage visitas={visitas} setVisitas={setVisitas} />}
        />
        <ProtectedRoute exact path="/pacientes" component={MisPacientesPage} />
        <ProtectedRoute exact path="/perfil" component={PerfilMedicoPage} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="visitas" href="/visitas">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Visitas</IonLabel>
          {pendientes > 0 && <IonBadge color="danger">{pendientes}</IonBadge>}
        </IonTabButton>

        <IonTabButton tab="pacientes" href="/pacientes">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="perfil" href="/perfil">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App: React.FC = () => {
  const [visitas, setVisitas] = useState<Visita[]>(() => {
    const guardadas = localStorage.getItem("tasks-v1");
    if (!guardadas) return visitasMock;
    const parseadas = JSON.parse(guardadas);
    return parseadas.length > 0 ? parseadas : visitasMock;
  });

  useEffect(() => {
    localStorage.setItem("tasks-v1", JSON.stringify(visitas));
  }, [visitas]);

  const pendientes = visitas.filter((visita) => visita.estado === "pendiente").length;

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" component={LoginPage} />
          <Route
            exact
            path="/visitas"
            render={() => (
              <TabsLayout visitas={visitas} setVisitas={setVisitas} pendientes={pendientes} />
            )}
          />
          <Route
            exact
            path="/visitas/:id"
            render={() => (
              <TabsLayout visitas={visitas} setVisitas={setVisitas} pendientes={pendientes} />
            )}
          />
          <Route
            exact
            path="/pacientes"
            render={() => (
              <TabsLayout visitas={visitas} setVisitas={setVisitas} pendientes={pendientes} />
            )}
          />
          <Route
            exact
            path="/perfil"
            render={() => (
              <TabsLayout visitas={visitas} setVisitas={setVisitas} pendientes={pendientes} />
            )}
          />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;