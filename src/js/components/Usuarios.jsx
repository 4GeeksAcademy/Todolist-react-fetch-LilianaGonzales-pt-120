
import React, { useState } from "react";
import { createUser, deleteUser, getListUser, getUser } from "../services/usuario";
import { useEffect } from "react";
import ModalComponent from "./ModalComponent";

//include images into your bundle


//create your first component
const Usuarios = () => {
const [listUsuario,setListUsuario]= useState([]);
const [showModal, setShowModal]= useState(false);
const [value, setValue]= useState('');
    //getUser('alex');
    // createUser('milagros');
    //getListUser();
    //deleteUser('erika');
const handleListUser = async()=>{
    try {
        const result = await getListUser();
        console.log(result);
        setListUsuario(result)
        
    } catch (error) {
        console.log(error);
        
    }
}
    
useEffect(()=>{
 handleListUser();
},[]);

const eliminarUsuario = async (id) => {
	console.log(id);
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
        // const result = await createUser(value);
        // return result
        const result = await createUser(value);
        console.log(result);
        
        // setListUsuario((prevList)=>{ return [...prevList,result]});
        handleListUser();
        setValue('')
    } catch (error) {
        console.log(error);
        
    }
}

const handleOpenModal=() =>{
    console.log("hola");
    setShowModal(true)
    console.log(showModal);
    
}
const handleChange=(event) =>{
    console.log("hola");
    setValue(event.target.value)
    console.log(showModal);
    
}
const handleCloseModal = () =>{
    setShowModal(false);setValue('')
}

    return (
        <div className="col-lg-6">
            

            <h1 className="text-center mt-5">Lista de Usuarios</h1>
            <button type="button" className="btn btn-primary" onClick={handleOpenModal}>Agregar Usuario</button>
            {/* <button type="button" className="btn btn-primary" onClick={setShowModal(true)}>Agregar Usuario</button> */}
                <ModalComponent show={showModal} closeModal= {handleCloseModal} handleChange={handleChange} valueUser={value} addUser={agregarUsuario}/>
            <table className="table">
                <thead>
                    <tr>
                        <th >Item</th>
                        <th >Nombre de usuario</th>
                        <th ></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsuario.map((data,index)=>(
                            <tr key={index} >
                                <td>{index+1}</td>
                                <td>{data.name}</td>
                                <td className="delete" onClick={()=>eliminarUsuario(data.name)}><i className="fa-solid fa-trash"></i></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
           
        </div>
    );
};

export default Usuarios;