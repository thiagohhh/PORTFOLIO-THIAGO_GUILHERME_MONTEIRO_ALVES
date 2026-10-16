import { useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../../Rodape/Rodape";
import LinksIniciais from "../../LinksIniciais/LinksIniciais";
import "./EditarQuemSouEu.css";

const valoresIniciais = {
  titulo: "Thiago Guilherme",
  itinerario: "Técnico em Informática para Internet",
  paragrafo_biografia:
    "Sou Thiago Guilherme, estudante do ensino médio e do curso Técnico em Informática para Internet.",
  texto_negrito: "Explore meu portfólio: Sesi ou Senai.",
};

const EditarQuemSouEu = () => {
  const [valores, setValores] = useState(valoresIniciais);
  const [mensagem, setMensagem] = useState("");
  const [foto, setFoto] = useState("");

  const atualizarCampo = (evento) => {
    const { name, value } = evento.target;
    setValores((atuais) => ({ ...atuais, [name]: value }));
  };

  const cancelar = () => {
    setValores(valoresIniciais);
    setFoto("");
    setMensagem("As alterações desta tela foram descartadas.");
  };

  return (
    <div className="pagina-editar-perfil">
      <header className="cabecalho-editar-perfil">
        <Link to="/">← Portfólio</Link>
        <span>Área do aluno</span>
      </header>

      <main className="conteudo-editar-perfil">
        <aside className="menu-editar-perfil" aria-label="Navegação administrativa">
          <Link to="/admin/atividades/nova/senai">Enviar atividade</Link>
          <Link to="/admin/atividades/nova/sesi">Minhas atividades</Link>
          <span className="item-menu-perfil-ativo" aria-current="page">Quem sou eu</span>
          <Link to="/admin/login">Sair</Link>
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
            <form
              className="formulario-editar-perfil"
              onSubmit={(evento) => {
                evento.preventDefault();
                setMensagem("A edição ainda não está conectada ao servidor.");
              }}
            >
              <label>
                Título
                <input name="titulo" value={valores.titulo} onChange={atualizarCampo} />
              </label>

              <label>
                Itinerário
                <input
                  name="itinerario"
                  value={valores.itinerario}
                  onChange={atualizarCampo}
                />
              </label>

              <label>
                Parágrafo da biografia
                <textarea
                  name="paragrafo_biografia"
                  rows="4"
                  value={valores.paragrafo_biografia}
                  onChange={atualizarCampo}
                />
              </label>

              <label>
                Texto em negrito
                <input
                  name="texto_negrito"
                  value={valores.texto_negrito}
                  onChange={atualizarCampo}
                />
              </label>

              <div className="campo-foto-perfil">
                <span>Foto</span>
                <div className="troca-foto-perfil">
                  <div className="miniatura-foto-perfil">
                    {foto ? <img src={foto} alt="Prévia da foto escolhida" /> : "atual"}
                  </div>
                  <label className="botao-trocar-foto">
                    Trocar foto
                    <input
                      type="file"
                      name="foto"
                      accept="image/*"
                      onChange={(evento) => {
                        const arquivo = evento.target.files?.[0];
                        if (arquivo) setFoto(URL.createObjectURL(arquivo));
                      }}
                    />
                  </label>
                </div>
              </div>

              <p className="destino-editar-perfil">Vai aparecer em: Página inicial</p>

              <div className="acoes-editar-perfil">
                <button className="botao-salvar-perfil" type="submit">
                  Salvar alterações
                </button>
                <button className="botao-cancelar-perfil" type="button" onClick={cancelar}>
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
                <span>{valores.titulo}</span>
              </h3>
              <p className="itinerario-previa">{valores.itinerario}</p>
              <p>{valores.paragrafo_biografia}</p>
              <strong>{valores.texto_negrito}</strong>
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
