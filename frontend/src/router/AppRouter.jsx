import { RouterProvider, createBrowserRouter} from 'react-router-dom'


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
import { useEffect, useRef } from 'react'

const AppRouter = () => {

  const bodyRef = useRef(null)

  const router = createBrowserRouter([
    {path : '/' , element : <Main />},
    {path : '/sales' , element : <Sales />},
    {path : '/landing-page' , element : <Landing />},
    {path : '/dashboard' , element : <Dashboard />},
    {path : '/product/:id' , element : <ProductPage />},
    {path : '/admin-dashboard' , element : <AdminDashboard/>},
    {path : '/admin-dashboard/orders/:orderStatus' , element : <OrdersPage />},
    {path : '/admin-dashboard/reports' , element : <Reports />},
    {path : '/admin-dashboard/feedbacks' , element : <Feedbacks />},
    {path : '/admin-dashboard/admin-support-chat' , element  :<AdminSupportChatContainer />},
    {path : '/faq' , element  :<FAQ />},
    {path : '/report-platform' , element  :<ReportPage />},
    {path : '/leave-feedback' , element  :<LeaveFeedback />},
    {path : '/legal' , element  :<Legal />},
    {path : '/login' , element : <Login />},
    {path : '/sign' , element : <Sign />},
    {path : '*' , element : <NotFound />}, /**add 404 page with not-found url for this and button to go back to main page */
    //add  which pages should be used with cookies rest left empty
  ])

  // add content to Footer.jsx 
  // create NoProductFound.jsx component
  // create skeletons for components
  // add texts to landing page
  // fix sales and product page with non defined states error
  // change sidebar text with icon
  // style sidebar and style focused links
 

  return(
    <div className="app-container" ref={bodyRef}>
      <RouterProvider router={router}/>
    </div>
  )
}

export default AppRouter;