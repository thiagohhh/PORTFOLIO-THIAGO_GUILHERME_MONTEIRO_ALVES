import jwt from "jsonwebtoken";


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
   
    alunoId: aluno.id,
  });
};
