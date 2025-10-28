
import React, { useState } from "react";
import { createUser, deleteUser, getListUser, getUser } from "../services/usuario";
import { useEffect } from "react";
import ModalComponent from "./ModalComponent";
import ModalTareas from "./ModalTareas";

//include images into your bundle


//create your first component
const Usuarios = () => {
const [listUsuario,setListUsuario]= useState([]);
const [showModal, setShowModal]= useState(false);
const [value, setValue]= useState('');
const [valueBusqueda,setValueBusqueda] = useState('');
const [showTareas, setShowTareas ] = useState(false);
const [user, setUser] = useState('');

const title = "Agregar Usuario";

const handleListUser = async()=>{
    try {
        const result = await getListUser();
        setListUsuario(result)
    } catch (error) {
        console.log(error);   
    }
}
    
useEffect(()=>{
 handleListUser();
},[]);

const eliminarUsuario = async (id) => {
    try {
        const result = await deleteUser(id);
        handleListUser();
    } catch (error) {
        console.log(error);
    }
}

const agregarUsuario = async (e) =>{
    e.preventDefault();
    setShowModal(false);
    try {
        const result = await createUser(value);
       handleListUser();
        setValue('')
    } catch (error) {
        console.log(error);  
    }
}

const handleOpenModal=() =>{
    setShowModal(true)
}

const handleOpenModalTareas=(id) =>{
    setUser(id);
    setShowTareas(true); 
}

const handleChange=(event) =>{
    setValue(event.target.value)
}

const handleCloseModal = () =>{
    setShowModal(false);setValue('')
}

const handleCloseModalTareas = () =>{
    setShowTareas(false)
}

const handleSearch = (e) =>{
    setValueBusqueda(e.target.value.toLowerCase());
}

const handleSubmit = async(e)=>{
	e.preventDefault();
    try {
        const dato = await getListUser();
        if(valueBusqueda.length===0){
            setListUsuario(dato)
        } else{
           const result = dato.filter(element=>element.name.toLowerCase()===valueBusqueda);
           setListUsuario(result)
        } 
    } catch (error) {
        console.log(error);   
    }	
}

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-6 fondo">
                    
                    <h1 className="text-center mt-5 title">Lista de Usuarios</h1>
                    <form onSubmit={handleSubmit} >
                        <div className="row d-flex">
                        <div className="col-8"><input type="text" style={{width:"100%",height:"38px",borderRadius:"8px",borderColor:"#c6c7c8",paddingLeft:"10px"}} onChange={handleSearch} placeholder="Buscar..."/></div>
                            <div className="col-4"><button type="submit" className="btn btnAgregar" onClick={handleSubmit}>Buscar <i class="fa-solid fa-magnifying-glass"></i></button></div>
                        </div>
                    </form>
                        <ModalComponent show={showModal} closeModal= {handleCloseModal} handleChange={handleChange} 
                        valueInput={value} addUser={agregarUsuario} title={title} titleInput="Ingresar Nuevo Usuario"/>
                    <table className="table">
                        <thead>
                            <tr>
                                <th >Item</th>
                                <th >Nombre de usuario</th>
                                <th >Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listUsuario.map((data,index)=>(
                                    <tr key={index} >
                                        <td>{index+1}</td>
                                        <td>{data.name}</td>
                                        <td><div>
                                            <i className="fa-sharp fa-solid fa-user-slash user" onClick={()=>eliminarUsuario(data.name)} title="Eliminar Usuario"></i>
                                            <i className="fa-solid fa-list-check task" onClick = {()=>handleOpenModalTareas(data.name)} title="Ver Tarea"></i>
                                            </div> 
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                <ModalTareas show = {showTareas} closeModal = {handleCloseModalTareas} name={user} />
                <div><button type="button" className="btn btnAgregar btnInferior" onClick={handleOpenModal}>Agregar <i className="fa-sharp fa-solid fa-user" ></i></button></div>
                </div>
            </div>
        </div>
    );
};

export default Usuarios;