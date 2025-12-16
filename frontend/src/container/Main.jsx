import Category from "../component/Category"
import Header from "../component/Header"
import Sidebar from "../component/Sidebar"

const Main = () => {

    return(
        <div className="main-container container-fluid row border" style={{height : '100vh'}}>
            <div className="main-start col-3">
                <Sidebar /> 
            </div>
            <div className="main-end col">
                <Header />
                <Category />
            </div>
        </div>
    )
}

export default Main