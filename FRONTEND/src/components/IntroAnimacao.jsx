import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./IntroAnimacao.css";

const IntroAnimacao = () => {
  const telaRef = useRef(null);
  const circuloRef = useRef(null);
  const textoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({

      onComplete: () => {
        if (telaRef.current) {
          telaRef.current.style.display = "none";
        }
      },
    });

    tl.fromTo( circuloRef.current,
      { scale: 0, opacity: 1 }, //COMEÇA
      { scale: 45, opacity: 0.2, duration: 1.2, ease: "power2.out" }, // E TRMINA
    ); 


    tl.fromTo( textoRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=0.6",
    );

    tl.to(telaRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.3,
    });

    return () => tl.kill();
  }, []);

  return (
    <div className="intro-tela" ref={telaRef}>

      <div className="intro-circulo" ref={circuloRef} />

      <div className="intro-texto" ref={textoRef}>

        <p className="intro-label">Portfólio</p>
        <h1 className="intro-nome">
          Thiago
          <br />
          <span>Guilherme</span>
        </h1>
      </div>
    </div>
  );
};

export default IntroAnimacao;
