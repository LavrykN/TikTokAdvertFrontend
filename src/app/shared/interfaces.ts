export interface checkAccount{
  username: string
}
export interface checkResponse {
  bio: string,
  username: string,
  fans: number,
  heart: number,
  urlImage: string,
  added?: boolean
}
export interface account {
  accountInfo: checkResponse,
  price: number,
  description: string,
  theme: any[],
  contact: string,
  date: Date
}

export interface filterAndPagination {
  pageNo?: number,
  pageSize?: number,
  price_of?: number,
  price_to?: number,
  theme?: number,
  fans_of?: number,
  fans_to?: number,
  hearts_of?: number,
  hearts_to?: number
}
export interface maxValues {
  maxPrice?: number,
  maxFans?: number,
  maxHearts?: number
}
