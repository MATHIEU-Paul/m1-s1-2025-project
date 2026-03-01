import { QueryableList, type QueryableListQuery } from '../../components/QueryableList'
import { useBookProvider, type BookSortField } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'

export function BookList() {
  const { books, totalCount, loadBooks, deleteBook, updateBook, createBook } =
    useBookProvider()
  const onQueryChange = (query: QueryableListQuery<BookSortField>) => {
    loadBooks({
      limit: query.limit,
      offset: query.offset,
      sortField: query.sortField,
      sortOrder: query.sortOrder,
    })
  }

  return (
    <>
      <CreateBookModal onCreate={createBook} />
      <QueryableList<BookSortField, (typeof books)[number]>
        sortLabel="Sort books by"
        initialSortField="title"
        initialSortOrder="ASC"
        initialPage={1}
        initialPageSize={10}
        sortOptions={[
          { value: 'title', label: 'Title' },
          { value: 'authorName', label: 'Author name' },
          { value: 'yearPublished', label: 'Publish year' },
        ]}
        onQueryChange={onQueryChange}
        items={books}
        getItemKey={book => book.id}
        renderItem={book => (
          <BookListItem
            book={book}
            onDelete={deleteBook}
            onUpdate={updateBook}
          />
        )}
        listStyle={{ padding: '0 .5rem' }}
        totalCount={totalCount}
        pageSizeOptions={[5, 10, 20, 50]}
        entityLabel="books"
      />
    </>
  )
}
