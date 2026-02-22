export type BookModel = {
  id: string
  title: string
  yearPublished: number
  author: {
    id: string
    firstName: string
    lastName: string
  }
  imagePath?: string
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  image?: string
}

export type UpdateBookModel = Partial<CreateBookModel>
