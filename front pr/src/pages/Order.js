import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { FormGroup, FormLabel, ListGroupItem } from "react-bootstrap";
import { createCustomer, getCustomerById, getCustomers, updateCustomer, deleteCustomerById } from "../services/customerService";
import { createItem, getItemById, getItems, updateItem, deleteItemById } from "../services/itemService";
import { getOrders, getOrderById, createOrder } from "../services/orderService";
import Table from 'react-bootstrap/Table';


const Order = () => {

    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [selectedItemID, setSelectedItemID] = useState('');

    const [quantity, setQuantity] = useState(0);
    const [qty, setQty] = useState(null);


    const [customers, setCustomers] = useState(null);
    const [customerDetail, setCustomerDetail] = useState(null);

    const customerRequest = async () => {   //async fuction because have to stop until backend function works
        const res = await getCustomers();     //getUsers async functions at userService.js
        console.log(await res);
        await setCustomers(res);
    }


    const [items, setItems] = useState(null);
    const [itemDetail, setItemDetail] = useState("");

    const [itemDetailById, setItemDetailById] = useState("");

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        // Check if the item is already in the cart
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            // Update the quantity if the item is already in the cart
            const updatedCart = cartItems.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
            );
            setCartItems(updatedCart);
        } else {
            // Add the item to the cart if it's not already there
            setCartItems([...cartItems, item]);
        }

    };


    useEffect(() => {           //if we have to do a fuction without user involement we use useEffect
        customerRequest();
    }, []);

    const getCustomerDetails = async (id) => {
        const res = await getCustomerById(id);
        console.log(res);
        setCustomerDetail(res);
    }

    const itemRequest = async () => {   //async fuction because have to stop until backend function works
        const res = await getItems();     //getUsers async functions at userService.js
        console.log(await res);
        await setItems(res);
    }

    useEffect(() => {           //if we have to do a fuction without user involement we use useEffect
        itemRequest();
    }, []);

    const getItembyId = async (id) => {
        const res = await getItemById(id);
        setItemDetail(res);
        setQty(res)

        console.log(res);
    }


    const getItemForCart = async (id) => {
        const res = await getItemById(id);
        setItemDetailById(res);

    }

    const getDetails = async (event, customerId, itemId, quantity) => {
        event.preventDefault();
        await getCustomerDetails(customerId);
        await getItemForCart(itemId); // Fetch item details before adding to cart

        const newItem = {
            id: itemId,
            name: itemDetailById.name,
            price: itemDetailById.price,
            quantity: quantity
        };

        console.log(newItem);

        addToCart(newItem);
    }


    

    const getTotalPrice = () => {
        return cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
    };

    // function getDetails(event, customerId, itemId, quantity) {
    //     event.preventDefault();

    //     console.log(customerId, itemId, quantity);

    //     getCustomerDetails(customerId);
    //     getItembyId(itemId);


    //     const newItem = {
    //         id: itemId,
    //         name: itemDetail.name,
    //         price: itemDetail.price,
    //         quantity: quantity
    //     };

    //     addToCart(newItem);
    // }

    const removeCartItem = (itemId) => {
        const updatedCart = cartItems.filter((cartItem) => cartItem.id !== itemId);
        setCartItems(updatedCart);
    };

    function getItem(event, customerId, itemId) {
        event.preventDefault();
        console.log("Item ID:", itemId);
        getItemForCart(itemId);
       

        // getCustomerDetails(customerId);
    }


    const placeOrder = () => {

        //createOrder(customerDetail, cartItems, getTotalPrice());
        // Construct the data to send to the backend (cart items and customer ID

        console.log(customerDetail, cartItems, getTotalPrice());
        window.location.reload();
    }

    return (
        <div>
            <h1 class="h1">Order</h1>

            <Row>
                <Col lg={6}>

                    <Form onSubmit={(e) => getDetails(e, selectedCustomerId, selectedItemID, quantity)}>
                        <FormGroup className="mb">
                            <h4>Select customer</h4>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => setSelectedCustomerId(e.target.value)}
                            >
                                <option>Choose customer</option>
                                {customers &&
                                    customers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.id} | {customer.customername}
                                        </option>
                                    ))}
                            </Form.Select>

                            <h4>Select item</h4>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => setSelectedItemID(e.target.value)}
                            >
                                <option>Choose item</option>
                                {items &&
                                    items.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.id} | {item.name}
                                        </option>
                                    ))}
                            </Form.Select>
                        </FormGroup>
                        <Button variant="primary" onClick={(e) => getItem(e, selectedCustomerId, selectedItemID)}>
                            Select  Item
                        </Button>

                        <h6>Available quantity : {itemDetailById.qty}</h6>

                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Row>
                                <Col lg={4}>
                                    <h6>Needed quantity :</h6>
                                </Col>
                                <Col lg={4}>
                                    <Form.Control
                                        type="number"
                                        value={quantity}
                                        onChange={(event) => setQuantity(event.target.value)}
                                        placeholder="Needed quatity"
                                    />
                                </Col>
                            </Row>

                        </Form.Group>

                        <Button type="submit">Add to cart</Button>
                    </Form>


                </Col>

                <Col lg={6}>
                    <h4>Cart</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Item Id</th>
                                <th>Item Name</th>
                                <th>U price</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th></th> {/* New column for Remove button */}
                            </tr>
                        </thead>

                        <tbody>
                            {cartItems.map((cartItem) => (
                                <tr key={cartItem.id}>
                                    <td>{cartItem.id}</td>
                                    <td>{cartItem.name}</td>
                                    <td>{cartItem.price}</td>
                                    <td>{cartItem.quantity}</td>
                                    <td>{cartItem.quantity * cartItem.price}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => removeCartItem(cartItem.id)}>
                                            X
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4}>Total Price</td>
                                <td>{getTotalPrice()}</td>
                                <td></td> {/* Empty cell for alignment with Actions column */}
                            </tr>
                        </tbody>

                    </Table>
                    <Button variant="primary" onClick={placeOrder}>Place Order</Button>
                </Col>
               
            </Row>
        </div>
    )
}

export default Order;