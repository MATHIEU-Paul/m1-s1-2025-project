export type AuthorModel = {
  id: string
  firstName: string
  lastName: string
  imagePath?: string
}

export type AuthorBookModel = {
  id: string
  title: string
  imagePath?: string
}

export type AuthorWithBooksModel = AuthorModel & {
  books: AuthorBookModel[]
}

export type AuthorWithBookCountModel = AuthorModel & {
  bookCount: number
}

export type CreateAuthorModel = {
  firstName: string
  lastName: string
  imagePath?: string
}

export type UpdateAuthorModel = Partial<CreateAuthorModel>
