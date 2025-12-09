import { RouterProvider, createBrowserRouter} from 'react-router-dom'


import Main from './container/Main'
import Landing from './container/Landing'
import Login from './container/Login'
import Sign from './container/Sign'
import CreateProduct from './container/CreateProduct'
import Dashboard from './container/Dashboard'


const App = () => {

  const router = createBrowserRouter([
    {path : '/' , element : <Landing />},
    {path : '/home-page' , element : <Main />},
    {path : '/reports' , element : <Main />},
    {path : '/dashboard' , element : <Dashboard />},
    {path : '/admin-dashboard' , element : <Main />},
    {path : '/login' , element : <Login />},
    {path : '/sign' , element : <Sign />},
    {path : '*' , element : <Sign />}, /**add error page */
  ])

  return(
    <div className="app-container">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App