import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../../Rodape/Rodape";
import LinksIniciais from "../../LinksIniciais/LinksIniciais";
import { chamarApi } from "../../../api";
import "./EditarQuemSouEu.css";

const API = "http://localhost:3333";


const perfilVazio = {
  titulo: "",
  itinerario: "",
  paragrafo_biografia: "",
  texto_negrito: "",
};

const EditarQuemSouEu = () => {
  const [id, setId] = useState("");
  const [perfil, setPerfil] = useState(perfilVazio);
  const [foto, setFoto] = useState("");
  const [mensagem, setMensagem] = useState("");


  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await chamarApi("/quemSouEu");
        const lista = await resposta.json();
        const item = Array.isArray(lista) ? lista[0] : null;
        if (!item) return;

        setId(item.id);
        setPerfil({
          titulo: item.titulo || "",
          itinerario: item.itinerario || "",
          paragrafo_biografia: item.paragrafo_biografia || "",
          texto_negrito: item.texto_negrito || "",
        });
        if (item.foto) setFoto(`${API}/${item.foto}`);
      } catch (erro) {
        console.error(erro);
      }
    }
    carregar();
  }, []);

 
  const mudar = (evento) => {
    setPerfil({ ...perfil, [evento.target.name]: evento.target.value });
  };

 
  const limpar = () => {
    setPerfil(perfilVazio);
    setFoto("");
    setMensagem("");
  }; // é ligado no botao de cancelar onde limpa o formulario

 
  const salvar = async (evento) => {
    evento.preventDefault();
    setMensagem("");

    
    const dados = new FormData(evento.currentTarget);
    dados.append("aluno_id", localStorage.getItem("alunoId"));

   
    const caminho = id ? `/quemSouEu/${id}` : "/quemSouEu";
    const metodo = id ? "PUT" : "POST";

    try {
      const resposta = await chamarApi(caminho, { method: metodo, body: dados });
      const resultado = await resposta.json();

      if (resposta.ok) {
        setMensagem("Salvo com sucesso!");
        if (resultado.id) setId(resultado.id);
      } else {
        setMensagem(resultado.message || "Erro ao salvar.");
      }
    } catch {
      setMensagem("Não foi possível conectar ao servidor.");
    }
  };

 
  const escolherFoto = (evento) => {
    const arquivo = evento.target.files?.[0];
    if (arquivo) setFoto(URL.createObjectURL(arquivo));
  };

  return (
    <div className="pagina-editar-perfil">
      <header className="cabecalho-editar-perfil">
        <Link className="voltar-editar-perfil" to="/">
          ← Portfólio
        </Link>
        <span>Área do aluno</span>
      </header>

      <main className="conteudo-editar-perfil">
     
        <aside className="menu-editar-perfil">
          
            <button className="item-navegacao-admin ativo" type="button">
            <span className="icone-navegacao-admin">📤</span>
            Enviar atividade
          </button>

           <Link className="item-navegacao-admin" to="/admin/atividades">
            <span className="icone-navegacao-admin">📒</span>
            Minhas atividades
          </Link>

          <span className="item-menu-perfil-ativo"><span className="icone-navegacao-senai">😎</span> Quem sou eu</span>  
          <Link
            to="/admin/login"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("alunoId");
            }}
          >
            Sair
          </Link>
        </aside>

      
        <section className="area-editar-perfil">
          <header className="titulo-editar-perfil">
            <h1>
              Editar
              <br />
              <span>Quem sou eu</span>
            </h1>
            <p>Alterando · Quem sou eu</p>
          </header>

          <div className="colunas-editar-perfil">
           
            <form className="formulario-editar-perfil" onSubmit={salvar}>
              <label>
                Título
                <input name="titulo" value={perfil.titulo} onChange={mudar} />
              </label>

              <label>
                Itinerário
                <input
                  name="itinerario"
                  value={perfil.itinerario}
                  onChange={mudar}
                />
              </label>

              <label>
                Parágrafo da biografia
                <textarea
                  name="paragrafo_biografia"
                  rows={4}
                  value={perfil.paragrafo_biografia}
                  onChange={mudar}
                />
              </label>

              <label>
                Texto em negrito
                <input
                  name="texto_negrito"
                  value={perfil.texto_negrito}
                  onChange={mudar}
                />
              </label>

              <div className="campo-foto-perfil">
                <span>Foto</span>
                <div className="troca-foto-perfil">
                  <div className="miniatura-foto-perfil">
                    {foto ? <img src={foto} alt="Prévia" /> : "atual"}
                  </div>
                  <label className="botao-trocar-foto">
                    Trocar foto
                    <input
                      type="file"
                      name="foto"
                      accept="image/*"
                      onChange={escolherFoto}
                    />
                  </label>
                </div>
              </div>

              <p className="destino-editar-perfil">
                Vai aparecer em: Página inicial
              </p>

              <div className="acoes-editar-perfil">
                <button className="botao-salvar-perfil" type="submit">
                  Salvar alterações
                </button>
            
                <button
                  className="botao-cancelar-perfil"
                  type="button"
                  onClick={limpar}
                >
                  Cancelar
                </button>
              </div>

              {mensagem && <p role="status">{mensagem}</p>}
            </form>

           
            <aside className="previa-editar-perfil">
              <h2>Pré-visualização</h2>
              <h3>
                EU SOU
                <br />
                <span>{perfil.titulo}</span>
              </h3>
              <p className="itinerario-previa">{perfil.itinerario}</p>
              <p>{perfil.paragrafo_biografia}</p>
              <strong>{perfil.texto_negrito}</strong>
              <div className="foto-previa-perfil">
                {foto && <img src={foto} alt="" />}
              </div>
              <div className="instituicoes-previa-perfil">
                <LinksIniciais instituicao="Sesi" />
                <LinksIniciais instituicao="Senai" />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default EditarQuemSouEu;