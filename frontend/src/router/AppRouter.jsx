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

const AppRouter = () => {

  const router = createBrowserRouter([
    {path : '/' , element : <Main />},
    {path : '/landing-page' , element : <Landing />},
    {path : '/dashboard' , element : <Dashboard />},
    {path : '/product/:id' , element : <ProductPage />},
    {path : '/admin-dashboard' , element : <AdminDashboard/>},
    {path : '/admin-dashboard/orders/:orderStatus' , element : <OrdersPage />},
    {path : '/admin-dashboard/admin-support-chat' , element  :<AdminSupportChatContainer />},
    {path : '/login' , element : <Login />},
    {path : '/sign' , element : <Sign />},
    {path : '*' , element : <></>}, /**add 404 page with not-found url for this and button to go back to main page */
    
    //add feedbacks send page
    //add credit cart fillout form
    // add faq page
    //add  which pages should be used with cookies rest left empty
  ])

  // add footer component and display it on each page

  //add localstorage theme get method, and style project based on its references (e.g : dark, light)
  
  return(
    <div className="app-container">
      <RouterProvider router={router}/>
    </div>
  )
}

export default AppRouter;