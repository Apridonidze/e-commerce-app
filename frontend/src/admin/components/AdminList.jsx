const AdminList = ({ admins, setToggleManageAdmins }) => {

    return(
        <div className="admin-list-container">
            <div className="header d-flex">    
                <h1>Online Admins</h1>
                <button onClick={() => setToggleManageAdmins(true)}>Manage Admins</button>
            </div>
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