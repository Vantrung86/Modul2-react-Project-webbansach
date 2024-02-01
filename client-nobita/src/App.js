
import './App.css';
import { Route,Routes } from "react-router-dom"
import Home from './page/Home';
import NotFound from './components/Main/NotFound';
import ListNewBook from './page/ListNewBook';
import ListReleaseBook from './page/ListReleaseBook';
import ListSellerBook from './page/ListSellerBook';
import BookDetail from './page/BookDetail';
import Login from './page/Login';
import Register from './page/Register';
import Admin from './admin/Admin';
import Cart from './page/Cart';
import ManagerUser from './admin/ManagerUser';
import ListOrder from './admin/ListOrder';
import BillUser from './page/BillUser';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/list-new-book' element={<ListNewBook />}></Route>
        <Route path='/list-release-book' element={<ListReleaseBook />}></Route>
        <Route path='/list-seller-book' element={<ListSellerBook />}></Route>
        <Route path="/bookdetail/:id" element={<BookDetail />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/bill" element={<BillUser />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path='/manager-user' element={<ManagerUser />}></Route>
        <Route path='/list-order' element={<ListOrder />}></Route>


        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
