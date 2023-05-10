
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import ApiIcon from '@mui/icons-material/Api';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../redux/amazonSlice';
const Products = () => {
const dispatch=useDispatch()
  const data = useLoaderData();
  const productData = data.data;
  console.log(productData)
  return (
    <div className='max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 px-4'>
      {
        productData.map((item) => (
          <div key={item.id} className='bg-white h-auto border-[1px] border-gray-200 py-8 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4'>
            <span className='text-xs absolute capitalize top-2 right-2 text-gray-500 italic'>{item.category}</span>
            <div className='w-full h-auto flex items-center justify-center relative group'>
              <img className='w-52 h-64 object-contain' src={item.image} alt='ProductImg'></img>

              <ul className='absolute w-full h-36 bg-gray-100  flex flex-col justify-center items-end gap-2 font-titleFont px-2 border-1 border-r bottom-[-170px] group-hover:bottom-0 duration-700'>
                <li className='productli'>Compare{" "}<span><ApiIcon/></span></li>
                <li className='productli'>Add to Cart{" "}<span><ShoppingCartIcon/></span></li>
                <li className='productli'>View Details{" "}<span><ArrowCircleRightIcon/></span></li>
                <li className='productli'>Add to Wish List{" "}<span><FavoriteIcon/></span></li>
              </ul>
            </div>
            <div className='px-3 z-10 bg-white'>
              <div className='flex items-center justify-between'>
                {/* <h3 className='font-titleFont tracking-wide text-lg text-amazon_blue font-medium'>{item.title.substring(0, 22)}</h3> */}
                <h3 className='truncate block max-h-11 overflow-hidden leading-5'>{item.title.substring(0, 22)}</h3>
                <p className='text-sm text-gray-600 font-semibold'>${item.price}</p>
              </div>
              <div >
                <p className='text-sm mb-1'>{item.description.substring(0, 90)}...</p>
                <div className='text-yellow-500'>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
              <button onClick={()=>dispatch(addtoCart({
                id:item.id,
                title:item.title,
                description:item.description,
                price:item.price,
                category:item.category,
                image:item.image,
                quantity:1
              }))} className='w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200'>Add to Cart</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Products


