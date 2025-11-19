import { Outlet, useNavigation } from 'react-router'
import './App.css'
import Navbar from './Shared/Navbar'
import Footer from './Shared/Footer'
import Loader from './Shared/Loader'

function App() {
  const { state } = useNavigation()
  return (
    <div className='flex flex-col min-h-screen items-center justify-between p-4 md:p-8'>
      <Navbar />
      {
        state === 'loading' ?
          <Loader />
          :
          <Outlet />
      }
      <Footer />
    </div>
  )
}

export default App
