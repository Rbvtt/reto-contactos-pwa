// src/pages/HistoryPage.tsx
import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonBackButton } from '@ionic/react';
import { useFilesystem } from '../hooks/useFilesystem';

const HistoryPage: React.FC = () => {
  const { listFiles, readFile } = useFilesystem();
  const [history, setHistory] = useState<any[]>([]);

  const loadHistory = async () => {
    const files = await listFiles({ path: '' });
    // Filtramos solo los archivos que empiezan con 'ruta_' [cite: 810]
    const routeFiles = files.filter((f: any) => f.name.startsWith('ruta_'));
    
    const loadedData = [];
    for (const file of routeFiles) {
      const content = await readFile({ path: file.name, isJson: true });
      if (content) loadedData.push(content);
    }
    setHistory(loadedData);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Historial de Rutas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {history.length > 0 ? history.map((route, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{route.fecha}</h2>
                <p>{route.direccion}</p>
                <p><small>{route.puntos?.length || 0} puntos registrados</small></p>
              </IonLabel>
            </IonItem>
          )) : (
            <IonItem><IonLabel>No hay rutas guardadas</IonLabel></IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HistoryPage;