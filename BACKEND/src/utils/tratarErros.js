const tratarErros = (request, response, error) => {
  console.error("===== ERRO NO BACKEND =====");
  console.error(error);

  if (error && error.parent) {
    console.error("SQL:", error.parent.sqlMessage || error.parent.message);
  }

  console.error("===========================");

  if (error && error.name === "SequelizeValidationError") {
    return response.status(400).json({
      message: error.errors.map((e) => e.message).join(" "),
    });
  }

  if (error && error.name === "SequelizeForeignKeyConstraintError") {
    return response.status(400).json({
      message: "aluno_id inválido. Faça login de novo.",
    });
  }

  if (error && error.name === "SequelizeDatabaseError") {
    return response.status(500).json({
      message: (error.parent && error.parent.sqlMessage) || error.message,
    });
  }

  return response.status(500).json({
    message: (error && error.message) || "Erro interno do servidor.",
  });
};

export default tratarErros;