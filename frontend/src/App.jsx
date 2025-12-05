import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Main from './container/Main'
import Landing from './container/Landing'

const App = () => {

  const router = createBrowserRouter([
    {path : '/' , element : <Landing />},
    {path : '/main-page' , element : <Main />},
  ])

  return(
    <div className="app-container">
      <RouterProvider router={router}/>
    </div>
  )
}


export default App