import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { message, Dropdown, Modal } from 'antd';
import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import Profile from '../Profile';


const Header = () => {

    const [showModal, setShowModal] = useState(false);
    const [loginUser, setLoginUser] = useState('');
    const navigate = useNavigate();

    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        setLoginUser('');
        navigate('/login');
        message.success("Logged out Successfully!");
    }

    const items = [
        {
            key: '1',
            label: <Link className='flex justify-between' onClick={() => setShowModal(true)}>Profile <UserOutlined /></Link>,
        },
        {
            key: '2',
            label: <div className='flex justify-between' onClick={logoutHandler}>Logout <LogoutOutlined /></div>
        }
    ]
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setLoginUser(user);
        }
    }, [])


    return (
        <>
            <header className="header flex justify-between items-center flex-wrap py-4 px-6 lg:px-10 bg-[#3CB29C] w-full">
                <div className="logo">
                    <h2><Link to='/' className='text-3xl text-white'>ExpenseTrackPro</Link></h2>
                </div>
                <nav className="navItems flex flex-wrap items-center justify-center lg:justify-end">
                    <ul className='flex justify-center lg:justify-end space-x-6 lg:space-x-8 text-white'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to="/">About</Link></li>
                        <li><Link to="/">Features</Link></li>
                        <li><Link to="/">Contact</Link></li>
                    </ul>
                </nav>
                <div className="navButtons flex items-center justify-center lg:justify-end">
                    {/* <h5 className='mx-4 text-white'>{loginUser && loginUser.name}</h5>
                    {loginUser && <Button type='primary' className='mx-4' size='large' onClick={logoutHandler} style={{ backgroundColor: "white" }}><Link to='/register' style={{ textDecoration: "none", color: "black" }}>Logout</Link></Button>} */}
                    {loginUser && <Dropdown menu={{ items }} className='flex justify-between'>
                        <Button type='primary' className='mx-4 bg-white text-black font-bold items-center' size='large'>{loginUser && loginUser.name} <DownOutlined /></Button>
                    </Dropdown>}
                </div>
            </header>
            <Modal open={showModal}
                onOk={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
                footer={true}
            >
                <Profile />
                <div className='flex justify-end'>
                    <button className='btn bg-[#3CB29C] text-white' onClick={() => setShowModal(false)}>Close</button>
                </div>
            </Modal>
        </>
    )
}

export default Header
