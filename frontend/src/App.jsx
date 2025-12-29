import { RouterProvider, createBrowserRouter} from 'react-router-dom'


import Main from './container/Main'
import Landing from './container/Landing'
import Login from './container/Login'
import Sign from './container/Sign'
import Dashboard from './container/Dashboard'
import AdminDashboard from './container/AdminDashboard'


const App = () => {

  const router = createBrowserRouter([
    {path : '/' , element : <Main />},
    {path : '/landing-page' , element : <Landing />},
    {path : '/reports' , element : <></>},
    {path : '/dashboard' , element : <Dashboard />},
    {path : '/admin-dashboard' , element : <AdminDashboard/>},
    {path : '/login' , element : <Login />},
    {path : '/sign' , element : <Sign />},
    {path : '*' , element : <Landing />}, /**add error page */
    //add feedbacks send page
    //add report send page
    //add credit cart fillout form
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