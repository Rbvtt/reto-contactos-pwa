// src/hooks/useFilesystem.ts
import { useState } from "react";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const useFilesystem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // Escribir archivos (soporta JSON) [cite: 556, 568]
  const writeFile = async ({ path, data, directory = Directory.Documents, isJson = true }: any) => {
    try {
      setLoading(true);
      const content = isJson ? JSON.stringify(data) : data;
      await Filesystem.writeFile({
        path,
        data: content,
        directory,
        encoding: Encoding.UTF8,
      });
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Leer archivos (soporta JSON) [cite: 596, 609]
  const readFile = async ({ path, directory = Directory.Documents, isJson = true }: any) => {
    try {
      setLoading(true);
      const result = await Filesystem.readFile({
        path,
        directory,
        encoding: Encoding.UTF8,
      });
      return isJson ? JSON.parse(result.data as string) : result.data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Listar archivos para el historial [cite: 686, 697]
  const listFiles = async ({ path = "", directory = Directory.Documents }: any) => {
    try {
      setLoading(true);
      const result = await Filesystem.readdir({
        path,
        directory,
      });
      return result.files; // Retorna array de FileInfo (incluye .name) [cite: 697]
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, writeFile, readFile, listFiles }; // [cite: 793]
};