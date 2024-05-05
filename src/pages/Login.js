import React, {useState, useEffect} from 'react'
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/layout/Header';
import Spinner from '../components/Spinner';
import Footer from '../components/layout/Footer';
const Login = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const submitHandler = async (values) => {
        try{
            setLoading(true);
            const {data} = await axios.post('/users/login', values)
            message.success("Login Successful")
            localStorage.setItem('user', JSON.stringify({...data.user, password:''}))
            setLoading(false);
            navigate("/");
        }
        catch(error)
        {
            setLoading(false);
            localStorage.removeItem('user');
            message.error("Error Logging In!");
            console.log(error);
        }

    };

    //prevent from login user
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <>
            <Header />
            <div className="login-page">
                {loading && <Spinner/>}
                <Form className='formL' onFinish={submitHandler} layout='vertical'>
                    <h1 className='my-5 text-center text-4xl font-bold text-[#3CB29C]'>LOGIN HERE</h1>
                    <Form.Item className='w-100' label='Email' name='email' rules={[{ required: true, message: "Please enter register email" }]}>
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item className='w-100' label='Password' name='password' rules={[{ required: true, message: "Please enter correct password" }]}>
                        <Input type='password' />
                    </Form.Item>
                    <div className="d-flex justify-content-between">
                        <Link to='/register'>Not Registered? Click here</Link>
                    </div>
                    <div className="LoginButtons">
                        <Button type="primary" htmlType="submit" className='my-4 bg-[#3CB29C]'>Login</Button>
                        <Button type="primary" htmlType="submit" className='my-4 mx-2 bg-red-500'>Google</Button>
                    </div>
                </Form>
                <div className="designL text-center sm:hidden md:flex">
                    <h1>Welcome To our Family!</h1>
                    <h3>To be a part of us, please register here!</h3>
                    <Button type='primary' size='large' className='bg-white w-100'><Link to='/register' style={{ textDecoration: "none", color: "black" }}>Sign Up</Link></Button>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Login
