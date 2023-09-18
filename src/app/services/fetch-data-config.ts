const baseURL = process.env.NEXT_PUBLIC_TMDB_API_URL
const api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY

export const fetchData = async <T>(path: string, params?: RequestInit): Promise<T> => {
  const response = await fetch(
    `${baseURL}${path}?language=pt-BR&api_key=${api_key}`,
    params
  )
  const data: T = await response.json()
  return data
}
