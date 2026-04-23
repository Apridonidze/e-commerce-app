const SubmitRemove = () => {
    return(
        <div className="submit-remove-container">
            <h3>are you sure you want to delete this?</h3>
            <div className="row">
                <button>Cancel</button>
                <button>Delete</button>
            </div>
        </div>
    );
};

export default SubmitRemove()