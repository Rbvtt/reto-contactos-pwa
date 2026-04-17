import { useState } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";

export const useCamera = () => {
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri, // [cite: 118]
      });
      setPhoto(image.webPath); // [cite: 119]
    } catch (error) {
      console.error("Error al tomar la foto", error);
    }
  };

  return { photo, takePhoto }; // [cite: 120]
};