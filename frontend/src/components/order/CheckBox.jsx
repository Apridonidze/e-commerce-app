import '../../styles/checkbox.css'

const CheckBox = ({id, onChange, checkboxRef, defaultChecked = false }) => {
    return (
        <label className="checkbox-wrapper">
            <input type="checkbox" id={id} defaultChecked={defaultChecked} onChange={onChange} ref={(el) => (checkboxRef.current[id] = el)}/>
            <span className="custom-box "><span className="checkmark"><i class="fa-solid fa-check text-white"></i></span></span>
        </label>
  );
};

export default CheckBox;