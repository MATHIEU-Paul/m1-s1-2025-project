import { Input } from 'antd'

interface ImageInputProps {
  onImageChange: (image: string) => void
}

export function ImageInput({ onImageChange }: ImageInputProps) {
  return (
    <Input
      type="file"
      accept="image/*"
      onChange={e => {
        const file: File | undefined = e.target.files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = e => {
            if (e.target?.result) {
              onImageChange(e.target.result as string)
            }
          }
          reader.readAsDataURL(file)
        }
      }}
    />
  )
}
