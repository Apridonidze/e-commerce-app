import { Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'


import Main from '../routes/Main'
import Landing from '../routes/Landing'
import Login from '../routes/Login'
import Sign from '../routes/Sign'
import Dashboard from '../routes/Dashboard'
import AdminDashboard from '../routes/AdminDashboard'
import AdminSupportChatContainer from '../routes/AdminSupportChatContainer'
import ProductPage from '../routes/ProductPage'
import OrdersPage from '../routes/OrdersPage'
import Reports from '../routes/Reports'
import Feedbacks from '../routes/Feedbacks'
import FAQ from '../routes/FAQ'
import LeaveFeedback from '../routes/LeaveFeedback'
import ReportPage from '../routes/ReportPage'
import Legal from '../routes/Legal'
import Sales from '../routes/Sales'
import NotFound from '../routes/NotFound'
import { useContext, useRef } from 'react'
import LowStockPage from '../routes/LowStockPage'
import { UserContext } from '../context/UserContext'

const AppRouter = () => {

  const { user } = useContext(UserContext)
  const bodyRef = useRef(null)

  const router = createBrowserRouter([
    {path : '/' , element : <Main />},
    {path : '/sales' , element : <Sales />},
    {path : '/landing-page' , element : <Landing />},
    {path : '/dashboard' , element : !user ? <Navigate to='/'/> : <Dashboard />},
    {path : '/product/:id' , element : <ProductPage />},
    {path : '/admin-dashboard' , element : user.role !== 'admin' ? <Navigate to='/*'/> : <AdminDashboard/>},
    {path : '/admin-dashboard/orders/:orderStatus' , element : user.role !== 'admin' ? <Navigate to='/*'/> : <OrdersPage />},
    {path : '/admin-dashboard/reports' , element : user.role !== 'admin' ? <Navigate to='/*'/> :<Reports />},
    {path : '/admin-dashboard/reports/:reportStatus' , element : user.role !== 'admin' ? <Navigate to='/*'/> :<Reports />},
    {path : '/admin-dashboard/feedbacks' , element : user.role !== 'admin' ? <Navigate to='/*'/> :<Feedbacks />},
    {path : '/admin-dashboard/low-stock' , element : user.role !== 'admin' ? <Navigate to='/*'/> :<LowStockPage />},
    {path : '/admin-dashboard/admin-support-chat' , element  : user.role !== 'admin' ? <Navigate to='/*'/> :<AdminSupportChatContainer />},
    {path : '/faq' , element  :<FAQ />},
    {path : '/report-platform' , element  : !user ?  <Navigate to='/*'/> : <ReportPage />},
    {path : '/leave-feedback' , element  : !user ?  <Navigate to='/*'/> :  <LeaveFeedback />},
    {path : '/legal' , element  :<Legal />},
    {path : '/login' , element : <Login />},
    {path : '/sign' , element : <Sign />},
    {path : '*' , element : <NotFound />},
  ])

  return(
    <div className="app-container" ref={bodyRef}>
      <RouterProvider router={router}/>
    </div>
  )
}

export default AppRouter;