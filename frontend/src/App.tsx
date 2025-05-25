import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Account from './pages/account/Account'
import EditAccount from './pages/account/EditAccount'
import Dashboard from './pages/dashboard/Dashboard'
import Register from './pages/register/Register'
import TransactionList from './pages/transaction/TransactionList'
import NewTransaction from './pages/transaction/NewTransaction'
import TransactionDetails from './pages/transaction/TransactionDetails'
import Cashback from './pages/transaction/Cashback'

function App() {
  return (
    <Routes>
      <Route path="/transaction/:id/cashback/:trId" element={<Cashback />} />
      <Route path="/transaction/new/:id" element={<NewTransaction />} />
      <Route path="/account/edit/:id" element={<EditAccount />} />
      <Route path="/transaction/:id/:trId" element={<TransactionDetails />} />
      <Route path="/transaction/:id" element={<TransactionList />} />
      <Route path="/account/:id" element={<Account />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
