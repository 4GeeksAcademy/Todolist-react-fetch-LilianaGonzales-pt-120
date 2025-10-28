import React from "react";
import InputComponent from "./InputComponent";

//create your first component
const ModalComponent = ({show,closeModal,handleChange,valueInput,addUser,title,titleInput,id,handleChangeRadio,stateEstadoTarea}) => {

if(!show) return null;

    return (
    <div className="modal" tabIndex='-1'  style={{ display:show? 'block':none}} id="miModal">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title title">{title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
      </div>
      <div className="modal-body">
        <InputComponent handleChange={handleChange} valueInput={valueInput} title={titleInput}/>
        {(id)?<div className="col-4">
          <label>
          <input 
            type="radio" 
            name="estado" 
            value="pendiente" 
            onChange={handleChangeRadio}
            checked = {stateEstadoTarea=='pendiente'}
          /> Pendiente
          </label>
          <label>
          <input 
            type="radio" 
            name="estado" 
            value="terminado"
            onChange={handleChangeRadio}
            checked = {stateEstadoTarea=='terminado'}
          /> Terminado
          </label>
        </div>:null}
        
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"onClick={closeModal}>cerrar</button>
        <button type="submit" className="btn btnAgregar" onClick={addUser}>{(id)?'Editar':'Agregar'}</button>
      </div>
    </div>
  </div>
</div>
    );
};

export default ModalComponent;