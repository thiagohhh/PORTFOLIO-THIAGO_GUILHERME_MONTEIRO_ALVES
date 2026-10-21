import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../../Rodape/Rodape";
import LinksIniciais from "../../LinksIniciais/LinksIniciais";
import { chamarApi } from "../../../api";
import "./EditarQuemSouEu.css";

const EditarQuemSouEu = () => {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [itinerario, setItinerario] = useState("");
  const [paragrafo, setParagrafo] = useState("");
  const [textoNegrito, setTextoNegrito] = useState("");
  const [fotoPreview, setFotoPreview] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Carrega o que já existe
  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await chamarApi("/quemSouEu");
        const lista = await resposta.json();
        const item = Array.isArray(lista) ? lista[0] : null;
        if (!item) return;

        setId(item.id);
        setTitulo(item.titulo || "");
        setItinerario(item.itinerario || "");
        setParagrafo(item.paragrafo_biografia || "");
        setTextoNegrito(item.texto_negrito || "");
        if (item.foto) {
          setFotoPreview(`http://localhost:3333/${item.foto}`);
        }
      } catch (erro) {
        console.error(erro);
      }
    }
    carregar();
  }, []);

  function limpar() {
    setTitulo("");
    setItinerario("");
    setParagrafo("");
    setTextoNegrito("");
    setFotoPreview("");
    setMensagem("");
  }

  async function salvar(evento) {
    evento.preventDefault();
    setMensagem("");

    const alunoId = localStorage.getItem("alunoId");
    const dados = new FormData(evento.currentTarget);
    dados.append("aluno_id", alunoId);
    // Garante os campos de texto no FormData
    dados.set("titulo", titulo);
    dados.set("itinerario", itinerario);
    dados.set("paragrafo_biografia", paragrafo);
    dados.set("texto_negrito", textoNegrito);

    try {
      // Se já existe id → PUT; senão → POST
      const caminho = id ? `/quemSouEu/${id}` : "/quemSouEu";
      const metodo = id ? "PUT" : "POST";

      const resposta = await chamarApi(caminho, {
        method: metodo,
        body: dados,
      });
      const resultado = await resposta.json();

      if (resposta.ok) {
        setMensagem("Salvo com sucesso!");
        if (resultado.id) setId(resultado.id);
      } else {
        setMensagem(resultado.message || "Erro ao salvar");
      }
    } catch {
      setMensagem("Não foi possível conectar ao servidor.");
    }
  }

  return (
    <div className="pagina-editar-perfil">
      <header className="cabecalho-editar-perfil">
        <Link className="voltar-editar-perfil" to="/">
          ← Portfólio
        </Link>
        <span>Área do aluno</span>
      </header>

      <main className="conteudo-editar-perfil">
        <form className="formulario-editar-perfil" onSubmit={salvar}>
          <h1>Editar “Quem sou eu”</h1>

          <label>
            Título
            <input
              name="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </label>

          <label>
            Itinerário
            <input
              name="itinerario"
              value={itinerario}
              onChange={(e) => setItinerario(e.target.value)}
            />
          </label>

          <label>
            Biografia
            <textarea
              name="paragrafo_biografia"
              rows={4}
              value={paragrafo}
              onChange={(e) => setParagrafo(e.target.value)}
            />
          </label>

          <label>
            Texto em destaque
            <input
              name="texto_negrito"
              value={textoNegrito}
              onChange={(e) => setTextoNegrito(e.target.value)}
            />
          </label>

          <div className="campo-foto-perfil">
            <span>Foto</span>
            <div className="troca-foto-perfil">
              <div className="miniatura-foto-perfil">
                {fotoPreview ? (
                  <img src={fotoPreview} alt="Prévia" />
                ) : (
                  "atual"
                )}
              </div>
              <label className="botao-trocar-foto">
                Trocar foto
                <input
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={(e) => {
                    const arquivo = e.target.files?.[0];
                    if (arquivo) {
                      setFotoPreview(URL.createObjectURL(arquivo));
                    }
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
            <button
              className="botao-cancelar-perfil"
              type="button"
              onClick={limpar}
            >
              Cancelar
            </button>
          </div>

          {mensagem && <p>{mensagem}</p>}
        </form>

        <aside className="previa-editar-perfil">
          <h2>Pré-visualização</h2>
          <h3>
            EU SOU
            <br />
            <span>{titulo}</span>
          </h3>
          <p className="itinerario-previa">{itinerario}</p>
          <p>{paragrafo}</p>
          <strong>{textoNegrito}</strong>
          <div className="foto-previa-perfil">
            {fotoPreview && <img src={fotoPreview} alt="" />}
          </div>
          <div className="instituicoes-previa-perfil">
            <LinksIniciais instituicao="Sesi" />
            <LinksIniciais instituicao="Senai" />
          </div>
        </aside>
      </main>

      <Rodape />
    </div>
  );
};

export default EditarQuemSouEu;