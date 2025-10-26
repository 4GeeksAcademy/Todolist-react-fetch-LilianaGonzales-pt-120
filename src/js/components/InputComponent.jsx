import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const InputComponent = ({valueInput,title,handleChange}) => {
    return (
        <div>
        <input type="text" onChange={handleChange} value={valueInput} placeholder={title}/>
      </div>
    );
};

export default InputComponent;