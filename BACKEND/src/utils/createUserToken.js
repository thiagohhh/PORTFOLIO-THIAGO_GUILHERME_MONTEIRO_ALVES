import jwt from "jsonwebtoken";
import { tratarErro } from "./errorHandle.js";

export const createUserToken = async (usuario, response) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não foi configurado.");
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
    );

    return response.status(200).json({
      success: true,
      message: "Autenticação realizada.",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    return tratarErro(error, response);
  }
};
