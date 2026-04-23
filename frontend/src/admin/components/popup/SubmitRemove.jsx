const SubmitRemove = ({setToggleRemoveSubmit, toggleRemoveSubmit ,targetFunction}) => {
    return(
        <div className="submit-remove-container position-relative rounded-3 mx-auto p-3 pt-4">

            <div className="submit-remove-header d-flex align-items-center justify-content-between w-100 fs-4 ">
                <div className="submitRemoveIcon rounded-1"><i class="fa-solid fa-trash p-2 w-auto "></i></div>
                <button className="btn btn-0 border-0"><i class="fa-solid fa-xmark fs-5"></i></button>
            </div>

            <div className="submit-remove-body">
                <h3>Are you sure you want to remove <span className="hightlight">{toggleRemoveSubmit.params.fullname}</span> from admin list?</h3>
            </div>

            <div className="submit-remove-footer"> 
                <button className="btn" onClick={() => setToggleRemoveSubmit({status : false, params : null})}>Keep</button>
                <button className="btn" onClick={() => {setToggleRemoveSubmit({status : false, params : null}) ; targetFunction(toggleRemoveSubmit.params.id)}}>Delete</button>
            </div>
        </div>
    );
};

export default SubmitRemove;