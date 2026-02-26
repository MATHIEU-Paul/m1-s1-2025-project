import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { ImageInput } from '../../components/ImageInput'
import type { CreateBookModel } from '../BookModel'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

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
  const [numberpages, setNumberPages] = useState(0)
  // const [genres, setGenres] = useState<{id: string, name: string}[]>([]);
  // const [bookTypes, setBookTypes] = useState<{id: string, name: string}[]>([]);
  // const [genreId, setGenreId] = useState<string | undefined>(undefined);
  // const [bookTypeId, setBookTypeId] = useState<string | undefined>(undefined);


  const onClose = () => {
    setTitle('')
    setYearPublished(0)
    setNumberPages(0)
    setCoverImage(undefined)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadAuthors()
      //fetchGenres().then(setGenres);
      //fetchBookTypes().then(setBookTypes);
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
            numberpages,
            //bookType: bookType,
            //genre,
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
          <Select
            style={{ width: '100%' }}
            options={authors.map(author => ({
              label: `${author.firstName} ${author.lastName}`,
              value: author.id,
            }))}
            onChange={value => setAuthorId(value)}
          />
          <Input
            type="number"
            placeholder="Year Published"
            value={yearPublished}
            onChange={e => setYearPublished(Number(e.target.value))}
          />
          {/* <Select
            placeholder="Sélectionner un genre"
            options={genres.map(g => ({ label: g.name, value: g.id }))}
            onChange={setGenreId}
          />
          <Select
            placeholder="Type de livre"
            options={bookTypes.map(t => ({ label: t.name, value: t.id }))}
            onChange={setBookTypeId}
          /> */}
          <ImageInput
            onImageChange={newImage => setCoverImage(newImage)}
          />
        </Space>
      </Modal>
    </>
  )
}
