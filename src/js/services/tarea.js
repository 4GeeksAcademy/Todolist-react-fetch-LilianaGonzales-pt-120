export const createTask = async(user)=>{
    try {
        const request = await fetch(`https://playground.4geeks.com/todo/todos/${user}`)
        const response = await request.json();
        console.log(response);
        
    } catch (error) {
        console.log(error);
    }
}