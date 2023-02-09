import React from 'react'
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

export default function AccountPage() {
  const {ready,user}=useContext(UserContext);

if(!ready){
  return 'Loading....';
}

  if(ready && !user){
    return <Navigate to={'/login'}/>
  }

  const {subpage}= useParams();
  console.log(subpage);

  
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link className="py-2 px-6  bg-primary text-white rounded-full"to={'/account'}>My Profile</Link>
        <Link className="py-2 px-6 " to={'/account/bookings'}>My Bookings</Link>
        <Link className="py-2 px-6 " to={'/account/accommodations'}>My accommodations</Link>
      </nav>
    </div>
  );
}
