import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Layout } from '../Layout'
import { ThemeProvider } from '../providers/ThemeProvider' 
const RootLayout = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })