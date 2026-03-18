const AdminList = ({ admins, setToggleManageAdmins }) => {

    console.log(admins)
    
    return(
        <div className="admin-list-container">
            <div className="header d-flex">    
                <h1>Online Admins</h1>
                <button onClick={() => setToggleManageAdmins(true)}>Manage Admins</button>
            </div>
            {admins?.onlineAdmins.length ? admins?.onlineAdmins.map((admin, adminId) => 
                <div className="admin d-flex justify-content-between" key={adminId}>
                    <div className="admin-start">
                        <span>Fullname : {admin.fullname}</span>
                        <span>Id : {admin.id}</span>
                    </div>
                </div>
            ) : 'No Admins Online'}
            
            {admins?.offlineAdmins.length ? admins?.offlineAdmins.map((admin, adminId) => 
                <div className="admin d-flex justify-content-between" key={adminId}>
                    <div className="admin-start">
                        <span>Fullname : {admin.fullname}</span>
                        <span>Id : {admin.id}</span>
                    </div>
                </div>
            ) : 'No Offline Admins'}
        </div>
    )
}
export default AdminList