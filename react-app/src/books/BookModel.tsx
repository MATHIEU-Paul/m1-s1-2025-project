export type BookModel = {
  id: string
  title: string
  yearPublished: number
  author: {
    id: string
    firstName: string
    lastName: string
  }
  numberpages: number
  booktype: {
    id :string
    type : string
  }
  genre : {
    id : string
    genre : string
  }
  coverPath?: string
}

export type BookPurchase = {
  id: string
  clientId: string
  clientFirstName: string
  clientLastName: string
  clientImagePath?: string
  purchaseDate: string
}

export type BookWithPurchaseCountModel = BookModel & {
  purchaseCount: number
}

export type BookWithPurchasesModel = BookModel & {
  purchases: BookPurchase[]
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  numberpages: number
  booktypeId: string
  genreId : string
  coverImage?: string
}

export type UpdateBookModel = Partial<CreateBookModel>
