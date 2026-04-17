import { useState, useEffect } from "react";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

export const useHaptics = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  // Función genérica de impacto que espera tu MapPage
  const impact = async (style: 'light' | 'medium' | 'heavy' = "medium") => {
    const map = {
      light: ImpactStyle.Light,
      medium: ImpactStyle.Medium,
      heavy: ImpactStyle.Heavy,
    };

    try {
      await Haptics.impact({
        style: map[style] || ImpactStyle.Medium,
      });
    } catch (e) {
      console.warn("Haptics no disponibles en este navegador/dispositivo");
    }
  };

  const notify = async (type: 'success' | 'warning' | 'error' = "success") => {
    const map = {
      success: NotificationType.Success,
      warning: NotificationType.Warning,
      error: NotificationType.Error,
    };
    await Haptics.notification({ type: map[type] });
  };

  const vibrate = async (duration = 200) => {
    await Haptics.vibrate({ duration });
  };

  return {
    impact,
    notify,
    vibrate,
    isAvailable
  };
};