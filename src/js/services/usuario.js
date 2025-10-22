


export const getUser = async(user)=>{
    try {
        const request = await fetch(`https://playground.4geeks.com/todo/users/${user}`)
        const response = await request.json();
    } catch (error) {
        console.log(error);
    }
}
export const getListUser = async()=>{
    try {
        const request = await fetch("https://playground.4geeks.com/todo/users/")
        const response = await request.json();
        console.log(response);
        return response.users
    } catch (error) {
        console.log(error);
    }
}

 export const createUser = async (user) =>{
    try {
        const request = await fetch(`https://playground.4geeks.com/todo/users/${user}`,{
            method: "POST",
            headers: {
                "accept": "application/json"
            },
            body:'',
        });
        const result = await request.json();
        console.log(result);
    } catch (error) {
        console.log(error);
        
    }
 }
 export const deleteUser = async (user) =>{
    try {
        const request = await fetch(`https://playground.4geeks.com/todo/users/${user}`,{
            method: "DELETE",
            headers: {
                "accept": "application/json"
            }
        });
        //const response = await request.json();
        //console.log(request);
    } catch (error) {
        console.log(error);
        
    }
 }