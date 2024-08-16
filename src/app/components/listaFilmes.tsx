import Link from 'next/link'; //é o que vai permitir a navegação pra ver os detalhes dos filmes

const FilmesLista = ({ movies }: { movies: any[] }) => { //componente que vai armazenar os cards dos filmes e também fazer a navegação
    return (
        <div className="grid grid-cols-5 gap-4"> {/* A disposição responsiva que vão ficar os filmes, utilizei um grid pra lidar melhor com esse caso, se fosse flex ia ser mais complicado */}
            {movies.length === 0 && ( //se a quantidade de filmes for zero, então ele exibe uma mensagem pra você digitar algum filme
                <p className="card-title text-lg">
                    Pra começar, pesquise algum filme do seu interesse
                </p>
            )}
            {movies.map((movie) => ( //ele mapeia a lista de filmes e após isso, cria um link em cada um deles
                <Link
                    key={movie.imdbID}
                    href={`/detalheFilmes/${movie.imdbID}`} 
                >
                    <img
                        src={movie.Poster !== "N/A" ? movie.Poster : "/default-poster.jpg"}
                        alt={movie.Title}
                        className="w-24 h-36 object-cover rounded-md"
                    />
                    <div>
                        <h3 className="font-semibold text-lg">{movie.Title}</h3>
                        <p>{movie.Year}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default FilmesLista;