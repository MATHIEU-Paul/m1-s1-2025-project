import { createFileRoute } from '@tanstack/react-router'
import { AuthorDetails } from '../authors/components/AuthorDetails' // Ajuste le chemin

export const Route = createFileRoute('/authors/$authorId')({
  component: () => {
    const { authorId } = Route.useParams()
    return <AuthorDetails id={authorId} />
  },
})