import { Camera, CameraResultType } from "@capacitor/camera";
import { Geolocation } from "@capacitor/geolocation";
import { Haptics, NotificationType } from "@capacitor/haptics";
import { Motion } from "@capacitor/motion";

export const useMissionActions = () => {
  const takePhoto = async () => {
    const image = await Camera.getPhoto({ quality: 90, resultType: CameraResultType.Uri });
    return image.webPath;
  };

  const getPos = async () => {
    const pos = await Geolocation.getCurrentPosition();
    return pos.coords;
  };

  const isStill = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      Motion.addListener('accel', (event) => {
        const acc = event.acceleration;
        const total = Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0);
        resolve(total < 1.5);
      }).then(handle => {
        setTimeout(() => handle.remove(), 100);
      });
    });
  };

  const vibrate = () => Haptics.notification({ type: NotificationType.Success });

  return { takePhoto, getPos, isStill, vibrate };
};