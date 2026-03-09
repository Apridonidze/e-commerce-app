import Skeleton from "react-loading-skeleton"

const AdminList = ({ admins }) => {

    return(
        <div className="admin-list-container">
            <h1>Online Admins</h1>
            {admins?.length > 0 ? admins?.map((admin, adminId) => 
                <div className="admin d-flex justify-content-between" key={adminId}>
                    <div className="admin-start">
                        <span>Fullname : {admin.fullname}</span>
                        <span>Id : {admin.id}</span>
                    </div>
                </div>
            ) : 'No Admins Online'}
        </div>
    )
}
export default AdminList