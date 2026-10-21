import { UniqueConstraintError, ValidationError } from "sequelize";

export const tratarErro = (error, response) => {
  // Mostra o erro no terminal (só pra você ver)
  console.error(error);

  // JSON inválido no body
  if (error.type === "entity.parse.failed") {
    return response.status(400).json({
      message: "O corpo da requisição contém JSON inválido.",
    });
  }

  // E-mail duplicado (cadastro de aluno)
  if (error instanceof UniqueConstraintError) {
    return response.status(409).json({
      message: "Já existe um aluno cadastrado com esse e-mail.",
    });
  }

  // Campo obrigatório / validação do model (Sequelize)
  if (error instanceof ValidationError) {
    return response.status(400).json({
      message: error.errors.map((item) => item.message).join(" "),
    });
  }

  // Qualquer outro erro
  return response.status(500).json({
    message: "Erro interno do servidor.",
  });
};