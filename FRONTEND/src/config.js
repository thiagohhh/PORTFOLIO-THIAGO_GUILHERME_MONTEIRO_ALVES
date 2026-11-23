// URL da API
// - No PC: http://localhost:3333
// - Na Vercel: coloque VITE_API_URL nas Environment Variables
//   (endereço do backend no Railway/Render, ex: https://seu-back.up.railway.app)
export const API = import.meta.env.VITE_API_URL || "http://localhost:3333";
