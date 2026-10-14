
import { useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../Rodape/Rodape";
import simboloArea from "../../assets/imgs/senai/area-aluno.svg";
import "./Login.css";

const Login = () => {
  const [mensagem, setMensagem] = useState("");

  const entrar = (evento) => {
    evento.preventDefault();
    setMensagem("O acesso administrativo ainda não está conectado ao servidor.");
  };

  return (
    <div className="pagina-login">
      <header className="cabecalho-login">
        <Link className="voltar-login" to="/">
          ← Portfólio
        </Link>
        <span className="area-aluno-login">Área do aluno</span>
      </header>

      <main className="conteudo-login">
        <section className="apresentacao-login" aria-labelledby="titulo-area-aluno">
          <span className="etiqueta-login">LOGIN</span>

          <div className="marca-area-aluno">
            <img src={simboloArea} alt="" className="simbolo-area-aluno" />
            <h1 id="titulo-area-aluno">
              Área do
              <br />
              <span>aluno</span>
            </h1>
          </div>

          <p>
            Entre para enviar e gerenciar suas
            <br />
            atividades no portfólio.
          </p>
        </section>

        <section className="painel-login" aria-labelledby="titulo-login">
          <form className="formulario-login" onSubmit={entrar}>
            <h2 id="titulo-login">Entrar</h2>

            <label htmlFor="email-login">E-mail</label>
            <input
              id="email-login"
              name="email"
              type="email"
              placeholder="seuemail@aluno.com"
              autoComplete="username"
              required
            />

            <label htmlFor="senha-login">Senha</label>
            <input
              id="senha-login"
              name="senha"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />

            <button className="botao-entrar-login" type="submit">
              Entrar
            </button>

            {mensagem && (
              <p className="mensagem-login" role="status">
                {mensagem}
              </p>
            )}
          </form>
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default Login;
