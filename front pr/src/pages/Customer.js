import React, { useEffect, useState } from "react";
import { createCustomer, getCustomerById, getCustomers, updateCustomer, deleteCustomerById } from "../services/customerService";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { FormGroup, FormLabel, ListGroupItem } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

const Customer = () => {

    const [customers, setCustomers] = useState(null);
    const [customerDetail, setCustomerDetail] = useState(null);

    const [customername, setCustomername] = useState(null);
    const [contact, setContact] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);

    // const handleShow = (id) => {
    //     setShow(true); 
    //     const cur_id = id;
    // };



    const customerRequest = async () => {   //async fuction because have to stop until backend function works
        const res = await getCustomers();     //getUsers async functions at userService.js
        console.log(await res);
        await setCustomers(res);
    }

    useEffect(() => {           //if we have to do a fuction without user involement we use useEffect
        customerRequest();
    }, []);

    const getCustomerDetails = async (id) => {
        const res = await getCustomerById(id);
        setCustomerDetail(res);
    }

    const deleteCustomer = async (id) => {
        console.log(id);
        const res = await deleteCustomerById(id);     //getUsers async functions at customerService.js
        customerRequest();
    }


    const handleSubmit = async (event) => {
        event.preventDefault();    //stop default thing(browser submit request from the server)

        //validation can be done
        const data = {
            "customername": customername,
            "contact": contact,
            "email": email,
            "address": address
        }

        console.log(data);

        const res = await createCustomer(data);
        if (res) {
            setCustomername("");
            setEmail("");
            setContact("");
            setAddress("");
            customerRequest();
        }

    }

    return (
        <div>
            <h1 class="h1">Customers</h1>
            <Row >
                <Col lg={6}>
                    <ListGroup>
                        {customers && customers.map((customer) => {         // check whether the users set and then out put element of it 
                            return (
                                <ListGroupItem>
                                    <Row>
                                        <Col lg={6}>
                                            {customer.id} | {customer.customername} 
                                        </Col>
                                        <Col lg={6} className="text-end">
                                            <Button variant="primary" className="ms-auto" onClick={() => {
                                                getCustomerDetails(customer.id)
                                            }}>View</Button>

                                            <Button variant="primary" onClick={() => {
                                                deleteCustomer(customer.id)
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
                                                    <Modal.Title>Delete Customer</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    If you sure you want to delete customer, click Confirm!
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={() => {
                                                        deleteCustomer(customer.id)
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
                        <h4>View customer</h4>
                        {customerDetail &&
                            <div>
                                <div>Customer ID:{customerDetail.id}</div>
                                <div>Customer name:{customerDetail.customername}</div>
                                <div>Contact:{customerDetail.contact}</div>
                                <div>Email:{customerDetail.email}</div>
                                <div>Address:{customerDetail.address}</div>
                            </div>
                        }
                    </div>

                    <h4>Create new customer</h4>

                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-1">

                            <Row className="align-items-center">
                                <Col lg={2}>
                                    <FormLabel>Name</FormLabel>
                                </Col>
                                <Col >
                                    <Form.Control
                                        type="text"
                                        value={customername}
                                        onChange={(event) => setCustomername(event.target.value)}
                                        placeholder="Enter customer name"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup className="mb-1">
                            <Row className="align-items-center">
                                <Col lg={2}>
                                    <FormLabel>Contact</FormLabel>
                                </Col>
                                <Col >
                                    <Form.Control
                                        type="contact"
                                        value={contact}
                                        onChange={(event) => setContact(event.target.value)}
                                        placeholder="Enter contact"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup className="mb-1">
                            <Row className="align-items-center">
                                <Col lg={2}>
                                    <FormLabel>Email</FormLabel>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="Enter email"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className="mb-1">
                            <Row className="align-items-center">
                                <Col lg={2}>
                                    <FormLabel>Address</FormLabel>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="address"
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                        placeholder="Enter address"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>

                        <Button variant="primary" type="submit" >Create Customer</Button>
                    </Form>
                </Col>

            </Row>
        </div>

    )

}

export default Customer;