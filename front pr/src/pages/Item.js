import React, { useEffect, useState } from "react";
import { createItem, getItemById, getItems, updateItem, deleteItemById } from "../services/itemService";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { FormGroup, FormLabel, ListGroupItem } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';


const Item = () => {

    const [items, setItems] = useState(null);
    const [itemDetail, setItemDetail] = useState(null);

    const [itemname, setItemname] = useState(null);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(null);
    const [category, setCategory] = useState(null);

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);

    // const handleShow = () => {
    //     setShow(true);
    // };


    const itemRequest = async () => {   //async fuction because have to stop until backend function works
        const res = await getItems();     //getUsers async functions at userService.js
        console.log(await res);
        await setItems(res);
    }

    useEffect(() => {           //if we have to do a fuction without user involement we use useEffect
        itemRequest();
    }, []);

    const getItemDetails = async (id) => {
        const res = await getItemById(id);
        setItemDetail(res);
    }

    const deleteItem = async (id) => {
        console.log(id)
        const res = await deleteItemById(id);     //getUsers async functions at customerService.js
        itemRequest();

    }


    const handleSubmit = async (event) => {
        event.preventDefault();    //stop default thing(browser submit request from the server)

        //validation can be done
        const data = {
            "name": itemname,
            "price": price,
            "qty": qty,
            "category": { "id": category }
        }

        console.log(data);

        const res = await createItem(data);
        itemRequest();
        if (res) {
            setItemname("");
            setPrice("");
            setQty("");
            setCategory("");
            itemRequest();
        }

    }


    return (
        <div>
            <h1 class="h1">Items</h1>

            <Row>
                <Col lg={6}>
                    <ListGroup>
                        {items && items.map((item) => {         // check whether the users set and then out put element of it 
                            return (
                                <ListGroupItem>
                                    <Row>

                                        <Col lg={1}>
                                            {item.id}
                                        </Col>
                                        <Col lg={2}>
                                            {item.name}
                                        </Col>
                                        <Col lg={1}>
                                            {item.price}
                                        </Col>
                                        <Col lg={1}>
                                            {item.qty}
                                        </Col>
                                        <Col lg={1}>
                                            {item.category.name}
                                        </Col>

                                        <Col lg={6} className="text-end">
                                            <Button variant="primary" className="ms-auto" onClick={() => {
                                                getItemDetails(item.id)
                                            }}>View</Button>

                                            <Button variant="primary" onClick={() => {
                                                deleteItem(item.id)
                                            }}>
                                                Delete
                                            </Button>

                                            {/* <Modal
                                                show={show}
                                                onHide={handleClose}
                                                backdrop="static"
                                                keyboard={false}
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Delete Item </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    If you sure you want to delete item {item.id} - {item.name}, click Confirm!
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={() => {
                                                        deleteItem(item.id)
                                                    }}>Confirm</Button>
                                                </Modal.Footer>
                                            </Modal> */}
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                            )
                        })}

                    </ListGroup>

                </Col>

                <Col lg={6}>
                    <div>
                        <h4>View item</h4>
                        {itemDetail &&
                            <div>
                                <div>Item ID:{itemDetail.id}</div>
                                <div>Item name:{itemDetail.name}</div>
                                <div>Price:{itemDetail.price}</div>
                                <div>Qty:{itemDetail.qty}</div>
                                <div>Category:{itemDetail.category.name}</div>
                            </div>
                        }
                    </div>

                    <h4>Create new item</h4>

                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-1">

                            <Row className="align-items-center">
                                <Col lg={2}>
                                    <FormLabel>Item Name</FormLabel>
                                </Col>
                                <Col >
                                    <Form.Control
                                        type="text"
                                        value={itemname}
                                        onChange={(event) => setItemname(event.target.value)}
                                        placeholder="Enter item name"
                                    />
                                </Col>
                            </Row>

                        </FormGroup>

                        <FormGroup className="mb-1">

                            <Row className="align-items-center">
                                <Col lg={2}>
                                    <FormLabel>Unit price</FormLabel>
                                </Col>
                                <Col >
                                    <Form.Control
                                        type="price"
                                        value={price}
                                        onChange={(event) => setPrice(event.target.value)}
                                        placeholder="Enter unit price"
                                    />
                                </Col>
                            </Row>

                        </FormGroup>

                        <FormGroup className="mb-1">

                            <Row className="align-items-center">
                                <Col lg={2}>
                                    <FormLabel>Qty</FormLabel>
                                </Col>
                                <Col >
                                    <Form.Control
                                        type="number"
                                        value={qty}
                                        onChange={(event) => setQty(event.target.value)}
                                        placeholder="Enter qty"
                                    />
                                </Col>
                            </Row>

                        </FormGroup>

                        <FormGroup className="mb-1">

                            <Row className="align-items-center">
                                <Col lg={2}>
                                    <FormLabel>Category</FormLabel>
                                </Col>
                                <Col >
                                    <Form.Control
                                        type="text"
                                        value={category}
                                        onChange={(event) => setCategory(event.target.value)}
                                        placeholder="Enter category id"
                                    />
                                </Col>
                            </Row>

                        </FormGroup>

                        <Button variant="primary" type="submit">Create Item</Button>
                    </Form>


                </Col>

            </Row>
        </div>
    )

}

export default Item;