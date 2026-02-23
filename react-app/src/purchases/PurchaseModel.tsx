export type PurchaseModel = {
  id: string
  clientId: string
  bookId: string
  purchaseDate: string
}

export type CreatePurchaseModel = {
  clientId: string
  bookId: string
  purchaseDate: string
}
