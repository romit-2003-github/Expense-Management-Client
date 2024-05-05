import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Footer from '../components/layout/Footer';
const Register = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            await axios.post('/users/register', values)
            message.success("Registration Successful")
            setLoading(false);
            navigate('/login');
        }
        catch (error) {
            setLoading(false);
            message.error("Error Registering User!")
        }
    }
    //prevent from login user
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <>
            <Header />
            <div className="register-page">
                {loading && <Spinner />}
                <div className="designR sm:hidden md:flex">
                    <h1>Welcome Back!</h1>
                    <h3>To keep connected with us please login here!</h3>
                    <Button type='primary' className='w-100' size='large' style={{ backgroundColor: "white" }}><Link to='/login' style={{ textDecoration: "none", color: "black" }}>Sign In</Link></Button>
                </div>
                <Form className='formR py-5' layout='vertical' onFinish={submitHandler}>
                    <h1 className='my-5 text-center font-bold text-4xl text-[#3CB29C]'>REGISTER HERE</h1>
                    <Form.Item className='w-100' label='Name' name="name" rules={[{ required: true, message: "Please enter your name" }]}>
                        <Input className='bo' />
                    </Form.Item>
                    <Form.Item className='w-100' label='Email' name="email" rules={[{ required: true, message: "Please enter your Email Id here" }]}>
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item className='w-100' label='Password' name="password" rules={[{ required: true, message: "Please choose a strong password" }]}>
                        <Input type='password' />
                    </Form.Item>
                    <div className="d-flex justify-content-between">
                        <Link to='/login' style={{ textDecoration: "none" }}>Already Registered ? Click here to Login</Link>
                    </div>
                    <Button type="primary" size='large' className='my-4 w-100 bg-[#3CB29C]' htmlType="submit">Register</Button>
                </Form>
            </div>
            <Footer/>
        </>
    )
}

export default Register
