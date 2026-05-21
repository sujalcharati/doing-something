import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Helloworld } from '../components/Helloworld'
import { Portfolionavbar } from '../components/Portfolionavbar'
import { Portfoliohero } from '../components/Portfoliohero'
import { Contactform } from '../components/Contactform'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    {/* assignment 1 */}
    {/* <Helloworld/> */}
    {/* assignment 2  */}
    {/* <Portfolionavbar/>
    <Portfoliohero/> */}
    {/* assignment 3 */}
    <Contactform/>


    </>
  )
}

export default App
