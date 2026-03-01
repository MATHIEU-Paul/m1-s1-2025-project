import { HomeOutlined } from '@ant-design/icons'
import { useState } from 'react'
import './App.css'
import { AppBreadcrumb } from './components/AppBreadcrumb'
import { Hello } from './Hello'

function App() {
  const [name, setName] = useState<string>('')
  const [newName, setNewName] = useState<string>('')

  const onValidate = () => {
    setName(newName)
    setNewName('')
  }

  return (
    <>
      <AppBreadcrumb
        showHome={false}
        items={[{ title: 'Home', icon: <HomeOutlined /> }]}
      />
      <Hello name={name}>How are you ?</Hello>
      <input value={newName} onChange={e => setNewName(e.target.value)} />
      <button onClick={onValidate}>OK</button>
      <h3>This is a subtitle</h3>
    </>
  )
}

export default App
