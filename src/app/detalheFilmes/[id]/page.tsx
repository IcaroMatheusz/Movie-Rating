"use client";

import { useParams } from 'next/navigation'; //importando o `useParams` do Next.js para acessar os parâmetros da URL

import { useEffect, useState } from 'react'; //importando hooks do react 

import { fetchMovieDetails } from '../../api'; //importando a função q faz a requisição dos detalhes dos filmes

import Link from 'next/link'; //importando o link q foi usado pra voltar pra página inicial

const DetalheFilmes = () => { //definindo o componente do DetalheFilmes

    const params = useParams(); //obtém os para

    const id = params.id as string; //garante que o id é tratado como string 

    const [movie, setMovie] = useState<any>(null); //estado pra armazenar os dados do filme

    const [loading, setLoading] = useState<boolean>(true); //estado de carregamento e erro

    const [error, setError] = useState<string | null>(null);

    useEffect(() => { //buscando os detalhes do filme a partir do id dele

        if (id) {

            const fetchDetails = async () => {

                try { //requisição pra obter os detalhes do filme
                    const movieData = await fetchMovieDetails(id);
                    setMovie(movieData);
                } catch (e) { //verificação
                    setError("Erro ao carregar detalhes do filme");
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            };

            fetchDetails(); //execucao da funcao pra buscar os detalhes do filme
        }
    }, [id]); //usa o id como dependencia do UseEffect

    if (loading) return <p>Carregando...</p>; //estrutura de condicao que mostra sobre o carregamento do filme
    if (error) return <p>{error}</p>;
    if (!movie) return <p>Filme não encontrado</p>;

    return ( //renderiza a parte principal da página 

        <main className="min-h-screen bg-slate-950 flex flex-col"> {/* Div principal onde vai ser exibido o card do filme */}
            <div className="navbar bg-base-100 sticky top-0 z-10">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl">
                        <h1>Movie Rating</h1>
                    </Link>
                </div>
            </div>

            <div className="hero flex-1 flex flex-col md:flex-row p-4 gap-4"> {/* Div do Card do Filme */}
                <div className="w-full md:w-1/3">
                    <img
                        src={movie.Poster !== "N/A" ? movie.Poster : "/default-poster.jpg"}
                        alt={movie.Title}
                        className="w-full rounded-md"
                    />
                </div>
                <div className="w-full md:w-2/3"> {/* Informações principais sendo exibidas */}
                    <h2 className="text-3xl font-bold mb-2">{movie.Title}</h2>
                    <p className="text-lg mb-2">{movie.Plot}</p>
                    <div className="text-lg mb-2"> 
                        <p><strong>Ano:</strong> {movie.Year}</p>
                        <p><strong>Diretor:</strong> {movie.Director}</p>
                        <p><strong>Atores:</strong> {movie.Actors}</p>
                        <p><strong>Gênero:</strong> {movie.Genre}</p>
                        <p><strong>Classificação:</strong> {movie.Rated}</p>
                        <p><strong>Duração:</strong> {movie.Runtime}</p>
                        <p><strong>Idioma:</strong> {movie.Language}</p>
                        <p><strong>País:</strong> {movie.Country}</p>
                        {movie.Awards && <p><strong>Prêmios:</strong> {movie.Awards}</p>}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DetalheFilmes;