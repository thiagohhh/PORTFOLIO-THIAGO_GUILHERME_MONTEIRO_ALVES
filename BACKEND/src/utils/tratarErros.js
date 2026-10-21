const tratarErros = (request, response) => {

   console.error("🔴 Erro Capturado:", error);
  return response.status(500).json({
    message: "Erro interno do servidor.",
  });
};

export default tratarErros;
