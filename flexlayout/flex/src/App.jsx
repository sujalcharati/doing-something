import { useState } from 'react'

import './App.css'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { Content } from '../components/Content'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className='grid grid-cols-1 md:grid-cols-[290px_1fr]'>

    <Sidebar/>
    <Content/>
    </div>
    </>
  )
}

export default App
