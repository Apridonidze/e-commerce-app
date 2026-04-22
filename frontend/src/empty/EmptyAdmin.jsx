const EmptyAdmin = () => {
    return(
        <div className="empty-admin-container text-center rounded-3" style={{minHeight : "220px" , maxWidth : '100%'}}>
            <i class="fa-solid fa-plane-slash"></i>
            <h4>Could Not Fetch Active Admin's List</h4>
            <h6>Try Later!</h6>
        </div>
    );
};

export default EmptyAdmin;