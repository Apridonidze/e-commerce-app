import { RouterProvider, createBrowserRouter} from 'react-router-dom'


import Main from './container/Main'
import Landing from './container/Landing'
import Login from './container/Login'
import Sign from './container/Sign'
import CreateProduct from './container/CreateProduct'


const App = () => {

  const router = createBrowserRouter([
    {path : '/' , element : <Landing />},
    {path : '/main-page' , element : <Main />},
    {path : '/discover' , element : <Main />},
    {path : '/add-new-product' , element : <CreateProduct />},
    {path : '/reports' , element : <Main />},
    {path : '/dashboard' , element : <Main />},
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