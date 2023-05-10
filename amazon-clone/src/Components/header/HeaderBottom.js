import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Sidenavcontent from './Sidenavcontent';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {motion} from "framer-motion"
import { useSelector } from 'react-redux';
const HeaderBottom = () => {
    const [sidebar, setSidebar] = useState(false)
    // console.log(sidebar)
    const userInfo = useSelector((state) => state.amazon.userInfo)
    const ref = useRef();
    useEffect(() => {
      document.body.addEventListener(("click"),e=>{
        if (e.target. contains(ref.current)) {
            setSidebar(false)
        }
      })
    
     
    }, [ref,sidebar])
    
    return (
        <div className='w-full px-4 h-[46px] bg-amazon_light text-white flex items-center'>
            {/*==========List items Start here===========*/}
            <ul className='flex items-center gap-2 text-sm tracking-wide"'>
                <li onClick={() => setSidebar(true)} className=" headerHover  flex items-center gap-1"><MenuOutlinedIcon />All</li>
                <li className="headerHover hidden md:inline-flex">Amazon miniTV</li>
                <li className="headerHover hidden md:inline-flex">Sell</li>
                <li className="headerHover hidden md:inline-flex">Best Sellers</li>
                <li className="headerHover hidden md:inline-flex">Mobiles</li>
                <li className="headerHover hidden md:inline-flex">Today's Deals</li>
                <li className="headerHover hidden md:inline-flex">Customer Service</li>
                <li className="headerHover hidden md:inline-flex">New Releases</li>
                <li className="headerHover hidden md:inline-flex"> Electronics</li>
                <li className="headerHover hidden md:inline-flex">Prime<span ><ArrowDropDownOutlinedIcon /></span></li>
                <img className='h-[28px] hidden xl sm:inline-flex object-contain headerHover' src='https://m.media-amazon.com/images/G/31/Events/img23/MayART23/SWM_400x39_LiveNow._CB590561779_.jpg' alt='image'></img>
            </ul>
            {/*==========List items End here===========*/}
            {/*==========Sidebar Start here===========*/}
            {
                sidebar && (
                    <div className='w-full h-screen text-black fixed top-0  left-0 bg-amazon_blue bg-opacity-50 overflow-y-scroll overflow-x-hidden'>
                        <div className='w-full h-screen relative'>
                            <motion.div ref={ref} initial={{x:-500,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:.5}} className='w-[80%] md:w-[350px] h-70 bg-white border border-black'>{/* my modification h-full*/}
                                <div className='w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4'>
                                    {
                                        userInfo?(<img className='w-10 h-10 rounded-full' src={userInfo.image} alt='image'></img>):(<AccountCircleOutlinedIcon />)
                                    }
                                    
                                   {
                                    userInfo? <h3 className='font-titleFont font-bold text-lg tracking-wide'>{userInfo.userNmae}</h3> : <h3 className='font-titleFont font-bold text-lg tracking-wide'>Hello,Sign in</h3>
                                   }
                                </div>
                                <Sidenavcontent title="Trending" one="Best Sellers" two="New Releases" three="Movers and Shakers" />
                                <Sidenavcontent title="Digital Content and Devices" one="Amazon miniTV" two="Echo & Alexa" three="Fire TV" />
                                <Sidenavcontent title="Shop by Category" one="Mobiles, Computers" two="TV, Appliances, Electronics" three="Home, Kitchen, Pets" />
                                <Sidenavcontent title="Programs & Features" one="Gift Cards & Mobile Recharges" two="Flight Tickets" three="Clearance store" />
                                <Sidenavcontent title="Help & Settings" one="Your Account" two="Customer Service" three="Sign in" />
                            <span onClick={() => setSidebar(false)} className='cursor-pointer absolute top-0  left-[300px] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300'><CloseOutlinedIcon /></span>
                            </motion.div>
                        </div>
                    </div>
                )
            }
            {/*==========Sidebar End here===========*/}
        </div>
    )
}

export default HeaderBottom