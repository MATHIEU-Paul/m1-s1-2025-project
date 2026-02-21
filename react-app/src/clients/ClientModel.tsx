export type ClientModel = {
  id: string
  firstName: string
  lastName: string
  email?: string
  imagePath?: string
}

export type CreateClientModel = {
  firstName: string
  lastName: string
  email?: string
  imagePath?: string
}

export type UpdateClientModel = Partial<CreateClientModel>

export type ClientPurchase = {
  id: string
  bookId: string
  bookTitle: string
  bookAuthor: string
  purchaseDate: string
}
