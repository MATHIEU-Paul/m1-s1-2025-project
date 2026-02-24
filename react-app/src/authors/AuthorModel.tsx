export type AuthorModel = {
  id: string
  firstName: string
  lastName: string
  imagePath?: string
}

export type AuthorBookModel = {
  id: string
  title: string
  coverPath?: string
}

export type AuthorWithBookCountModel = AuthorModel & {
  bookCount: number
}

export type AuthorWithBooksModel = AuthorModel & {
  books: AuthorBookModel[]
}

export type CreateAuthorModel = {
  firstName: string
  lastName: string
  image?: string
}

export type UpdateAuthorModel = Partial<CreateAuthorModel>
