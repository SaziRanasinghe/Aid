import React from 'react'
 
import cloth from '../assets/category-images/cloth.png';
import food from '../assets/category-images/food.webp';
import furniture from '../assets/category-images/furniture.png';
import electronic from '../assets/category-images/electronic.png';
import medicines from '../assets/category-images/medicines.png';
import other from '../assets/category-images/other.png';
import { Radio } from "@material-tailwind/react";
import {Link} from 'react-router-dom';


function Category() {
  return (
    <div className='py-8 mx-8'>
        <div class="bg-white shadow-sm sticky top-0"> 
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div class="flex items-center justify-between md:justify-start">
          {/* <!-- Menu Trigger --> */}
          <button type="button" class="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center">
            <svg class="text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
         <a href="#" class="font-bold text-gray-700 text-2xl">Shop.</a>
    
    <div class="hidden md:flex space-x-3 flex-1 lg:ml-8">
      <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">Electronics</a>
      <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">Fashion</a>
      <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">Tools</a>
      <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">Books</a>
      <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">More</a>
    </div>

    <div class="flex items-center space-x-4">
            <div class="relative hidden md:block">
              <input type="search" class="pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none" placeholder="Search"/>
              <svg class="h-6 w-6 text-gray-300 ml-2 mt-2 stroke-current absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            
            
            </div>
            <div class="relative md:hidden">
          <input type="search" class="mt-1 w-full pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none" placeholder="Search"/>
    
          <svg class="h-6 w-6 text-gray-300 ml-2 mt-3 stroke-current absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        </div>
        </div>
        </div>
            
        <div className='text-center mb-4'>
            
                <h1 className='text-5xl font-bold'>All Categories</h1>
            </div>
    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8'>
         
        {/* <!-- Filter Section --> */}
        <div className='sm:col-span-1'>
            <div className='bg-gray-100 p-4 rounded-lg'>
                <h2 className='text-xl text-black font-semibold mb-4'>Filter</h2>
                <div className='mb-4'>

                <div class="block relative">
                    <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
                    <input placeholder="Search"
                        class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>

                    <label htmlFor='category' className='block text-sm font-medium text-gray-700'>Category:</label>
                    <select id='category' name='category' className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'>
                        <option value=''>All</option>
                        <option value='electronics'>Electronics</option>
                        <option value='clothing'>Clothing</option>
                        <option value='books'>Books</option>
                    </select>
                </div>
                <div className="relative border border-gray-300 text-gray-800 bg-white shadow-lg">
    <label for="frm-whatever" class="sr-only">My field</label>
    <select className="appearance-none w-full py-1 px-2 bg-white" name="whatever" id="frm-whatever">
        <option value="">Date Added (Newest)&hellip;</option>
      <option value="1">Date Added (Oldest) </option>
      <option value="2">Condition (Used)</option>
      <option value="3">Condition (New)</option>
       
    </select>
    <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
    </div>
</div>
<div className='mt-2 text-black'>
    <h1>Status: </h1>
</div>
<div className="flex gap-10 ">
    
      <Radio name="type" label="Veri" />
      <Radio name="type" label="Not Veri" defaultChecked />
    </div>

    <div className='mt-2 text-black'>
    <h1>Condition: </h1>
</div>
<div className="flex gap-10 ">
    
      <Radio name="type" label="used" />
      <Radio name="type" label="new" defaultChecked />
    </div>

    <div className='mt-2 text-black'>
    <h1>Delivery: </h1>
</div>
<div className="flex gap-10 ">
    
      <Radio name="type" label="free" />
      <Radio name="type" label="pay" defaultChecked />
    </div>
            </div>
        </div>
        
        {/* <!-- Product Cards Section --> */}
        <div className='sm:col-span-2 lg:col-span-3'>
            
        <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                <div className='py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'>
                    <div>
                        <div className='mb-1'>                             
                            <p className='text-2xl font-semibold mb-[2px]'>Claim</p>
                            <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Clothes
                            </p>
                            <Link to='/products'>
                            <button className='bg-orange-600 hover:bg-orange-400 duration-300 px-5 py-2 mt-1 -mb-3 font-[popins] rounded-md text-white'>
                                Browse
                            </button></Link>
                        </div>
                    </div>
                    <img src={cloth} alt='' className='w-[170px] absolute right-8 lg:top-[15px] '/>
                </div>

                <div className='py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'>
                    <div>
                        <div className='mb-1'>                             
                            <p className='text-2xl font-semibold mb-[2px]'>Claim</p>
                            <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Foods
                            </p>
                            <button className='bg-orange-600 hover:bg-orange-400 duration-300 px-5 py-2 mt-1 -mb-3 font-[popins] rounded-md text-white'>
                                Browse
                            </button>
                        </div>
                    </div>
                    <img src={food} alt='' className='w-[170px] absolute right-8 lg:top-[15px] '/>
                </div>

                <div className='py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'>
                     <div>
                        <div className='mb-1'>                             
                            <p className='text-2xl font-semibold mb-[2px]'>Claim</p>
                            <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Electronics
                            </p>
                            <button className='bg-orange-600 hover:bg-orange-400 duration-300 px-5 py-2 mt-1 -mb-3 font-[popins] rounded-md text-white'>
                                Browse
                            </button>
                        </div>
                    </div>
                    <img src={electronic} alt='' className='w-[200px] absolute right-8 lg:top-[15px] '/>
                </div>

                <div className='py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'>
                    <div>
                        <div className='mb-1'>                             
                            <p className='text-2xl font-semibold mb-[2px]'>Claim</p>
                            <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Furniture
                            </p>
                            <button className='bg-orange-600 hover:bg-orange-400 duration-300 px-5 py-2 mt-1 -mb-3 font-[popins] rounded-md text-white'>
                                Browse
                            </button>
                        </div>
                    </div>
                    <img src={furniture} alt='' className='w-[170px] absolute right-8 lg:top-[15px] '/>
                </div>

                <div className='py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'>
                     <div>
                        <div className='mb-1'>                             
                            <p className='text-2xl font-semibold mb-[2px]'>Claim</p>
                            <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Medicince
                            </p>
                            <button className='bg-orange-600 hover:bg-orange-400 duration-300 px-5 py-2 mt-1 -mb-3 font-[popins] rounded-md text-white'>
                                Browse
                            </button>
                        </div>
                    </div>
                    <img src={medicines} alt='' className='w-[250px] absolute right-2 lg:top-[15px] '/>
                </div>

                <div className='py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'>
                     <div>
                        <div className='mb-1'>                             
                            <p className='text-2xl font-semibold mb-[2px]'>Claim</p>
                            <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Others
                            </p>
                            <button className='bg-orange-600 hover:bg-orange-400 duration-300 px-5 py-2 mt-1 -mb-3 font-[popins] rounded-md text-white'>
                                Browse
                            </button>
                        </div>
                    </div>
                    <img src={other} alt='' className='w-[250px] absolute right-2 lg:top-[8px] '/>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    
  )
}

export default Category