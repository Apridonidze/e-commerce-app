import Skeleton from "react-loading-skeleton"

const AdminList = ({ admins }) => {

    return(
        <div className="admin-list-container">
            <h1>Online Admins</h1>
            {admins ? admins?.map((admin, adminId) => 
                <div className="admin d-flex justify-content-between" key={adminId}>
                    <div className="admin-start">
                        <span>Fullname : {admin.fullname}</span>
                        <span>Id : {admin.email}</span>
                    </div>
                </div>
            ) : <Skeleton />}
        </div>
    )
}
export default AdminList