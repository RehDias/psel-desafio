import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Account from './pages/account/Account'
import Dashboard from './pages/dashboard/Dashboard'
import Register from './pages/register/Register'
import TransactionList from './pages/transaction/TransactionList'
import NewTransaction from './pages/transaction/NewTransaction'
import TransactionDetails from './pages/transaction/TransactionDetails'
import Cashback from './pages/transaction/Cashback'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Routes>
      <Route path="/transaction/:id/cashback/:trId" element={<PrivateRoute><Cashback /></PrivateRoute>}  />
      <Route path="/transaction/new/:id" element={<PrivateRoute><NewTransaction /></PrivateRoute>}  />
      <Route path="/transaction/:id/:trId" element={<PrivateRoute><TransactionDetails /></PrivateRoute>}  />
      <Route path="/transaction/:id" element={<PrivateRoute><TransactionList /></PrivateRoute>}  />
      <Route path="/account/:id" element={<PrivateRoute><Account /></PrivateRoute>} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
