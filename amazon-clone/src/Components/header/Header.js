//  px-6 py-2 cursor-pointer
import { Link } from 'react-router-dom';
import{getAuth,signOut} from "firebase/auth"
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { logo } from '../../Assets/index'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { allitems } from '../../Constants';
import HeaderBottom from './HeaderBottom';
import { useDispatch, useSelector } from 'react-redux';
import { userSignout } from '../../redux/amazonSlice';
const Header = () => {
    const auth=getAuth();
    const dispatch=useDispatch();
    const [showAll, setshowAll] = useState(false)
    const ref = useRef();
    useEffect(() => {
        document.body.addEventListener(("click"), e => {
            if (e.target.contains(ref.current)) {
                setshowAll(false)
            }
        })
    }, [ref, showAll])
    const products = useSelector((state) => state.amazon.products)
    const userInfo = useSelector((state) => state.amazon.userInfo)
    console.log(userInfo)
    // console.log(products)
    const handlelogout=()=>{
        signOut(auth)
        .then(()=>{
            // signout sucessful
            console.log("signout sucessfully")
            dispatch(userSignout())
        })
        .catch((error)=>{
            // an error happened
            console.log(error)
        })
    }
    return (
        <div className=' w-full sticky top-0 z-50'>
            <div className='w-full bg-amazon_blue text-white  px-4 py-3 flex text-center gap-4'>
                {/*=========Image start here==============*/}
                <Link to="/">
                    <div className='headerHover'>
                        <img className='w-24 mt-2' src={logo} alt='logo'></img>
                    </div>
                </Link>
                {/*=========Image end here==============*/}
                {/*=========Deliver start here==============*/}
                <div className='headerHover hidden mdl:inline-flex '>
                    <LocationOnOutlinedIcon />
                    <p className='text-sm text-lightText font-light flex flex-col'>
                        Hello<span className='text-sm font-semibold -mt-1 text-whiteText'>Select your address</span></p>
                </div>
                {/*=========Deliver end here==============*/}
                {/*=========Search start here==============*/}
                <div className='h-10 rounded-md hidden lgl:flex flex-grow relative' >
                    <span ref={ref} onClick={() => setshowAll(!showAll)} className='dealsintoinputcss' style={{ paddingLeft: '9px' }}>Deals<span></span>
                        <ArrowDropDownOutlinedIcon style={{ paddingRight: '5px' }} />
                    </span>
                    {
                        showAll && (
                            <div>
                                <ul className='absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white  border-[1px] border-amazon_blue text-black p-2 flex flex-col gap-1 z-50'>
                                    {
                                        allitems.map((item) => {
                                            return <li className='text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:bg-zinc-200 hover: cursor-pointer duration-200 text-left' key={item.id}>{item.title}</li>
                                        })
                                    }

                                </ul>
                            </div>
                        )
                    }
                    <input className='h-full text-base  text-amazon_blue flex-grow outline-none border-none px-2' type='text' />
                    <span className='searchiconlikeamazon'><SearchOutlinedIcon />
                    </span>
                </div>

                {/*=========Search end here==============*/}
                {/*=========SignIn start here==============*/}
                <Link to="/signin">
                    <div className='flex flex-col items-start justify-center headerHover'>
                        {
                            userInfo ? <p className='text-sm mdl:text-xs text-white mdl:text-lightText font-medium'>{userInfo.userNmae}</p> : <p className='text-sm mdl:text-xs text-white mdl:text-lightText font-light'>Hello,sign in</p>
                        }
                        <p className='hidden md:inline-flex text-sm font-semibold -mt-1 text-whiteText mdl:inline-flex'>Accounts & Lists <span><ArrowDropDownOutlinedIcon /></span></p>
                    </div>
                </Link>
                {/*=========SignIn end here==============*/}
                {/*=========Orders start here==============*/}

                <div className='hidden lgl:flex flex-col items-start justify-center headerHover'>
                    <p className='text-xs text-lightText font-light'>Returns</p>
                    <p className='text-sm font-semibold -mt-1 text-whiteText'>& Orders</p>
                </div>

                {/*=========Orders end here==============*/}
                {/*=========Cart start here==============*/}
                <Link to="/cart">
                    <div className='flex items-start justify-center headerHover relative'>
                        <ShoppingCartOutlinedIcon />
                        <p className='hidden mdl:inline-flex text-xs font-semibold mt-3 text-whiteText'>Cart
                            <span className='absolute text-xs top-0 left-6 w-4 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center'>
                                {products.length > 0 ? products.length : 0}
                            </span>
                        </p>
                    </div>
                </Link>
                {/*=========Cart end here==============*/}
               {
                userInfo &&(
                    <div onClick={handlelogout} className='flex items-start justify-center headerHover relative flex-col'>
                        <LogoutIcon/>
                        <p className='hidden mdl:inline-flex text-xs font-semibold  text-whiteText'>Log Out</p>
                    </div>
                )
               }
            </div>
            <HeaderBottom />
        </div>
    )
}

export default Header