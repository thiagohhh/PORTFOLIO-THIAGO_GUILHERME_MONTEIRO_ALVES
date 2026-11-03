
const API = "http://localhost:3333";

export async function chamarApi(caminho, opcoes = {}) {
  const token = localStorage.getItem("token"); 


  const headers = {
    ...(opcoes.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const resposta = await fetch(API + caminho, {
    ...opcoes,
    headers,
  });

  return resposta; 
}
