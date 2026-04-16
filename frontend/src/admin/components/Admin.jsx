const Admin = ({ admin, status }) => {
    return(
        <div className="admin-container text-center rounded-3" key={admin.id}>
            <div className="admin-icon">
                <i class="fa-regular fa-user border mx-auto border-2 border-dark rounded-5 px-4 py-2 d-flex align-items-center justify-content-center" style={{fontSize: "32px", border : 'none'}}></i>
                <span className="activity" style={{ width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', backgroundColor: status ? '#10b981' : '#9ca3af'}}></span>  
            </div>
            <h6>{admin.fullname}</h6>
            <span style={{color : status ? '#10b981' : ''}}>{status ? 'Online' : 'Offline'}</span>
        </div>
    )
}

export default Admin