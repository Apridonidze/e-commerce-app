const SubmitRemove = ({setToggleRemoveSubmit, toggleRemoveSubmit ,targetFunction}) => {
    return(
        <div className="submit-remove-container">
            <h3>Are you sure you want to remove <span className="hightlight">{toggleRemoveSubmit.params.fullname}</span> from admin list?</h3>
            <div className="row">
                <button onClick={() => setToggleRemoveSubmit({status : false, params : null})}>Cancel</button>
                <button onClick={() => {setToggleRemoveSubmit({status : false, params : null}) ; targetFunction(toggleRemoveSubmit.params.id)}}>Delete</button>
            </div>
        </div>
    );
};

export default SubmitRemove;