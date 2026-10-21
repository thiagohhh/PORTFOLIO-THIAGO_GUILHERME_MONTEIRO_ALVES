import jwt from "jsonwebtoken";

export const createUserToken = (aluno, response) => {

  const payload = {
    id: aluno.id,
    nome: aluno.nome,
    email: aluno.email,
  };


  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d", 
  });

  return response.status(200).json({
    message: "Login realizado com sucesso.",
    token,
    alunoId: aluno.id, 
    nome: aluno.nome,
  });
};