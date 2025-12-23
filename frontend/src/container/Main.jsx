import { useEffect, useState } from "react"
import Category from "../component/Category"
import Header from "../component/Header"
import Products from "../component/Products"
import Sidebar from "../component/Sidebar"

const Main = () => {

    const [offset, setOffset] = useState(0)
    const [category, setCategory] = useState(null);

    const fetchProducts = () => {

    }

    useEffect(() => {
        return () => {fetchProducts()}
    },[])



    return(
        <div className="main-container container-fluid row border" style={{height : '100vh'}}>
            <div className="main-start col">
                <Sidebar /> 
            </div>
            <div className="main-end col">
                <Header />
                <Category setCategory={setCategory} category={category}/>

            </div>
        </div>
    )
}

export default Main