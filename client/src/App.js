
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Signup from './components/Signup';
import Login from './components/Login';
import Homepage from './pages/Homepage';
import ProductDetalsPage from './pages/ProductDetalsPage';

function App() {
  return (

    <div >
      <Routes>

        <Route path='/' element={<Homepage/>}/>

        <Route path='/signup' element={<Signup/>}/>
        
        <Route path='/login' element={<Login/>}/>

        <Route path='/product/:id' element={<ProductDetalsPage/>}/>

      </Routes>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false}/>
    </div>
  );
}

export default App;
