import { useEffect, useState } from "react";
import { Device } from "@capacitor/device";

export const useDevice = () => {
  const [battery, setBattery] = useState<any>(null);
  const [info, setInfo] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const loadDeviceData = async () => {
    try {
      setLoading(true);
      // Obtenemos la información real del hardware [cite: 325, 326, 327]
      const batteryInfo = await Device.getBatteryInfo();
      const deviceInfo = await Device.getInfo();
      const id = await Device.getId();

      // Guardamos los datos en el estado [cite: 328, 329, 330]
      setBattery(batteryInfo);
      setInfo(deviceInfo);
      setDeviceId(id.identifier);
    } catch (err) {
      setError(err); // [cite: 332]
    } finally {
      setLoading(false); // [cite: 334]
    }
  };

  useEffect(() => {
    loadDeviceData(); // [cite: 345, 346]
  }, []);

  return { battery, info, deviceId, loading, error, refresh: loadDeviceData };
};