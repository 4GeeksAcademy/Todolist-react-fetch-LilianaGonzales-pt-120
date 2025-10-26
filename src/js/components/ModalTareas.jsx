import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Tareas from "./Tareas";

//create your first component
const ModalTareas = ({show,closeModal,name}) => {
  console.log('ingreso en el componente modalTareas |');
  console.log(name);
  
    console.log(show);
    if(!show) return null;
    
    return (
        <div className="modal" tabIndex="-1" style={{ display:show? 'block':none}} id="miModal">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Lista de Tareas de {name}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
      </div>
      <div className="modal-body">
        <Tareas name={name}/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Cerrar</button>
        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div>
    );
};

export default ModalTareas;