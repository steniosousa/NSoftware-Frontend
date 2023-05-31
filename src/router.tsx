
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';


import login from './pages/Login/index'
import Error from './pages/modal/modalError'
import Home from './pages/Home';

import Order from './pages/order';
import { Delivery } from './pages/delivery';
import Register from './pages/register';
import Management from './pages/management';


export default function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={login}  path="/"/>
        <Route Component={Register}  path="/register"/>
        <Route Component={Home} path='/home'/>
        <Route Component={Order} path='/order'/>
        <Route Component={Delivery} path='/delivery'/>
        <Route Component={Management} path='/management'/>


        <Route Component={Error} path="/error"/>
      </Routes>
    </BrowserRouter>
  );
}

