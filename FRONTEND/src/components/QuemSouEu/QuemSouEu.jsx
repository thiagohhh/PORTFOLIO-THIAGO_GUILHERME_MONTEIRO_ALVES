import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { chamarApi } from "../../api";
import LinksIniciais from "../LinksIniciais/LinksIniciais"; // componente que leva para cada instituicao
import Rodape from "../Rodape/Rodape"; // O foter
import traco from "../../assets/imgs/Traço.png";   // traco que fica no texto em negrito
import simbolo from "../../assets/imgs/Símbolo.png"; // quadrado amarelo foto
import "./QuemSouEu.css";


const QuemSouEu = () => {
  const [dados, setDados] = useState(null); // guardar as informações quando o banco de dados responder.
  const [carregando, setCarregando] = useState(true); // para avsiar quando terminar o quando começar

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/quemSouEu"); {/** Faz uma requisicao para arota da api */}
        const lista = await resposta.json(); {/** Transforma em json */}

        // Verifica se a resposta é uma lista. Se não for, cria uma lista vazia [].
        const listaOk = Array.isArray(lista) ? lista : [];

        // Pega o primeiro item da lista se a lista estiver vazia, salva como null.
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

 // Define os textos da tela  usa o que veio da API ou assume o texto padrão de segurança
  const titulo = dados?.titulo || "THIAGO GUILHERME";
  const itinerario = dados?.itinerario || "TÉCNICO EM INFORMÁTICA PARA INTERNET";
  const biografia = dados?.paragrafo_biografia || "Sou Thiago Guilherme, estudante do ensino médio e do curso Técnico em Informática para Internet. Neste portfólio, reúno atividades, projetos e reflexões da minha trajetória de aprendizagem, conectando os conhecimentos da escola ao universo da tecnologia.";
  const textoNegrito = dados?.texto_negrito || "Explore meu portfólio: Sesi ou Senai.";

   // Se houver foto na API, monta a URL do servidor local. Se não houver, fica null.
  const foto = dados?.foto ? `http://localhost:3333/${dados.foto}` : null;

  return (
    <div className="pagina-inicial">

      <header className="cabecalho-pagina">

        <div className="marca-portfolio">
          <img src={simbolo} alt="" className="simbolo-marca" /> <strong>PORTFÓLIO ESCOLAR</strong>
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
             <span className="nome">{titulo}</span> {/**Recebe o titulo do editar qeum Sou eu*/}
            </h1>

            <p className="intinerario">{itinerario}</p> {/**Recebe o intinerario do editar qeum Sou eu*/}

          </header>

          {carregando ? ( <p className="descricao-texto">Carregando...</p>) : (<><p className="descricao-texto">{biografia}</p></>)} {/**Equanto envia a biografia, aparece a mensagem carregando 
                                                                                                                                       quando ele para de carregar ele adicona a biografia  */}

          <div className="explorar-portfolio">
            <img src={traco} alt="" className="traco" /> <strong>{textoNegrito}</strong> {/**Texto em negrito que é enivado pelo editar qeum sou eu */}
          </div>
        </section>

        <section className="sesi-senai">
          <div className="foto-perfil">
            {foto && <img src={foto}  />}
          </div>
          <div className="botoes-instituicoes">
            <LinksIniciais instituicao="Sesi" />
            <LinksIniciais instituicao="Senai" />
          </div>
        </section>
      </main>

      <Rodape /> {/**O foter */}
    </div>
  );
};

export default QuemSouEu;
