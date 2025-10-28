import { useEffect, useState } from "react";
import { getUser } from "../services/usuario";
import ModalComponent from "./ModalComponent";
import { createTask, deleteTask, EditTask } from "../services/tarea";

const Tareas = (name) =>{
    const [listTareas,setListTareas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [value,setValue] = useState('');
    const [id,setId] = useState('');
    const [stateTarea, setStateTarea] = useState(false);
    const [stateEstadoTarea, setStateEstadOTarea] = useState('');
    const [valueBusqueda,setValueBusqueda] = useState('');

    const titleAdd = "Agregar Tarea";
    const titleEdit = "Modificar Tarea";

    const handleListTareas = async()=>{
        try {
            const result = await getUser(name.name);
            setListTareas(result.todos)
        } catch (error) {
            console.log(error);
        }
    }
        
    useEffect(()=>{
     handleListTareas();
    },[]);

    const handleOpenModal=() =>{
    setShowModal(true)
    setId('') 
    }

    const handleOpenModalEditar = (data) =>{
        setId(data.id)
        setShowModalEditar(true);
        setValue(data.label);
        if(data.is_done==false){
            setStateEstadOTarea('pendiente')
        }else{
            setStateEstadOTarea('terminado')
        }
    }

    const handleCloseModal = () =>{
        setShowModal(false);
        setValue('')
    }

    const handleCloseModalEditar = () =>{
        setShowModalEditar(false);
        setValue('')
    }

    const handleChange=(event) =>{
        setValue(event.target.value)
    }

    const handleChangeRadio=(event) =>{
        (event.target.value == 'terminado')?setStateTarea(true):setStateTarea(false)
        setStateEstadOTarea(event.target.value)
    
    }

    const agregarTarea = async(e) =>{
        e.preventDefault();
            setShowModal(false);
            const body = {
                label:value,
                is_done:false,
            }
            try {
                const result = await createTask(name.name,body);
                setListTareas((prevList)=>{ return [...prevList,result]});
                setValue('');
            } catch (error) {
                console.log(error);   
            }
    }

    const eliminarTarea = async (id) => {
        try {
            const result = await deleteTask(id);
            handleListTareas();
        } catch (error) {
            console.log(error);
        }
    }

    const editarTarea = async (e) =>{
        e.preventDefault();
            setShowModalEditar(false);
            const body = {
                label:value,
                is_done:stateTarea,
            }
            try {
                await EditTask(id,body);
                try {
                    const actualizado = await getUser(name.name)
                    setListTareas(actualizado.todos)
                } catch (error) {
                    
                }
                handleListTareas;
                setValue('');
            } catch (error) {
                console.log(error);
                
            }
    }

    const handleSearch = (e) =>{
        setValueBusqueda(e.target.value.toLowerCase());
    }

    const handleSubmit = async(e)=>{
        e.preventDefault(); 
        try {
            const dato = await getUser(name.name);
            if(valueBusqueda.length===0){
                setListTareas(dato.todos)
            } else{
            const result = dato.todos.filter(element=>element.label.toLowerCase().includes(valueBusqueda));
               setListTareas(result)
            } 
        } catch (error) {
            console.log(error);
            
        }
    }
    return (

        <div> 
            <form onSubmit={handleSubmit}>
            <div className="row d-flex">
                <div className="col-8"><input className="input-tarea" onChange={handleSearch} style={{width:"100%",height:"38px",borderRadius:"8px",borderColor:"#c6c7c8",paddingLeft:"10px"}} placeholder="Buscar ..."/></div>
                <div className="col-4"><button type="submit" className="btn btnAgregar" onClick={handleSubmit}>Buscar <i class="fa-solid fa-magnifying-glass"></i></button></div>

                <ModalComponent show={(!id)?showModal:showModalEditar} 
                                closeModal= {(!id)?handleCloseModal: handleCloseModalEditar}
                                title={(!id)?titleAdd: titleEdit}
                                titleInput={(!id)?"Ingresar Nueva Tarea":""}
                                handleChange={handleChange}
                                valueInput={value}
                                addUser={(!id)?agregarTarea:editarTarea}
                                id={id}
                                handleChangeRadio={handleChangeRadio}
                                stateEstadoTarea={stateEstadoTarea}
                                />
                
            </div>
            
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th >Item</th>
                        <th >Nombre de Tarea</th>
                        <th >Estado</th>
                        <th >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        listTareas.map((data,index)=>(
                            data.id?
                            <tr key={index} >
                                <td>{index+1}</td>
                                <td>{data.label}</td>
                                <td>{(data.is_done==true)?'Terminado':'Pendiente'}</td>
                                <td>
                                    <div>
                                    <i className="fa-solid fa-trash img" onClick={()=>eliminarTarea(data.id)} title="Eliminar"></i>
                                    <i className="fa-solid fa-pen-to-square editar" title="Editar" onClick={()=>handleOpenModalEditar(data)}></i>
                                    </div> 
                                </td>
                            </tr>: <p className="mensaje">No existen tareas</p>
                        ))
                    }
                </tbody>
            </table>
            <div><button type="button" className="btn btnAgregar btnInferior" onClick={handleOpenModal}>Agregar <i className="fa-sharp fa-solid fa-user" ></i></button></div>
        </div>
    );
}
export default Tareas;