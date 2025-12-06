import { RouterProvider, createBrowserRouter} from 'react-router-dom'


import Main from './container/Main'
import Landing from './container/Landing'
import Login from './container/Login'
import Sign from './container/Sign'


const App = () => {

  const router = createBrowserRouter([
    {path : '/' , element : <Landing />},
    {path : '/main-page' , element : <Main />},
    {path : '/discover' , element : <Main />},
    {path : '/add-new-product' , element : <Main />},
    {path : '/reports' , element : <Main />},
    {path : '/dashboard' , element : <Main />},
    {path : '/login' , element : <Login />},
    {path : '/sign' , element : <Sign />},
  ])

  return(
    <div className="app-container">
      <RouterProvider router={router}/>
    </div>
  )
}
/**<Link>Home</Link>
                    <Link>Discover</Link>
                    <Link>Add New Product</Link>
                </div>
                <div className="center-bottom">
                    <Link>Reports</Link>
                    <Link>Dashboard</Link> */

export default App