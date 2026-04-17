import { useState } from "react";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const useFilesystem = () => {
  const [loading, setLoading] = useState(false);

  const writeFile = async (path: string, data: any) => {
    setLoading(true);
    try {
      await Filesystem.writeFile({
        path,
        data: JSON.stringify(data),
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      alert("Archivo guardado con éxito");
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const readFile = async (path: string) => {
    setLoading(true);
    try {
      const contents = await Filesystem.readFile({
        path,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      setLoading(false);
      return JSON.parse(contents.data as string);
    } catch (e) { 
      setLoading(false);
      return null; 
    }
  };

  return { writeFile, readFile, loading };
};