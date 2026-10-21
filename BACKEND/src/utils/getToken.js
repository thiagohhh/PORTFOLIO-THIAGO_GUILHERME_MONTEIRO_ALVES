export const getToken = (request) => {

  const auth = request.headers.authorization;
  if (!auth) return null;

  const partes = auth.split(" "); 
  if (partes.length !== 2) return null;
  if (partes[0] !== "Bearer") return null;

  return partes[1]; 
};