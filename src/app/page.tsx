"use client"; //tem q fazer isso pra algumas coisas funcionarem 
import { useState, useEffect } from "react"; //importacoes
import { fetchMovies } from "./api";
import FilmesLista from "./components/listaFilmes";

export default function Home() { // Função Principal, é nela que vai ser colocada a lógica de pesquisa e os elementos principais do site também
  const [movies, setMovies] = useState([]); //estado pra gerenciar a lista de filme
  const [loading, setLoading] = useState(true); //estado de loading e erro
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState(''); //estado com useState pra armazenar e lidar com a pesquisa

  useEffect(() => { //utilizei essa função pra poder mostrar a lista de filmes da API
    const fetchInitialMovies = async () => {
      try {
        //chama a função do fetchMovies lá do api.tsx pra poder mostrar a lista de filmes,
        const results = await fetchMovies();
        setMovies(results); //aí ele atualiza o estado com os filmes mostrados
      } catch (e) { //verificação e checagem de erro
        setError("Erro ao carregar filmes");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMovies(); //executando a função pra poder buscar os filmes
  }, []);

  const handleSearch = async (text: string) => {  //essa função vai lidar unicamente com a pesquisa dos filmes
    setSearchText(text); //atualiza o texto da pesquisa
    setLoading(true); //define o estado de carregamento como true antes de fazer a pesquisa propriamente

    try { //vai chamar a função fetchMovies com o texto pesquisado pra poder filtrar os filmes
      const results = await fetchMovies(text);
      setMovies(results);
    } catch (e) { //verificacão de erro
      setError("Erro ao carregar filmes");
    } finally {
      setLoading(false);
    }
  };

  return ( //é aqui que fica a parte bonita do site KKKKKKKKK, é onde vai mostrar todo o jsx (no caso, tsx) dele    
    <main>

      <div className="navbar bg-base-100 sticky top-0 z-10"> {/* Decidi utilizar Taillwhind CSS pra poder me desafiar e também por ser mais fácil de utilizar com os templates gratuitos do site daisyui */} {/* Header do Site */}
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Movie Rating</a>
        </div>

        <div className="form-control mr-4"> {/* Div da caixa de pesquisa */}
          <input /* Caixa de Pesquisa */
            type="text"
            placeholder="Pesquise um Filme"
            className="input input-bordered w-full max-w-xs md:max-w-md"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="hero min-h-screen bg-slate-950 flex flex-col items-center px-4 py-6"> {/* Section principal do site */}

        <div className="flex flex-wrap gap-6 justify-center mb-8"> {/* DIV dos três cards */}

          <div className="card card-side bg-base-100 shadow-xl max-w-xs md:max-w-md"> {/* Primeiro Card */}

            <figure>

              <img
                src="https://m.media-amazon.com/images/M/MV5BZjE1MzJlNjYtNDI3ZS00MzRkLTlhMDYtNDU5YWU3YTI3Yzg0XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
                alt="O Garoto e a Garça"
                className="w-full h-auto rounded-md"
              />

            </figure>

            <div className="card-body">

              <h2 className="card-title text-xl">O Garoto e a Garça</h2>
              <p>Confira um dos últimos lançamentos do <br />
                renomado Studio Ghibli!</p>

            </div>

          </div>

          <div className="card card-side bg-base-100 shadow-xl max-w-xs md:max-w-md"> {/* Segundo Card */}

            <figure>

              <img
                src="https://m.media-amazon.com/images/M/MV5BNzRiMjg0MzUtNTQ1Mi00Y2Q5LWEwM2MtMzUwZDU5NmVjN2NkXkEyXkFqcGc@._V1_.jpg"
                alt="Deadpool e Wolverine"
                className="w-full h-auto rounded-md"
              />

            </figure>

            <div className="card-body">

              <h2 className="card-title text-xl">Deadpool e Wolverine</h2>
              <p>Depois de 6 anos em hiato, Deadpool volta<br />
                novamente com Wolverine!</p>

            </div>

          </div>

          <div className="card card-side bg-base-100 shadow-xl max-w-xs md:max-w-md"> {/* Terceiro Card */}

            <figure>

              <img
                src="https://m.media-amazon.com/images/M/MV5BOWZmOTM5YmMtNjliMi00OGRkLWIwNGUtNDI2NTE3NzZmMDdmXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg"
                alt="Borderlands"
                className="w-full h-auto rounded-md"
              />

            </figure>

            <div className="card-body">

              <h2 className="card-title text-xl">Borderlands</h2>
              <p>Do mundo dos jogos para as telonas, <br />
                confira uma aventura frenética com Borderlands!</p>

            </div>

          </div>


        </div>

        <div className="flex flex-col gap-6 w-full max-w-4xl"> {/* Div abaixo dos cards, é aqui que vão ser exibido os filmes */}

          <h1 className="card-title text-2xl md:text-3xl text-center">Filmes Disponíveis</h1>
          <FilmesLista movies={movies} /> {/* chamando o componente FilmesLista, ele vai servir pra mostrar a lista de filmes do site*/}

        </div>

      </div>

    </main>

  );

}