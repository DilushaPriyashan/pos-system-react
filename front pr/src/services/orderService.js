import axios from "axios";

export const getOrders = async()=>{    // we used async to step by step ---> to stop everything load same ime
    try{                                // if it is real time whole run same time
        const response = await axios.get("http://localhost:9000/orders");  // getting uses from the backend, meka await karanwa response eka enakn
        return await response.data;    //if fetch used --->return as json file(or any other type) so we have to convert it to json file
    }catch(error){                         // but axios return json file
        return error;
    }
}

// we used async to run the project step by step

export const getOrderById = async(id)=>{
    try{
        const response = await axios.get("http://localhost:9000/orders/"+id);   //axios is used instead of fetch for(api functions) 
        return await response.data;
    }catch(error){
        return error;
    }
}

export const createOrder = async (customer, items, total) => {
    try {
        const response = await axios.post("http://localhost:9000/orders/", {
            customer: customer,
            items: items.map(item => ({ id: item.id, qty: item.quantity })),
            total: total
        });

        console.log('Order created successfully:', response.data);
        // Optionally, you can handle success (e.g., show a success message)
    } catch (error) {
        console.error('Error creating order:', error);
        // Optionally, you can handle errors (e.g., show an error message)
    }
};