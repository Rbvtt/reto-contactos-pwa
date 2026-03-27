import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import TasksPage from "./pages/TasksPage";
import FruitsPage from "./pages/FruitsPage";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

setupIonicReact();

function AppRoutes() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <IonLoading isOpen={true} message="Cargando..." />;
  }

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login">
          {user ? <Redirect to="/home" /> : <LoginPage />}
        </Route>

        <Route exact path="/register">
          {user ? <Redirect to="/home" /> : <RegisterPage />}
        </Route>

        <Route exact path="/home">
          {user ? <HomePage /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/contacts">
          {user ? <ContactsPage /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/tasks">
          {user ? <TasksPage /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/fruits">
          {user ? <FruitsPage /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/">
          <Redirect to={user ? "/home" : "/login"} />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

export default function App() {
  return (
    <IonApp>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </IonApp>
  );
}