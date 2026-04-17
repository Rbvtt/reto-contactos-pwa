import { LocalNotifications } from '@capacitor/local-notifications';

export const useLocalNotifications = () => {
  const scheduleNotification = async (title: string, body: string) => {
    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 2) }, // Se dispara en 2 segundos
          sound: 'beep.wav',
        }
      ]
    });
  };

  return { scheduleNotification };
};