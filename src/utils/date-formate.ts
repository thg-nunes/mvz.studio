import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const returnsDateInWriting = (year: number, month: number, day: number) => {
  return format(new Date(year, month, day), "do 'de' MMMM yyyy", {
    locale: ptBR,
  })
}
