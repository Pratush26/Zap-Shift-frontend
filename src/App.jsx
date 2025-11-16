import { Outlet } from 'react-router'
import './App.css'
import Navbar from './Shared/Navbar'
import Footer from './Shared/Footer'

function App() {

  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
