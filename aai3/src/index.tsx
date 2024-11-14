import { StrictMode } from 'react';
import {createRoot} from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css'
import path from 'path';
import CreateUserPage from './pages/admin/createUserPage/createUserPage';
import CreateTaskPage from './pages/admin/createTaskPage/createTaskPage';
import LoginAdmPage from './pages/admin/loginAdmPage/loginAdmPage';
import ProfilePage from './pages/admin/profilePage/profilePage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<LoginAdmPage />}/>
        <Route path='/atividades' element={<CreateTaskPage/>}/>
        <Route path='/usuarios' element={<CreateUserPage/>}/>
        <Route path='/perfil' element={<ProfilePage/>}/>
      </Routes>
    </Router>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();