import React from 'react'
import MainRoutes from './routes/MainRoutes'
import Nav from './components/Nav'
import Footer from './components/footer'

const App = () => {
  return (
  <div >
     <Nav />
    <MainRoutes/>
     <Footer/>
  </div>
  )
}

export default App