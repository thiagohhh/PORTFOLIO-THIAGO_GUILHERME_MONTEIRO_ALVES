import jwt from "jsonwebtoken";

// Segue a lógica do professor: gera o token e devolve { token, usuario }
export const createUserToken = (aluno, response) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  const token = jwt.sign(
    {
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return response.status(200).json({
    token,
    usuario: {
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
    },
    // mantido para o front que já usa alunoId
    alunoId: aluno.id,
  });
};
