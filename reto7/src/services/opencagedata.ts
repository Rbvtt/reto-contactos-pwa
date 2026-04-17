// src/services/opencagedata.ts [cite: 1369]
const API_KEY = "692a28151fa2446582960863c7ef32f6"; // Clave proporcionada en clase [cite: 1371]

export const getAddress = async (lat: number, lng: number) => {
  try {
    // Construimos la URL con latitud, longitud y nuestra API KEY [cite: 1373]
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`
    );
    const data = await response.json();
    return data; // Retorna la información de la dirección [cite: 1375]
  } catch (error) {
    console.error("Error al obtener la dirección:", error);
    return null;
  }
};