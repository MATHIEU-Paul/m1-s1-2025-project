import { createFileRoute } from '@tanstack/react-router'
import { AuthorsPage } from '../authors/AuthorsPage'

export const Route = createFileRoute('/authors')({
  component: AuthorsPage,
})