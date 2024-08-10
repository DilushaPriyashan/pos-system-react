import React, { useEffect, useState } from "react";
import { createUser, getUserById, getUsers } from "../services/userServices";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { FormGroup, FormLabel, ListGroupItem } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const User = () => {

    const [users, setUsers] = useState(null);
    const [userDetail, setUserDetail] = useState(null);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    const userRequest = async () => {   //async fuction because have to stop until backend function works
        const res = await getUsers();     //getUsers async functions at userService.js
        console.log(await res);
        await setUsers(res);
    }

    useEffect(() => {           //if we have to do a fuction without user involement we use useEffect
        userRequest();
    }, []);

    const getUserDetails = async (id) => {
        const res = await getUserById(id);
        setUserDetail(res);
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();    //stop default thing(browser submit request from the server)

        //validation can be done
        const data={
            "username":username,
            "password":password,
            "email":email,
        }
        const res= await createUser(data);
        if(res){
            setUsername("");
            setEmail("");
            setPassword("");

            userRequest();
        }
    }

    return (
        <div>
            <h1 class="h1">User Page</h1>

            <Row>
                <Col lg={6}>
                    <ListGroup>
                        {users && users.map((user) => {         // check whether the users set and then out put element of it 
                            return (
                                <ListGroupItem>
                                    <Row>
                                        <Col lg={6}>
                                            {user.username}
                                        </Col>
                                        <Col lg={6} className="text-end">
                                            <Button variant="primary" className="ms-auto" onClick={() => {
                                                getUserDetails(user.id)
                                            }}>Show</Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )
                        })}

                    </ListGroup>

                </Col>
                <Col lg={6}>
                    <div>
                        <h3>User Details</h3>
                        {userDetail &&
                            <div>
                                <div>Username:{userDetail.username}</div>
                                <div>Email:{userDetail.email}</div>
                            </div>
                        }
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-3">
                            <FormLabel>Username</FormLabel>
                            <Form.Control type="text" value={username} onChange={(event)=>{
                                setUsername(event.target.value);
                            }} placeholder="Enter username"/>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Password</FormLabel>
                            <Form.Control type="password" value={password} onChange={(event)=>{
                                setPassword(event.target.value);
                            }} placeholder="Enter password"/>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>User Name</FormLabel>
                            <Form.Control type="email" value={email} onChange={(event)=>{
                                setEmail(event.target.value);
                            }} placeholder="Enter email"/>
                        </FormGroup>
                        <Button variant="primary" type="submit">Save User</Button>
                    </Form>

                </Col>
            </Row>
        </div>
    )
}
export default User;