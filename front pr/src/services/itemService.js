import axios from "axios";

export const getItems = async()=>{    // we used async to step by step ---> to stop everything load same ime
    try{                                // if it is real time whole run same time
        const response = await axios.get("http://localhost:9000/items");  // getting uses from the backend, meka await karanwa response eka enakn
        return await response.data;    //if fetch used --->return as json file(or any other type) so we have to convert it to json file
    }catch(error){                         // but axios return json file
        return error;
    }
}

// we used async to run the project step by step

export const getItemById = async(id)=>{
    try{
        const response = await axios.get("http://localhost:9000/items/"+id);   //axios is used instead of fetch for(get and post functions) 
        return await response.data;
    }catch(error){
        return error;
    }
}

export const createItem = async(data)=>{
    try{
        const response = await axios.post("http://localhost:9000/items",data);   
        return await response.data;
    }catch(error){
        return error;
    }
}

export const updateItem = async(data)=>{
    try{
        const response = await axios.put("http://localhost:9000/items",data);   
        return response.data;
    }catch(error){
        return error;
    }
}

export const deleteItemById = async(id)=>{
    try{
        const response = await axios.delete("http://localhost:9000/items/"+id);   //axios is used instead of fetch for(get and post functions) 
        console.log("Delete request");
        return response;
    }catch(error){
        return error;
    }
}