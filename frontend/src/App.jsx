import { RouterProvider, createBrowserRouter} from 'react-router-dom'


import Main from './container/Main'
import Landing from './container/Landing'
import Login from './container/Login'
import Sign from './container/Sign'
import Dashboard from './container/Dashboard'
import AdminDashboard from './container/AdminDashboard'


const App = () => {

  const router = createBrowserRouter([
    {path : '/' , element : <Landing />},
    {path : '/home-page' , element : <Main />},
    {path : '/reports' , element : <></>},
    {path : '/dashboard' , element : <Dashboard />},
    {path : '/admin-dashboard' , element : <AdminDashboard/>},
    {path : '/login' , element : <Login />},
    {path : '/sign' , element : <Sign />},
    {path : '*' , element : <Landing />}, /**add error page */
    //add feedbacks send page
    //add report send page
    //add credit cart fillout form
  ])

  return(
    <div className="app-container">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App