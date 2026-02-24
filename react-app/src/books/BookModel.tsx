export type BookModel = {
  id: string
  title: string
  yearPublished: number
  author: {
    id: string
    firstName: string
    lastName: string
  }
  coverPath?: string
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  coverImage?: string
}

export type UpdateBookModel = Partial<CreateBookModel>
