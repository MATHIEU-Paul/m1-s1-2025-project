import {
  BookOutlined,
  HomeOutlined,
  InfoOutlined,
  LockOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Avatar, Button, Space, Switch, Typography, type MenuProps } from 'antd'
import Menu from 'antd/es/menu/menu'
import { useState } from 'react'
import { AuthModal } from './auth/AuthModal'
import { useAuth } from './auth/useAuth'
import { useTheme } from './providers/useTheme'
import { Route as aboutRoute } from './routes/about'
import { Route as authorsRoute } from './routes/authors'
import { Route as booksRoute } from './routes/books'
import { Route as clientsRoute } from './routes/clients'
import { Route as indexRoute } from './routes/index'
import './styles/navbar.css'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { isDarkMode, toggleTheme } = useTheme()
  const { user, logout, isLoading } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const items: Required<MenuProps>['items'] = [
    {
      label: <Link to={indexRoute.to}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={booksRoute.to}>Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
    },
    {
      label: <Link to={authorsRoute.to}>Authors</Link>,
      key: 'authors',
      icon: <TeamOutlined />,
    },
    {
      label: <Link to={clientsRoute.to}>Clients</Link>,
      key: 'clients',
      icon: <UserOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>About</Link>,
      key: 'about',
      icon: <InfoOutlined />,
    },
  ]

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          width: '100%',
          backgroundColor: 'var(--app-header-bg)',
          color: 'var(--app-header-text)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Link
            to={indexRoute.to}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '0 1rem',
              padding: '0.75rem 1rem',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <img
              src="/babel.png"
              alt="Babel logo"
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            />
            <h2 style={{ margin: 0 }}>Babel&apos;s Library</h2>
          </Link>
          <Menu
            theme="dark"
            mode="horizontal"
            items={items}
            className="main-nav"
            style={{
              backgroundColor: 'transparent',
              flexGrow: 1,
              borderBottom: 'none',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginRight: '2rem',
          }}
        >
          {isLoading ? null : user ? (
            <>
              <Avatar
                size="small"
                icon={<UserOutlined />}
                style={{ backgroundColor: 'var(--app-header-bg)' }}
              />
              <Typography.Text
                style={{
                  marginRight: '0.25rem',
                  color: 'var(--app-header-text)',
                  width: 'max-content',
                }}
              >
                {user.username}
              </Typography.Text>
              <Button className="auth-action-btn" onClick={() => void logout()}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                className="auth-action-btn"
                icon={<LockOutlined />}
                onClick={() => {
                  setAuthMode('login')
                  setIsAuthModalOpen(true)
                }}
              >
                Log in
              </Button>
              <Button
                className="auth-action-btn"
                type="primary"
                onClick={() => {
                  setAuthMode('register')
                  setIsAuthModalOpen(true)
                }}
              >
                Sign up
              </Button>
            </>
          )}

          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            checkedChildren="🌙"
            unCheckedChildren="☀️"
          />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          padding: '2rem',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </div>

      <AuthModal
        open={isAuthModalOpen}
        mode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </Space>
  )
}
