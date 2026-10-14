import "./ConteudoGaleria.css";

const itensGaleria = [
  { titulo: "Imagem 01", tipo: "Imagem" },
  { titulo: "Vídeo 01", tipo: "Vídeo" },
  { titulo: "Imagem 02", tipo: "Imagem" },
];

const ConteudoGaleria = () => {
  return (
    <div className="grade-senai-galeria">
      {itensGaleria.map((item) => (
        <article className="cartao-galeria" key={item.titulo}>
          <div className="midia-galeria">
            {item.tipo === "Vídeo" ? (
              <span className="play-galeria" aria-label="Vídeo">
                ▶
              </span>
            ) : (
              "Imagem da atividade"
            )}
          </div>
          <h3>{item.titulo}</h3>
          <p>Adicione uma legenda para esta evidência.</p>
        </article>
      ))}
    </div>
  );
};

export default ConteudoGaleria;
