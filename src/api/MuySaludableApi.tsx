// import axios from "axios";

// const MuySaludableApi = axios.create({
//    // baseURL: 'http://192.168.100.130:8000/api',
//     baseURL: 'https://rest-server-muy-saludable-git-d4d2c5-salvadorlopez10s-projects.vercel.app/api',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// export { MuySaludableApi }

import axios from "axios";

let MuySaludableApi: any;

// Función para cargar la configuración desde el JSON remoto
async function loadConfig() {
  try {
    const response = await axios.get('https://muysaludable.com.mx/config_app.json?timestamp=${new Date().getTime()}');
    console.log("OBTENIENDO API DINAMICAMENTE");
    console.log(JSON.stringify(response,null,2));
    const config = response.data;

    // Crear la instancia de Axios con la baseURL cargada
    MuySaludableApi = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error loading config:", error);

    // Crear la instancia de Axios con una URL por defecto si falla la carga del JSON
    MuySaludableApi = axios.create({
      baseURL: 'https://rest-server-muy-saludable-git-d4d2c5-salvadorlopez10s-projects.vercel.app/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Llamar a la función para cargar la configuración al inicio
loadConfig();

export { MuySaludableApi };
