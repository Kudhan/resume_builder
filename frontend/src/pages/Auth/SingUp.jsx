import React from 'react'
import Input from '../../components/inputs/input'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import { useState } from 'react'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'


const SignUp = ({setCurrentPage}) => {
   const [profilePic,setProfilePic] =useState(null);
   const [fullName,setFullName]=useState("");
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");

   const [error,setError]=useState("");

   const navigate=useNavigate();

   const handleSubmit =async(e)=>{
    e.preventDefault();

    let profileImageUrl="";

    if(!fullName){
      setError("Please enter Full Name");
      return;
    }

    if (!validateEmail(email)){
      setError("Invalid Email");
      return;
    }

    if(!password){
      setError("Please enter Password");
      return;

    }

    setError("");

   }

  return (
    <div className='w-[90vw] sm:w-[60vw] md:w-[40vw] lg:w-[33vw] p-6 md:p-8 flex flex-col justify-center mx-auto'>
     <h3 className='text-lg font-semibold text-black'>Create An Account</h3>
     <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please Fill The Details</p>
     <form onSubmit={handleSubmit}>
      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

      <div>
        <Input 
        value={fullName}
        onChange={({target})=>{setFullName(target.value)}}
        label="Full Name"
        placeholder="Name"
        type="text"
        />

        <Input 
        value={email}
        onChange={({target})=>{setEmail(target.value)}}
        label="Email Address"
        placeholder="Email Address"
        type="text"
        />

        <Input 
        value={password}
        onChange={({target})=>{setPassword(target.value)}}
        label="Password"
        placeholder="Password"
        type="Password"
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type="submit" className='btn-primary'>Singup</button>
        <p className='text-[13px] text-slate-800 mt-3'>Already Have an Account?{""}
          <button className='font-medium text-blue-600 underline cursor-pointer' onClick={()=>{
            setCurrentPage("login");
          }}>
            Login
          </button>
        </p>
      </div>
     </form>

    </div>
  )
}

export default SignUp
