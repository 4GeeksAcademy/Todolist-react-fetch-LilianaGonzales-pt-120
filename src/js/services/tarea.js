export const createTask = async(user,body)=>{
    try {
        const request = await fetch(`https://playground.4geeks.com/todo/todos/${user}`,{
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body),
        });
        const response = await request.json();
        return response
    } catch (error) {
        console.log(error);
    }
}
export const deleteTask = async(id)=>{
    try {
        const request = await fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
            method: "DELETE",
            headers: {
                "accept": "application/json"
            },
        });
        const response = await request.json();
        return response
    } catch (error) {
        console.log(error);
    }
}
export const EditTask = async(id,body)=>{
    try {
        const request = await fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
            method: "PUT",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body),
        });
        const response = await request.json();
        return response
    } catch (error) {
        console.log(error);
    }
}