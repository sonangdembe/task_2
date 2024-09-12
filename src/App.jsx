import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import { UserList } from './components/UserList'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserList/>}/>
      <Route path='/task2' element={<UserList/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App