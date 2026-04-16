const AdminList = ({ admins, setToggleManageAdmins }) => {

    let adminList = [...admins.onlineAdmins , ...admins.offlineAdmins].slice(0, 5)
    
    return(
        <div className="admin-list-container">
            <div className="header d-flex">
                <span>Admin Squad</span>
                <button onClick={() => setToggleManageAdmins(true)}>Manage Admins</button>
            </div>

            <div className="admin-div">

                {adminList.length ? adminList.map((admin, adminId) => 
                    <div className="admin d-flex justify-content-between" key={adminId}>
                        <div className="admin-start">
                            <span>Fullname : {admin.fullname}</span>
                            <span>Id : {admin.id}</span>
                            <span>Status: {admins.onlineAdmins.some(adm => adm.id === admin.id) ? 'online' : 'offline'}</span>
                        </div>
                    </div>
                ) : 'No Admins Online'}
            </div>

            
        </div>
    )
}
export default AdminList