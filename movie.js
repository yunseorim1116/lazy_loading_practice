
import { API_KEY } from "./apikey.js";

const fetchMovieData = async(movieDate) =>{
    console.log(API_KEY )

  const movieApiUrl = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json';

  try {
    const response = await axios.get(`${movieApiUrl}?key=${API_KEY}&targetDt=${movieDate}`);
    console.log(response)
    const resMovieDataList = response.data.movieListResult.movieList;
    return resMovieDataList;
  } catch (error) {
    console.log(error);
    throw new Error('데이터를 불러오는데 실패하였습니다.');
  }
}

const createMockData = (movieData)=>{
    const newMovieList = []
    for (let i =0; i< 5; i++){
    newMovieList.push(...movieData)
    }
  return newMovieList
}

const renderMovieData = (processedData) => {
  const movieContainer = document.createElement('div');
  movieContainer.classList.add('movie-container');

  for (const movieData of processedData) {
    // 각각의 영화 데이터에 대한 DOM 요소 생성
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.src = "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG";
    movieElement.appendChild(movieImg);

    const br = document.createElement("br");
    movieElement.appendChild(br);

    const movieTitle = document.createElement('span');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent  = `장르 : ${movieData.genreAlt}`;
    movieElement.appendChild(movieTitle);

    const movieContent = document.createElement('p');
    movieContent.classList.add('movie-content');
    movieContent.textContent = `제목 : ${movieData.movieNm}`;
    movieElement.appendChild(movieContent);

    // 생성된 요소를 movieContainer에 추가

    movieContainer.appendChild(movieElement);
  }

  // movieContainer를 HTML에 추가
  document.body.appendChild(movieContainer);
};

(async function() {
  try {
    const movieData = await fetchMovieData('20220407');
    const processedData = createMockData(movieData);
    renderMovieData(processedData);
  } catch (error) {
    console.log(error);
  }
})();