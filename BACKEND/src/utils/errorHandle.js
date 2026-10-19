import { UniqueConstraintError, ValidationError } from "sequelize";

export const tratarErro = (error, response) => {
  console.error(error);

  if (error.type === "entity.parse.failed") {
    return response.status(400).json({
      message: "O corpo da requisição contém JSON inválido.",
    });
  }

  if (error instanceof UniqueConstraintError) {
    return response.status(409).json({
      message: "Já existe um aluno cadastrado com esse e-mail.",
    });
  }

  if (error instanceof ValidationError) {
    return response.status(400).json({
      message: error.errors.map((item) => item.message).join(" "),
    });
  }

  return response.status(500).json({
    message: "Erro interno do servidor.",
  });
};
