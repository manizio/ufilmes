import { useEffect } from "react";

export default function Movie({ data }) {
  useEffect(() => {
    document.getElementsByTagName("body")[0].setAttribute("id", "bodyPage");
    document.getElementsByTagName("html")[0].setAttribute("id", "htmlPage");
  }, []);

  if(!data) return <div class="loading">carregando</div>
  if(data.Error) return <div id='noresult'>ID Incorreta</div>

  return (
    <div class="paginaDetalhes">
      <div id="poster">
        <img src={data.Poster} />
        <p>Nota: {data.imdbRating}</p>
      </div>
      <section id="descricao">
        <div id="containerInformacoes">
          <p id="titulo">{data.Title} </p>
          <p id="ano">{data.Year}</p>{" "}
          <div id="diretor">
            Dirigido por: <p id="diretorNome">{data.Director}</p>
          </div>
        </div>
        <div id="plot">{data.Plot}</div>
      </section>
    </div>
  );
}

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();

  return json;
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "tt0095801" } },

      { params: { id: "tt0033152" } },

      { params: { id: "tt0015400" } },

      { params: { id: "tt0041149" } },

      { params: { id: "tt0044388" } },

      { params: { id: "tt0098746" } },

      { params: { id: "tt0046322" } },

      { params: { id: "tt0046497" } },

      { params: { id: "tt0044389" } },
    ],

    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=4029b34&i=${params.id}&plot=full`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
