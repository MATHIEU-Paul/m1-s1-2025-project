import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { ImageInput } from '../../components/ImageInput'
import type { CreateBookModel } from '../BookModel'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'
import { useBookMetadataProvider } from '../providers/useBookMetadataProvider'

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookModal({ onCreate }: CreateBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [yearPublished, setYearPublished] = useState(0)
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined)
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const { authors, loadAuthors } = useBookAuthorsProviders()
  const { genres, bookTypes, loadGenres, loadBookTypes } =
    useBookMetadataProvider()
  const [numberPages, setNumberPages] = useState(0)
  const [bookTypeId, setBookTypeId] = useState<string | undefined>(undefined)
  const [genreId, setGenreId] = useState<string | undefined>(undefined)

  const onClose = () => {
    setTitle('')
    setYearPublished(0)
    setNumberPages(0)
    setCoverImage(undefined)
    setAuthorId(undefined)
    setBookTypeId(undefined)
    setGenreId(undefined)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadAuthors()
      loadGenres()
      loadBookTypes()
    }
  }, [isOpen])

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Book
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({
            title,
            yearPublished,
            coverImage,
            authorId: authorId!,
            numberPages,
            bookTypeId,
            genreId,
          })
          onClose()
        }}
        okButtonProps={{
          disabled: !authorId || !title?.length || !yearPublished,
        }}
        title="Create New Book"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Number of pages"
            value={numberPages}
            onChange={e => setNumberPages(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Year Published"
            value={yearPublished}
            onChange={e => setYearPublished(Number(e.target.value))}
          />
          <Select
            style={{ width: '100%' }}
            placeholder="Select an author"
            options={authors.map(author => ({
              label: `${author.firstName} ${author.lastName}`,
              value: author.id,
            }))}
            onChange={setAuthorId}
            value={authorId}
          />
          <Select
            style={{ width: '100%' }}
            placeholder="Select a genre"
            options={genres.map(g => ({ label: g.name, value: g.id }))}
            onChange={setGenreId}
            value={genreId}
            allowClear
          />
          <Select
            style={{ width: '100%' }}
            placeholder="Select a book type"
            options={bookTypes.map(t => ({ label: t.name, value: t.id }))}
            onChange={setBookTypeId}
            value={bookTypeId}
            allowClear
          />
          <ImageInput
            onImageChange={newImage => setCoverImage(newImage)}
          />
        </Space>
      </Modal>
    </>
  )
}
