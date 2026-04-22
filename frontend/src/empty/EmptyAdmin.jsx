const EmptyAdmin = () => {
    return(
        <div className="empty-admin-container d-flex flex-column justify-content-center text-center rounded-3" style={{minHeight : "220px" , maxWidth : '100%'}}>
            <i className="fa-solid fa-plane-slash w-auto p-3 rounded-4 mb-3"></i>
            <h4>Could Not Fetch Active Admin's List</h4>
            <h6>Try Later!</h6>
        </div>
    );
};

export default EmptyAdmin;