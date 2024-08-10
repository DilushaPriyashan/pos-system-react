import axios from "axios";

export const getUsers = async()=>{    // we used async to step by step ---> to stop everything load same ime
    try{                                // if it is real time whole run same time
        const response = await axios.get("http://localhost:9000/users");  // getting uses from the backend, meka await karanwa response eka enakn
        return await response.data;    //if fetch used --->return as json file(or any other type) so we have to convert it to json file
    }catch(error){                         // but axios return json file
        return error;
    }
}

// we used async to run the project step by step

export const getUserById = async(id)=>{
    try{
        const response = await axios.get("http://localhost:9000/users/"+id);   //axios is used instead of fetch for(get and post functions) 
        return await response.data;
    }catch(error){
        return error;
    }
}

export const createUser = async(data)=>{
    try{
        const response = await axios.post("http://localhost:9000/users",data);   
        return await response.data;
    }catch(error){
        return error;
    }
}