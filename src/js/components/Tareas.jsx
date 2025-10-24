import { useEffect, useState } from "react";
import { getUser } from "../services/usuario";

const Tareas = (name) =>{
    const [listTareas,setListTareas] = useState([]);
    const handleListTareas = async()=>{
        try {
            const result = await getUser(name.name);
            console.log(typeof(result),result);
            setListTareas(result.todos)
            
        } catch (error) {
            console.log(error);
            
        }
    }
        
    useEffect(()=>{
     handleListTareas();
     console.log(name.name);
     
    },[]);
    return (

        <div> 
            <form>
            <div>
                <div><input placeholder="agregar tareas"/></div>
                <div><button type="button" className="btn btn-primary">agregar</button></div>
                
            </div>
            
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th >Item</th>
                        <th >Nombre de Tarea</th>
                        <th ></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listTareas.map((data,index)=>(
                            <tr key={index} >
                                <td>{index+1}</td>
                                <td>{data.label}</td>
                                {/* <td>
                                    <div>
                                    <i className="fa-solid fa-trash" onClick={()=>eliminarUsuario(data.name)} title="Eliminar"></i>
                                    <i className="fa-solid fa-list-check" onClick = {handleOpenModalTareas} title="Ver Tarea"></i>
                                    </div> 
                                </td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
export default Tareas;