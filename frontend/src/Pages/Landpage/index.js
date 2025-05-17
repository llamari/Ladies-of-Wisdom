import React from "react";
import { Link } from "react-router-dom";
import './index.css'

function Landpage() {

    return (
        <div>
            <header id="header">
                <img src="/assets/LW.png" alt="Logo" />
                <Link id="entrar" to={'/login'}>Entrar</Link>
            </header>
            <div id="div1">
                <div>
                    <h1>Já faz parte da comunidade?</h1>
                    <button><a href="#platform">Entenda a plataforma</a></button>
                </div>

                <div>
                    <h1>Ainda não faz parte?</h1>
                    <button><a href="#the-project">Conheça o projeto</a></button>
                </div>
            </div>

            <div id="platform">
                <img src="/assets/LW.png" id="platform-img" />
                <div>
                    <h2>Entenda a plataforma</h2>
                    <p>O site da Ladies of Wisdom é mais do que uma plataforma digital — é o reflexo de tudo o que a LOW representa. Criado para ser um espaço de apoio, organização e conexão, ele foi pensado com carinho para tornar a jornada de cada menina mais leve, prática e colaborativa.<br />

                        Aqui, cada detalhe importa: desde as tarefas cuidadosamente disponibilizadas pelas administradoras, até o espaço onde é possível enviar redações, acompanhar correções e visualizar o próprio progresso. O site não é só um canal de acesso a conteúdos — é um lugar onde o crescimento acontece em tempo real, de forma coletiva, segura e acessível.<br />

                        Desenvolvido para facilitar a experiência das participantes, ele divide as áreas entre administradoras, responsáveis por criar temas e materiais de estudo, e usuárias, que podem acompanhar, estudar, praticar e se preparar para seus objetivos. Tudo isso de forma intuitiva, com uma interface que acolhe e motiva.<br />

                        Seja para organizar os estudos, acompanhar correções com feedbacks personalizados ou simplesmente sentir que não se está sozinha no processo, o site existe para sustentar a proposta da LOW: unir sabedoria e sensibilidade, sonho e ação. É um espaço funcional, mas também simbólico — onde cada clique é um passo em direção à sua melhor versão.<br />

                        Este é o site da LOW: uma ferramenta viva para transformar intenção em movimento, dúvidas em descobertas e solidão em comunidade. Porque aqui, até o digital pulsa afeto.
                    </p>
                </div>
            </div>

            <div id="the-project">
                <div>
                    <h2>O que é o Ladies Of Wisdom?</h2>
                    <p>A Ladies of Wisdom é mais do que uma comunidade: é um movimento de jovens que acreditam na força do conhecimento, da troca e do apoio entre meninas. Surgiu da inquietação de perceber o quanto muitas de nós carregam sonhos grandes, mas sentem que precisam enfrentá-los sozinhas — sem apoio, sem direção, e muitas vezes, sem espaço para serem ouvidas. <br />

                        Criada por Lais Alana e Ana Clara, a LOW nasceu para ser esse espaço. Um lugar onde meninas possam se sentir seguras para aprender, crescer e errar. Onde a vulnerabilidade não é vista como fraqueza, mas como parte do processo. Aqui, acreditamos que sabedoria não vem só dos livros, mas também das conversas, dos tropeços, das experiências e das trocas sinceras entre quem compartilha os mesmos medos e desejos. <br />

                        A LOW é feita para meninas que querem ser mais do que o esperado delas. Que sonham alto, mas não querem abrir mão da leveza, da liberdade ou da autenticidade no processo. É para quem quer construir uma vida com propósito, sem romantizar o esforço e sem se sentir sozinha na jornada.<br />

                        Mais do que oferecer ferramentas, a Ladies of Wisdom quer ser um lembrete constante de que você pode. Você pode aprender, mudar de ideia, recomeçar. Pode não saber ainda o que quer, mas continuar em movimento. E pode fazer isso cercada de outras meninas que também estão tentando — do seu jeito, no seu tempo, com coragem e verdade.<br />

                        Essa é a LOW: um ponto de encontro entre sonhos e realidade, entre força e afeto, entre quem você é e quem você está se tornando.
                    </p>
                </div>
                <img src="/assets/GilmoreGirls.jpg" id="project-img" />
            </div>
        </div>
    )
}

export default Landpage;