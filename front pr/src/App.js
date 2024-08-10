import logo from './logo.svg';
import './App.scss';
import {Router,Routes,Route,BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import Help from './pages/Help';
import Customer from './pages/Customer';
import Item from './pages/Item';
import Order from './pages/Order';
import Layout from './layout/Layout';



function App() {    // web link ekak nisa BrowerRouter gannawa
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>   {/*common layout eka athule anith ewa gahuwama }
          {/*define router links*/}
          <Route path='/' element={<Home/>}/>
          {/*default path eka and Home kiyana element eka -------> default eka home page eka*/ }

          {/*<Route path='/user' element={<User/>}/>*/ }
          
          <Route path='/customer' element={<Customer/>}/>
          <Route path='/item' element={<Item/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/help' element={<Help/>}/>
        </Route>

      </Routes>

    </BrowserRouter>
  
  );
}

export default App;
