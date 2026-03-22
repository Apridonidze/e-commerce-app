const AdminList = ({ admins, setToggleManageAdmins }) => {
    
    return(
        <div className="admin-list-container">
            <div className="header d-flex">    
                <button onClick={() => setToggleManageAdmins(true)}>Manage Admins</button>
            </div>


            
            <div className="admin-div">

                <h3>Online Admins</h3>

                {admins?.onlineAdmins.length ? admins?.onlineAdmins.map((admin, adminId) => 
                    <div className="admin d-flex justify-content-between" key={adminId}>
                        <div className="admin-start">
                            <span>Fullname : {admin.fullname}</span>
                            <span>Id : {admin.id}</span>
                        </div>
                    </div>
                ) : 'No Admins Online'}
            </div>

            <div className="admin-div">

                <h3>Offline Admins</h3>

                {admins?.offlineAdmins.length ? admins?.offlineAdmins.map((admin, adminId) => 
                    <div className="admin d-flex justify-content-between" key={adminId}>
                        <div className="admin-start">
                            <span>Fullname : {admin.fullname}</span>
                            <span>Id : {admin.id}</span>
                        </div>
                    </div>
                ) : 'No Offline Admins'}

            </div>

            
        </div>
    )
}
export default AdminList