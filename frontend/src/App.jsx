import { RouterProvider, createBrowserRouter} from 'react-router-dom'


import Main from './container/Main'
import Landing from './container/Landing'
import Login from './container/Login'
import Sign from './container/Sign'
import Dashboard from './container/Dashboard'
import AdminDashboard from './container/AdminDashboard'
import AdminSupportChatContainer from './container/AdminSupportChatContainer'


const App = () => {

  const router = createBrowserRouter([
    {path : '/' , element : <Main />},
    {path : '/landing-page' , element : <Landing />},
    {path : '/dashboard' , element : <Dashboard />},
    {path : '/admin-dashboard' , element : <AdminDashboard/>},
    //add /admin-dashboard/pending-products
    //add /admin-dashboard/onway-products
    //add /admin-dashboard/delivered-products
    {path : '/admin-dashboard/admin-support-chat' , element  :<AdminSupportChatContainer />},
    {path : '/login' , element : <Login />},
    {path : '/sign' , element : <Sign />},
    {path : '*' , element : <></>}, /**add 404 page for this and button to go back to main page */

    //add feedbacks send page
    //add report send page
    //add credit cart fillout form
    //add  which pages should be used with cookies rest left empty
    //add page for each page with likes , orders , comments  and data
  ])

  //add live chat between supports and users 
  return(
    <div className="app-container">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App