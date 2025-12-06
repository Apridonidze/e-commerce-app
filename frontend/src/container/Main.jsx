import Category from "../component/Category"
import Header from "../component/Header"
import Sidebar from "../component/Sidebar"

const Main = () => {

    


    return(
        <div className="main-container">
            <div className="main-start">
                <Sidebar /> 
            </div>
            <div className="main-end">
                <Header />
                <Category />
            </div>
        </div>
    )
}

export default Main