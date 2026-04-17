import { useEffect, useState } from "react";
import { PushNotifications } from "@capacitor/push-notifications";

export const usePushNotifications = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

  const requestPermission = async () => {
    const result = await PushNotifications.requestPermissions();
    if (result.receive === "granted") {
      await PushNotifications.register();
    }
  };

  useEffect(() => {
    // Escuchar el token de registro [cite: 1110]
    PushNotifications.addListener("registration", (token) => {
      setToken(token.value);
    });

    // Escuchar notificaciones entrantes [cite: 1118]
    PushNotifications.addListener("pushNotificationReceived", (notification) => {
      setNotification(notification);
    });

    return () => {
      PushNotifications.removeAllListeners(); // [cite: 1131]
    };
  }, []);

  return { token, notification, requestPermission };
};