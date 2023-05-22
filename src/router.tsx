
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';


import login from './pages/Login/index'
import Error from './pages/modal/modalError'
import Home from './pages/Home';
import analitico from './pages/analítico';
import Order from './pages/order';
import { delivery } from './pages/delivery';

export default function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route  Component={login}  path="/"/>
        <Route Component={Home} path='/home'/>
        <Route Component={Order} path='/order'/>
        <Route Component={delivery} path='/delivery'/>
        <Route Component={analitico} path='/analitics'/>


        <Route Component={Error} path="/error"/>
      </Routes>
    </BrowserRouter>
  );
}

