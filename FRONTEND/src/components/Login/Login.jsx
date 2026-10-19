
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Rodape from "../Rodape/Rodape";
import simboloArea from "../../assets/imgs/senai/area-aluno.svg";
import "./Login.css";

const Login = () => {
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const entrar = async (evento) => {
    evento.preventDefault();
    setMensagem("");
    setEnviando(true);

    const dados = new FormData(evento.currentTarget);

    try {
      const resposta = await fetch("http://localhost:3333/alunos/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: dados.get("email"),
          senha: dados.get("senha"),
        }),
      });
      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.message || "Não foi possível entrar.");
      }

      localStorage.setItem("token", resultado.token);
      navigate(location.state?.from?.pathname || "/admin/atividades/nova/senai", {
        replace: true,
      });
    } catch (error) {
      setMensagem(
        error instanceof TypeError
          ? "Não foi possível conectar ao servidor."
          : error.message,
      );
    } finally {
      setEnviando(false);
    }
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

            <button className="botao-entrar-login" type="submit" disabled={enviando}>
              {enviando ? "Entrando..." : "Entrar"}
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
