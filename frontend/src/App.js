import './App.css';
import { Navbar } from './components/Navbar';
import { UserList } from './components/UserList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddUser } from './components/AddUser';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/users' element={<UserList />} />
          <Route path='/add' element={<AddUser />} />
          <Route path='/' element={<Navigate to="/users" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
