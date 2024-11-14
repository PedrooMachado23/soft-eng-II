import React from "react"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/loginPage/loginPage";
import AdminUsersPage from "./pages/admin/adminUsers/adminUsersPage";
import AdminProfilePage from "./pages/admin/adminProfile/adminProfilePage";
import AdminTasksPage from "./pages/admin/adminTasks/adminTasksPage";
import './global.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/usersAdmin' element={<AdminUsersPage/>} />
        <Route path='/tasksAdmin' element={<AdminTasksPage />} />
        <Route path='/profileAdmin' element={<AdminProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;