import { HomeOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import {
  Alert,
  Card,
  Col,
  Empty,
  List,
  Row,
  Skeleton,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd'
import { useEffect, useMemo } from 'react'
import './App.css'
import { useAuth } from './auth/useAuth'
import { AppBreadcrumb } from './components/AppBreadcrumb'
import { usePurchaseHomeSummaryProvider } from './purchases/providers/usePurchaseHomeSummaryProvider'
import { Route as authorsRoute } from './routes/authors'
import { Route as booksRoute } from './routes/books'
import { Route as clientsRoute } from './routes/clients'

function App() {
  const { user } = useAuth()
  const {
    latestPurchases,
    totalSales,
    distinctCustomers,
    distinctBooks,
    lastSaleDate,
    isLoading,
    errorMessage,
    loadHomeSummary,
  } = usePurchaseHomeSummaryProvider()

  useEffect(() => {
    void loadHomeSummary(5)
  }, [loadHomeSummary])

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    [],
  )

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <AppBreadcrumb
        showHome={false}
        items={[{ title: 'Home', icon: <HomeOutlined /> }]}
      />

      <Card className="home-hero-card">
        <Space direction="vertical" size={4}>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Hello{user ? `, ${user.username}` : ''}!
          </Typography.Title>
          <Typography.Text type="secondary">
            Quick overview of your bookstore and shortcuts to main sections of
            the app.
          </Typography.Text>
          <Space wrap style={{ marginTop: '0.5rem' }}>
            <Link to={booksRoute.to}>
              <Tag color="processing">Browse books</Tag>
            </Link>
            <Link to={clientsRoute.to}>
              <Tag color="success">Manage clients</Tag>
            </Link>
            <Link to={authorsRoute.to}>
              <Tag color="default">Discover authors</Tag>
            </Link>
          </Space>
        </Space>
      </Card>

      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Sales overview
        </Typography.Title>
        <Typography.Text type="secondary">
          Metrics below are calculated from recorded sales.
        </Typography.Text>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card>
              <Statistic title="Total sales" value={totalSales} />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Customers with at least one sale"
                value={distinctCustomers}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Books sold at least once"
                value={distinctBooks}
                className="home-summary-books"
                suffix={
                  lastSaleDate
                    ? `(Last: ${dateFormatter.format(new Date(lastSaleDate))})`
                    : undefined
                }
              />
            </Card>
          </Col>
        </Row>
      </Space>

      <Card
        title="Latest sales"
        extra={
          <Typography.Text type="secondary">
            Last 5 sales, ordered by purchase date
          </Typography.Text>
        }
      >
        {errorMessage ? (
          <Alert type="error" showIcon message={errorMessage} />
        ) : null}

        {isLoading ? (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Skeleton active paragraph={{ rows: 2 }} />
            <Skeleton active paragraph={{ rows: 2 }} />
          </Space>
        ) : latestPurchases.length === 0 ? (
          <Empty description="No sales yet" />
        ) : (
          <List
            dataSource={latestPurchases}
            renderItem={purchase => (
              <List.Item>
                <Space
                  direction="vertical"
                  style={{ width: '100%' }}
                  size={2}
                  className="latest-sale-item"
                >
                  <Typography.Text strong>{purchase.bookTitle}</Typography.Text>
                  <Typography.Text type="secondary">
                    Purchased by {purchase.clientName}
                  </Typography.Text>
                  <Typography.Text type="secondary">
                    {dateFormatter.format(new Date(purchase.purchaseDate))}
                  </Typography.Text>
                </Space>
              </List.Item>
            )}
          />
        )}
      </Card>
    </Space>
  )
}

export default App
