import { InfoOutlined } from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'
import { AppBreadcrumb } from '../components/AppBreadcrumb'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div>
      <AppBreadcrumb items={[{ title: 'About', icon: <InfoOutlined /> }]} />
      <div>Hello from About!</div>
    </div>
  )
}
