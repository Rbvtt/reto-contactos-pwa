import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useHaptics = () => {
  const vibrate = async () => {
    await Haptics.vibrate();
  };

  const impactLight = async () => {
    await Haptics.impact({ style: ImpactStyle.Light });
  };

  const impactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };

  const impactHeavy = async () => {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  };

  return { vibrate, impactLight, impactMedium, impactHeavy };
};