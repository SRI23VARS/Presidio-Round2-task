import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import All from './All';
import New from './New';
import Modify from './Modify';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<All />}></Route>
      <Route path='/New' element={<New />}></Route>
      <Route path='/modify/:id' element={<Modify />}></Route>

      </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App
