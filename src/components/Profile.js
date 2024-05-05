import React from 'react'
import logo from '../logo.svg'
const Profile = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  const dateObject = new Date(user.createdAt);

  const date = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  return (
    <>
      <div className="userProfileDetails h-[40rem] flex flex-col items-center justify-center">
        <h1 className='text-4xl font-bold text-[#3CB29C]'>PROFILE</h1>
        <img src={logo} alt="Loading" />
        <h3 className=' text-3xl font-bold'>{user.name}</h3>
        <h1 className='text-xl my-4'>{user.email}</h1>
        <h1 className='text-xl mb-1'>{date}-{month}-{year} {hours}:{minutes}:{seconds}<br /></h1>
      </div>
    </>
  )
}

export default Profile
