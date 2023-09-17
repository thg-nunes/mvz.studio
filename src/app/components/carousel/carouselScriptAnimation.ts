if (typeof window !== 'undefined') {
  const carousel = document.getElementById('carousel')
  const carouselElements = document.getElementsByClassName('carouselElement')

  let movieShow = 1
  const moviesLength = carouselElements.length

  setInterval(() => {
    if (carousel) {
      // se a contagem do filme que ta sendo exibido for maior que a quantidade de filmes
      // existentes, a contagem é resetada para exibir o 1° filme
      if (movieShow >= moviesLength) {
        movieShow = 1
        carousel.style.transform = `translateX(0%)`
      } else {
        // se a contagem do filme que ta sendo exibido for menor que a quantidade de filmes
        // existentes, muda para o proximo filme
        carousel.style.transform = `translateX(${100 * movieShow * -1}%)`
        movieShow = movieShow + 1
      }
    }
  }, 5000)
}
