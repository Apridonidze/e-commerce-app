const AdminRow = ({admin, status, disabled, handleRemoveAdmin}) => {
    return(
        <div className="admin-row-container p-2 rounded-3 d-flex align-items-center justify-content-between" key={admin.id}>

            <div className="admin-row-start d-flex gap-1 align-items-center">
                <div className="admin-icon mt-3">
                    <i class="fa-regular fa-user border mx-auto border-2 border-dark rounded-5 px-4 py-2 d-flex align-items-center justify-content-center" style={{fontSize: "32px", border : 'none'}}></i>
                    <span className="admin-activity" style={{ width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', backgroundColor: status ? '#10b981' : '#9ca3af'}}></span>  
                </div>
                <div className="admin-data">
                    <h6>{admin.fullname}</h6>
                    <span style={{color : status ? '#10b981' : ''}}>{status ? 'Online' : 'Offline'}</span>
                </div>
            </div>

            <div className="admin-row-end">
                <button className="deleteIcon btn-none border-0" disabled={disabled} onClick={() => {handleRemoveAdmin(admin.id)}}><i className=" fa-solid fa-trash-can" ></i></button>
            </div>
            
       
        </div>  
    )
}

export default AdminRow