import { Skeleton, Space, Typography, Button, Modal, Form, Input, InputNumber, message, Select } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'
import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'


interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook, updateBook } = useBookDetailsProvider(id)
  const { authors, loadAuthors } = useBookAuthorsProviders()
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    loadBook()
  }, [id])

  // Open modal and pre-fill fields with current book data
  const showEditModal = () => {
    loadAuthors()
    if (book) {
      form.setFieldsValue({
        title: book.title,
        authorId: book.author.id,
        yearPublished: book.yearPublished,
      })
      setIsModalOpen(true)
    }
  }

  const handleOk = async () => {
  try {
    const values = await form.validateFields();
    await updateBook(values); 
    
    // ÉTAPE CRUCIALE : On recharge les données juste après l'update
    await loadBook(); 
    
    setIsModalOpen(false);
    message.success('Book updated successfully!');
  } catch (error) {
    console.error('Update failed:', error);
  }
};

  if (isLoading) return <Skeleton active />

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to={booksRoute.to}>
        <ArrowLeftOutlined /> Back to list
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Title level={1}>Book Details</Typography.Title>
        
        <Button 
          type="primary" 
          icon={<EditOutlined />} 
          onClick={showEditModal}
        >
          Edit Info
        </Button>
      </div>

      <Typography.Title level={2}>
        {book?.title}
      </Typography.Title>
      
      <Typography.Title level={3} type="secondary">
        By {book?.author?.firstName} {book?.author?.lastName}
      </Typography.Title>
      
      <Typography.Text strong>Published Year: </Typography.Text>
      <Typography.Text>{book?.yearPublished}</Typography.Text>

      
      <Modal 
        title="Edit Book Information" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={() => setIsModalOpen(false)}
        okText="Save Changes"
        cancelText="Cancel"
        destroyOnClose
      >
        <Form form={form} layout="vertical" name="edit_book_form">
          <Form.Item
            name="title"
            label="Book Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input placeholder="Enter book title" />
          </Form.Item>

          <Form.Item name="authorId" label="Author" rules={[{ required: true }]}>
            <Select 
              placeholder="Select an author"
              options={authors.map(a => ({
                label: `${a.firstName} ${a.lastName}`,
                value: a.id
              }))}
            />
          </Form.Item>

          <Form.Item
            name="yearPublished"
            label="Publication Year"
            rules={[{ required: true, message: 'Please enter the year' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  )
}