const tratarErros = (request, response) => {
  return response.status(500).json({
    message: "Erro interno do servidor.",
  });
};

export default tratarErros;
