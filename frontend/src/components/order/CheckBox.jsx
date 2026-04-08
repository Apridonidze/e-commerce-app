import '../../styles/checkbox.css'; //importing css file

const CheckBox = ({id, onChange, checkboxRef, defaultChecked = false }) => {
    return (
        <label className="checkbox-wrapper me-2">
            <input type="checkbox" id={id} defaultChecked={defaultChecked} onChange={onChange} ref={(el) => (checkboxRef.current[id] = el)}/>
            <span className="custom-box "><span className="checkmark"><i class="fa-solid fa-check text-white"></i></span></span>
        </label>
  );
};

export default CheckBox; //exporting component