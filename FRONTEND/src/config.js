// URL da API
// - No PC: http://localhost:3333
// - Na Vercel: coloque VITE_API_URL nas Environment Variables
//   (endereço do backend no Railway/Render, ex: https://seu-back.up.railway.app)
export const API = import.meta.env.VITE_API_URL || "https://portfolio-thiagoback.vercel.app";

export function mediaUrl(value) {
  if (typeof value !== "string" || !value) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${API}/${value.replace(/^\/+/, "")}`;
}
