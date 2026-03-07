export type PurchaseModel = {
  id: string
  clientId: string
  bookId: string
  purchaseDate: string
}

export type PurchaseHomeSaleModel = PurchaseModel & {
  clientName: string
  bookTitle: string
}

export type PurchaseHomeStatsModel = {
  totalSales: number
  distinctCustomers: number
  distinctBooks: number
  lastSaleDate: string | null
}

export type PurchaseHomeSummaryModel = {
  latestSales: PurchaseHomeSaleModel[]
  stats: PurchaseHomeStatsModel
}

export type CreatePurchaseModel = {
  clientId: string
  bookId: string
  purchaseDate: string
}
