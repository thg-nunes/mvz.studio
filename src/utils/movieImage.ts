export const returnsMovieURL = (imageWidth: number, file_path: string): string => {
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_ENDPOINT}/w${imageWidth}${file_path}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
}
