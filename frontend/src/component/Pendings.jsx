import Skeleton from "react-loading-skeleton"

import AdminItem from "./AdminItem"

const Pendings = ({ pendings }) => {
    return(
        <div className="pendings-container">
            <h1>Pending Products</h1>
            {pendings?.map((prod , prodId) => <AdminItem prod={prod} prodId={prodId} key={prodId}/>) || <Skeleton count={3}/>}
        </div>
    )
}

export default Pendings