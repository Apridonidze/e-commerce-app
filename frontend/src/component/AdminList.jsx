import Skeleton from "react-loading-skeleton"

const AdminList = ({ admins }) => {
    return(
        <div className="admin-list-container">
            <h1>Admins</h1>
            {admins !==null ? admins?.map((admin, adminId) => 
                <div className="admin d-flex justify-content-between" key={adminId}>
                    <div className="admin-start">
                        <span>Id : {admin.id}</span>
                        <span>Id : {admin.fullname}</span>
                        <span>Id : {admin.email}</span>
                    </div>
                    <div className="admin-end">
                        <button>Remove</button>
                    </div>
                </div>
            ) : <Skeleton />}
        </div>
    )
}
export default AdminList