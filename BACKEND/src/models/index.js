import Aluno from "./Aluno.js";
import QuemSouEu from "./QuemSouEu.js";

// SENAI ---------------------------------------------
import Aprendizagens from "./Senai/Aprendizagens.js";
import Autoavaliacao from "./Senai/Autoavaliacao.js";
import Codigo from "./Senai/Codigo.js";
import Competencia from "./Senai/Competencia.js";
import Detalhe from "./Senai/Detalhe.js";
import Galeria from "./Senai/Galeria.js";
import Projeto from "./Senai/Projeto.js";
import Relatorio from "./Senai/Relatorio.js";


//SESI--------------------------------------------------
import ConexaoInterdisciplinar from "./Sesi/ConexaoInterdisciplinar.js";
import ConexaoTeia from "./Sesi/ConexaoTeia.js";
import EscolaParaVida from "./Sesi/EscolaParaAvida.js";
import FundamentoTeorico from "./Sesi/FundamentoTeorico.js";
import ParticipacaoEmSala from "./Sesi/ParticipacaoEmSala.js";
import ProjetoTrabalho from "./Sesi/ProjetoTabalho.js";
import ProjetoTrabalhoTag from "./Sesi/ProjetoTrabalhoTag.js";
import ReflexaoCritica from "./Sesi/ReflexaoCritica.js";
import ReflexaoHabilidade from "./Sesi/ReflexaoHabilidade.js";


// O "QuemSouEu" pertence ao "Aluno" através do "aluno_id"
QuemSouEu.belongsTo(Aluno, { foreignKey: "aluno_id" });