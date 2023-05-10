import React from 'react'
import Banner from '../Components/Home/Banner'
import Product from '../Components/Home/Product'

const Home = () => {
  return (
    <div className='home'>
        <Banner/>
        <div className='w-full -mt-10 xl:-mt-36 py-10'>
        <Product/>
        </div>
    </div>
  )
}

export default Home