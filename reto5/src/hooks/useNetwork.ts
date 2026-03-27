import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export function useNetwork() {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const loadStatus = async () => {
      const status = await Network.getStatus();
      setConnected(status.connected);
    };

    loadStatus();

    const listenerPromise = Network.addListener(
      "networkStatusChange",
      (status) => {
        setConnected(status.connected);
      }
    );

    return () => {
      listenerPromise.then((listener) => listener.remove());
    };
  }, []);

  return { connected };
}