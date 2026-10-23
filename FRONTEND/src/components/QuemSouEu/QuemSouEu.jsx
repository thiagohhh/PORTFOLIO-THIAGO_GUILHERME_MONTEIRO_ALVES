import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LinksIniciais from "../LinksIniciais/LinksIniciais";
import Rodape from "../Rodape/Rodape";
import { chamarApi } from "../../api";
import traco from "../../assets/imgs/Traço.png";
import simbolo from "../../assets/imgs/Símbolo.png";
import "./QuemSouEu.css";

const QuemSouEu = () => {
  // Dados que vêm do servidor
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/quemSouEu");
        const lista = await resposta.json();

        // Pega o primeiro registro (ou null se não tiver)
        const listaOk = Array.isArray(lista) ? lista : [];
        setDados(listaOk[0] || null);
      } catch (erro) {
        console.error(erro);
        setDados(null);
      } finally {
        setCarregando(false);
      }
    }

    buscar();
  }, []);

  // Textos padrão se ainda não tiver nada no banco
  const titulo = dados?.titulo || "THIAGO GUILHERME";
  const itinerario =
    dados?.itinerario || "TÉCNICO EM INFORMÁTICA PARA INTERNET";
  const biografia =
    dados?.paragrafo_biografia ||
    "Sou Thiago Guilherme, estudante do ensino médio e do curso Técnico em Informática para Internet. Neste portfólio, reúno atividades, projetos e reflexões da minha trajetória de aprendizagem, conectando os conhecimentos da escola ao universo da tecnologia.";
  const textoNegrito =
    dados?.texto_negrito || "Explore meu portfólio: Sesi ou Senai.";
  const foto = dados?.foto ? `http://localhost:3333/${dados.foto}` : null;

  return (
    <div className="pagina-inicial">
      <header className="cabecalho-pagina">
        <div className="marca-portfolio">
          <img src={simbolo} alt="" className="simbolo-marca" />
          <strong>PORTFÓLIO ESCOLAR</strong>
        </div>
        <Link className="texto-cabecalho acesso-aluno" to="/admin/login">
          Área do aluno
        </Link>
      </header>

      <main className="conteudo-inicial">
        <section className="coluna-texto">
          <header className="portfolio-header">
            <h1>
              EU SOU <br />
              <span className="nome">{titulo}</span>
            </h1>
            <p className="intinerario">{itinerario}</p>
          </header>

          {carregando ? (
            <p className="descricao-texto">Carregando...</p>
          ) : (
            <>
              <p className="descricao-texto">{biografia}</p>
             
            </>
          )}

          <div className="explorar-portfolio">
            <img src={traco} alt="" className="traco" />
            <strong>{textoNegrito}</strong>
          </div>
        </section>

        <section className="sesi-senai">
          <div className="foto-perfil">
            {foto && <img src={foto} alt={titulo} />}
          </div>
          <div className="botoes-instituicoes">
            <LinksIniciais instituicao="Sesi" />
            <LinksIniciais instituicao="Senai" />
          </div>
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default QuemSouEu;
