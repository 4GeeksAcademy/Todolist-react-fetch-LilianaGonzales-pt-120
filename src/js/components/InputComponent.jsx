import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const InputComponent = ({valueInput,title,handleChange}) => {
    return (
        <div className="col-10">
        <input style={{borderRadius:"8px",borderColor:"#c6c7c8"}} type="text" onChange={handleChange} value={valueInput} placeholder={title}/>
      </div>
    );
};

export default InputComponent;