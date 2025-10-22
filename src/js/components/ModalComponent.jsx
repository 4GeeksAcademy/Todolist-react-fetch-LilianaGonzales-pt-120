import React from "react";

//create your first component
const ModalComponent = ({show,closeModal,handleChange,valueUser,addUser}) => {

if(!show) return null;

    return (
    <div className="modal" tabIndex='-1'  style={{ display:show? 'block':none}} id="miModal">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Agregar Usuario</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
      </div>
      <div className="modal-body">
        <input type="text" onChange={handleChange} value={valueUser} placeholder="Ingrese nuevo usuario"/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"onClick={closeModal}>cerrar</button>
        <button type="submit" className="btn btn-primary" onClick={addUser}>Agregar</button>
      </div>
    </div>
  </div>
</div>
    );
};

export default ModalComponent;