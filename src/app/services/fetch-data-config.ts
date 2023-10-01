export const baseURL = process.env.NEXT_PUBLIC_TMDB_API_URL
export const api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY

export const fetchData = async <T>(
  path: string,
  params?: RequestInit,
  queryParams?: string
): Promise<T> => {
  const _queryParams = new URLSearchParams(queryParams)
  const response = await fetch(
    `${baseURL}${path}?language=pt-BR&api_key=${api_key}&${_queryParams}`,
    params
  )
  const data: T = await response.json()
  return data
}
