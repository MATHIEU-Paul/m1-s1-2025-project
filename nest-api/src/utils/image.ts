import * as fs from 'fs';

type FolderName = 'authors' | 'books' | 'clients';

export function convertBase64ToBuffer(base64: string): Buffer {
    console.log('Converting base64 to buffer:', base64)
  const base64Data = base64.split(',')[1]
  console.log('Base64 data extracted:', base64Data)
  return Buffer.from(base64Data, 'base64')
}

export function saveImage(base64: string, folderName: FolderName, id: string): string {
  const buffer = convertBase64ToBuffer(base64)
  const filename = `${id}.png`
  const dirPath = `/images/${folderName}`
  const filePath = `${dirPath}/${filename}`

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  fs.writeFileSync('.' + filePath, buffer)

  return filePath
}

export function deleteImage(folderName: FolderName, id: string): void {
  const imagePath = `./images/${folderName}/${id}.png`
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath)
    console.log('Image deleted:', imagePath)
  } else {
    console.warn('Image not found for deletion:', imagePath)
  }
}