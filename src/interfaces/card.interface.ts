import { Prisma } from '@prisma/client';

export interface ICardBodyCreate {
  card_number: number
  cvv: number
  expiration_month: string
  expiration_year: string
  email: string
}

export type ICardDtoCreate = Omit<
  Prisma.CardUncheckedCreateInput,
  'deleted' | 'created_at' | 'updated_at' | 'deleted_at'
>

export interface ICardQueryCreate {
  token?: string
}
