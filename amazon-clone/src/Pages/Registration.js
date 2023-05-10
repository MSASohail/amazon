import React from 'react'
import { darkLogo } from '../Assets/index'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { motion } from 'framer-motion';
const Registration = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [clientName, setclientName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [cPassword, setcPassword] = useState("")

    // Error messages start here
    const [errclientName, setErrclientName] = useState("")
    const [errEmail, setErrEmail] = useState("")
    const [errPassword, setErrPassword] = useState("")
    const [errcPassword, setErrcPassword] = useState("")
    const [firebaseErr, setfirebaseErr] = useState(" ")

    // Loading start here
    const [loading, setloading] = useState(false);
    const [sucessMsg, setsucessMsg] = useState("")

    // Handler function
    const handleName = (e) => {
        setclientName(e.target.value)
        setErrclientName("")
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
        setErrEmail("")
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
        setErrPassword("")
    }
    const handleRePassword = (e) => {
        setcPassword(e.target.value)
        setErrcPassword("")
    }
    // Email validation function
    const validateEmail = (Email) => {
        return String(Email).toLowerCase().match(/\S+@\S+\.\S+/)
    }


    // Submit button start here
    const handleRegistration = (e) => {
        e.preventDefault();
        if (!clientName) {
            setErrclientName("Enter your name")
        }

        if (!Email) {
            setErrEmail("Enter your Email")
            setfirebaseErr("")
        } else {
            if (!validateEmail(Email)) {
                setErrEmail("Plz enter a valid email")
            }
        }
        if (!Password) {
            setErrPassword('Enter your password')
        } else {
            if (Password.length < 6) {
                setErrPassword("Password length must be upto 6 characters")
            }
        }
        if (!cPassword) {
            setErrcPassword("Confirm your password")
        } else {
            if (cPassword !== Password) {
                setErrcPassword("plz enter a valid password")
            }
        }
        // console.log(clientName)
        if (clientName && Email && validateEmail(Email) && Password && cPassword && cPassword === Password && Password.length >= 6) {
            // console.log(clientName, Email, Password, cPassword);
            setloading(true)
            createUserWithEmailAndPassword(auth, Email, Password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: clientName,
                        photoURL: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSs7Zp6IVqeT1e9Fyrl1chSs0YtEkZw7oDxvi1zwQK4yZtqyBLRZqdli7CO15FTpFeNn773qRSAHvyLDks"
                    })
                    // signed in
                    const user = userCredential.user;
                    setloading(false)
                    sucessMsg("Account created Sucessfully!")
                    setTimeout(() => {
                        navigate("/signin")
                    }, 2000);
                    // console.log(user)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    // console.log(errorCode)
                    if (errorCode.includes("auth/email-already-in-use")) {
                        setfirebaseErr("Email already in use,Try another one")
                    }
                    // ...
                })
            setclientName("");
            setPassword("");
            setEmail("");
            setcPassword("");
            setfirebaseErr("");
        }

    }
    return (
        <div className='w-full'>
            <div className='w-full bg-gray-100 pb-10'>
                <form className='w-[370px] mx-auto flex flex-col items-center'>
                    <img className='w-32' src={darkLogo} alt='amazonlogo'></img>
                    <div className='w-full border border-zinc-200 p-6'>
                        <h2 className='font-titleFont text-3xl font-medium mb-4'>Create Account</h2>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Your Name</p>
                                <input onChange={handleName} className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type='text' value={clientName}></input>
                                {
                                    errclientName && (
                                        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span> {errclientName}</p>
                                    )
                                }
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Email or mobile phone number</p>
                                <input onChange={handleEmail} className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type='email' value={Email}></input>
                                {
                                    errEmail && (
                                        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{errEmail}</p>
                                    )
                                }
                                {
                                    firebaseErr && (
                                        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'></span>{firebaseErr}</p>
                                    )
                                }
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Password</p>
                                <input onChange={handlePassword} className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type='password' value={Password}></input>
                                {
                                    errPassword && (
                                        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{errPassword}</p>
                                    )
                                }
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>ReEnter Password</p>
                                <input onChange={handleRePassword} className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type='password' value={cPassword}></input>

                                {
                                    errcPassword && (
                                        <>
                                            <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'><span className='italic font-titleFont font-extrabold text-base'>!</span>{errcPassword}  </p>
                                            <p className='text-xs text-gray-600'>Password must be atleast 6 characters</p>
                                        </>
                                    )
                                }
                            </div>
                            <button onClick={handleRegistration} className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>Continue</button>
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
                                sucessMsg &&(
                                    <div>
                                        <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className='text-base font-titleFont font-semibold  text-green-500 border-[1px border-green-500 px-2 text-center]'>{sucessMsg}</motion.p>
                                    </div>
                                )
                            }
                        </div>
                        <p className='text-xs text-black leading-4 mt-4'>By Continuing, you agree to Amazon's{" "} <span className='text-blue-600'>Conditions of Use </span>and <span className='text-blue-600'>Privace Notice.</span></p>
                        <div>
                            <p className='text-xs text-black'>Already have an account?<Link to="/signin">
                                <span className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Signin<span><ArrowRightIcon /></span></span>
                            </Link></p>
                            <p className='text-xs text-black -mt-1'>Buying for work<span className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Create a free business account</span></p>
                        </div>
                    </div>
                </form>
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

export default Registration