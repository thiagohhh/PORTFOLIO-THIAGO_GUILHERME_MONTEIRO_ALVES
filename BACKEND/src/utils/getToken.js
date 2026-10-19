export const getToken = (request) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) return null;

  const [scheme, token, extra] = authHeader.split(" ");
  return scheme === "Bearer" && token && !extra ? token : null;
};
