import React, { useState } from 'react'
import { darkLogo } from '../Assets/index'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { RotatingLines } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/amazonSlice';
const Signin = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const auth = getAuth();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Erremail, setErremail] = useState("")
  const [Errpassword, setErrpassword] = useState("")



  // Firebase error
  const [userEmailErr, setuserEmailErr] = useState("")
  const [userPassErr, setuserPassErr] = useState("")
  const [loading, setloading] = useState(false);
  const [sucessMsg, setsucessMsg] = useState("")


  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErremail("")
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrpassword("")
  }
  const handlelogin = (e) => {
    e.preventDefault();
    if (!Email) {
      setErremail("Plz enter your Email")
    }
    if (!Password) {
      setErrpassword("Plz enter your Password")
    }
    if (Email && Password) {
      // console.log(Email, Password)
      setloading(true)
      signInWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          // Signedin
          const user = userCredential.user;
          // console.log(user)
          dispatch(setUserInfo({
            id:user.uid,
            userNmae:user.displayName,
            email:user.email,
            image:user.photoURL
          }))
          // ..
          setloading(false)
          setsucessMsg("Loggedin Sucessfully! Welcome")
          setTimeout(() => {
            navigate("/")
          }, 1000);
        })
        .catch((error) => {
          setloading(false);
          const errorCode = error.code;
          // console.log(errorCode)
          if (errorCode.includes("auth/invalid-email")) {
            setuserEmailErr("Invalid Email")
          }
          if (errorCode.includes("auth/wrong-password")) {
            setuserPassErr("Wrong password!try again")
          }
          console.log("Something is up,Try with correct credentials")
          // ...
        })
      setEmail("")
      setPassword("")
    }
  };
  return (
    <div className='w-full'>
      <div className='w-full bg-gray-100 pb-10'>
        {
          sucessMsg ? (<div className='flex w-full justify-center items-center py-32'>
            <p className='border-[1px] border-green-600 text-green-500 font-titleFont  text-lg  font-semibold  px-6 py-2'>{sucessMsg}</p>
          </div>) : <form className='w-[350px] mx-auto flex flex-col items-center'>
            <img className='w-32' src={darkLogo}></img>
            <div className='w-full border border-zinc-200 p-6'>
              <h2 className='font-titleFont text-3xl font-medium mb-4'>Sign in</h2>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Email or phone number</p>
                  <input onChange={handleEmail} value={Email} className='w-full py-1 border border-zinc-400 px-2 text text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type='email'></input>

                  {
                    Erremail && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span> {Erremail}</p>
                    )
                  }

                  {
                    userEmailErr && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span> {userEmailErr}</p>
                    )
                  }
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Password</p>
                  <input onChange={handlePassword} value={Password} className='w-full py-1 border border-zinc-400 px-2 text text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type='password'></input>
                  {
                    Errpassword && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span> {Errpassword}</p>
                    )
                  }
                  {
                    userPassErr && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span> {userPassErr}</p>
                    )
                  }
                </div>
                <button onClick={handlelogin} className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>Continue</button>
                {
                  loading && (
                    <div className='flex items-center justify-center'>
                      <RotatingLines 
                        strokeColor="#febd69"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                      />
                    </div>
                  )
                }
                {
                  sucessMsg && (
                    <div>
                      <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className='text-base font-titleFont font-semibold  text-green-500 border-[1px border-green-500 px-2 text-center]'>{sucessMsg}</motion.p>
                    </div>
                  )
                }
              </div>
              <p className='text-xs text-black leading-4 mt-4'>By Continuing, you agree to Amazon's{" "} <span className='text-blue-600'>Conditions of Use </span>and <span className='text-blue-600'>Privace Notice.</span></p>
              <p className='text-xs text-gray-600 mt-4 cursor-pointer group'><ArrowRightIcon /><span className='text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1'>Need Help?</span></p>
            </div>
            <p className='w-full text-xs text-gray-600 mt-4 flex items-center'>
              <span className='w-1/3 h-[1px] inline-flex bg-zinc-500'></span>
              <span className='w-1/3 text-center'>New to Amazon?</span>
              <span className='w-1/3 h-[1px] inline-flex bg-zinc-500'></span>
            </p>
            <Link className='w-full' to="/registration">
              <button className='w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>Create your Amazon account</button>
            </Link>
          </form>
        }
      </div>
      <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10'>
        <div className='flex items-center gap-6'>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Conditions of Use</p>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Privacy Notice</p>
        </div>
        <p className='text-xs text-gray-600'>© 1996-2023, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  )
}

export default Signin














