const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY; //constante que puxa a key da api pra ela ser usada

if (!API_KEY) { //uma verificação pra saber se a API está realmente sendo chamada ou não
    console.log("A API está errada ou não definida")
} else {
    console.log("API carregada!")
}

export const fetchMovies = async (query: string = '') => { //executa a consulta da API e retorna os filmes encontrados, no caso não tem nenhum
    //pelo fato de eu não ter conseguido botar uma lista padrão e depois colocar pra pesquisar e mudar, então preferi alterar a lista de filmes a cada pesquisa
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`); 
    const data = await response.json();
    return data.Search ? data.Search : [];
  };

  export const fetchMovieDetails = async (id: string) => { //executa a consulta da API, mas com foco em dados mais específicos
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
  };