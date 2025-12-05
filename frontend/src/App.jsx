import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Main from './container/Main'

const App = () => {

  const router = createBrowserRouter([
    {path : '/' , element : <Main />}
  ])

  return(
    <div className="app-container">
      <RouterProvider router={router}/>
    </div>
  )
}


export default App