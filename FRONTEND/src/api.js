// Endereço do backend
const API = "http://localhost:3333";


export async function chamarApi(caminho, opcoes = {}) {
  
  
  const token = localStorage.getItem("token");

  const resposta = await fetch(API + caminho, {
    ...opcoes,
    headers: {
      ...opcoes.headers,
      Authorization: "Bearer " + token,
    },
  });


  if (resposta.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  }

  return resposta;
}

