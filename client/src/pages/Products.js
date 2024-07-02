import React from 'react'
import {Link} from 'react-router-dom';
import cloth from '../assets/category-images/cloth.png'


function Products() {
  return (
    <div class="flex flex-col w-screen min-h-screen p-10 bg-gray-100 text-gray-800">

<div class="bg-blue-900 shadow-sm sticky top-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div class="flex items-center justify-between md:justify-start">
          {/* <!-- Menu Trigger --> */}
          <button type="button" class="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center">
            <svg class="text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* <!-- ./ Menu Trigger --> */}
    
          <a href="/category" class="font-bold text-gray-200 text-2xl">Shop.</a>
    
          <div class="hidden md:flex space-x-3 flex-1 lg:ml-8">
            <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-300 hover:text-gray-600">Electronics</a>
            <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-300 hover:text-gray-600">Fashion</a>
            <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-300 hover:text-gray-600">Tools</a>
            <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-300 hover:text-gray-600">Books</a>
            <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-300 hover:text-gray-600">More</a>
          </div>
    
          <div class="flex items-center space-x-4">
            <div class="relative hidden md:block">
              <input type="search" class="pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none" placeholder="Search"/>
              <svg class="h-6 w-6 text-gray-300 ml-2 mt-2 stroke-current absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
    
             
          </div>
        </div>
    
        {/* <!-- Search Mobile --> */}
        <div class="relative md:hidden">
          <input type="search" class="mt-1 w-full pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none" placeholder="Search"/>
    
          <svg class="h-6 w-6 text-gray-300 ml-2 mt-3 stroke-current absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {/* <!-- ./ Search Mobile --> */}
    
      </div>
    </div>
    
{/* <!-- Component Start --> */}
<h1 class="mb-2 font-bold text-orange-600 text-3xl mt-4 text-center md:text-3xl">Clothes Category</h1>
{/* filter */}
<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-2">
    <span class="text-sm font-semibold">1-16 of 148 Products</span>
    <button class="relative text-sm focus:outline-none group mt-4 sm:mt-0">
        <div class="flex items-center justify-between w-40 h-10 px-3 border-2 border-gray-300 rounded hover:bg-gray-300">
            <span class="font-medium">
                Popular
            </span>
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </div>
        <div class="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white shadow-lg rounded group-focus:flex">
            <a class="w-full px-4 py-2 text-left hover:bg-gray-200" href="#">Popular</a>
            <a class="w-full px-4 py-2 text-left hover:bg-gray-200" href="#">Featured</a>
            <a class="w-full px-4 py-2 text-left hover:bg-gray-200" href="#">Newest</a>
            <a class="w-full px-4 py-2 text-left hover:bg-gray-200" href="#">Lowest Price</a>
            <a class="w-full px-4 py-2 text-left hover:bg-gray-200" href="#">Highest Price</a>
        </div>
    </button>
</div>
<div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6">
    {/* <!-- Product Tile Start --> */}
    <div>
        <a href="#" className="block h-64 rounded-lg shadow-lg bg-white">
        <Link to='/item'>
        <img src={cloth} alt='' className='w-[170px] ml-16 mt-8 absolute '/></Link>
        </a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Shirt</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Nimal Perera</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">Kottawa</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" className="block h-64 rounded-lg shadow-lg bg-white">
        <Link to='/item'>
        <img src={cloth} alt='' className='w-[170px] ml-16 mt-8 absolute '/></Link>
        </a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Shirt</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Nimal Perera</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">Kottawa</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" className="block h-64 rounded-lg shadow-lg bg-white">
        <img src={cloth} alt='' className='w-[170px] ml-16 mt-8 absolute '/>
        </a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Shirt</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Nimal Perera</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">Kottawa</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
     <div>
        <a href="#" className="block h-64 rounded-lg shadow-lg bg-white">
        <img src={cloth} alt='' className='w-[170px] ml-16 mt-8 absolute '/>
        </a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Shirt</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Nimal Perera</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">Kottawa</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
     <div>
        <a href="#" className="block h-64 rounded-lg shadow-lg bg-white">
        <img src={cloth} alt='' className='w-[170px] ml-16 mt-8 absolute '/>
        </a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Shirt</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Nimal Perera</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">Kottawa</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
     <div>
        <a href="#" className="block h-64 rounded-lg shadow-lg bg-white">
        <img src={cloth} alt='' className='w-[170px] ml-16 mt-8 absolute '/>
        </a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Shirt</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Nimal Perera</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">Kottawa</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" class="block h-64 rounded-lg shadow-lg bg-white"></a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Product Name</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Store Name</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">$34</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" class="block h-64 rounded-lg shadow-lg bg-white"></a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Product Name</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Store Name</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">$34</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" class="block h-64 rounded-lg shadow-lg bg-white"></a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Product Name</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Store Name</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">$34</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" class="block h-64 rounded-lg shadow-lg bg-white"></a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Product Name</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Store Name</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">$34</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" class="block h-64 rounded-lg shadow-lg bg-white"></a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Product Name</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Store Name</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">$34</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" class="block h-64 rounded-lg shadow-lg bg-white"></a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Product Name</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Store Name</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">$34</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" class="block h-64 rounded-lg shadow-lg bg-white"></a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Product Name</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Store Name</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">$34</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" class="block h-64 rounded-lg shadow-lg bg-white"></a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Product Name</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Store Name</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">$34</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" class="block h-64 rounded-lg shadow-lg bg-white"></a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Product Name</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Store Name</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">$34</span>
        </div>
    </div>
    {/* <!-- Product Tile End -->
    <!-- Product Tile Start --> */}
    <div>
        <a href="#" class="block h-64 rounded-lg shadow-lg bg-white"></a>
        <div class="flex items-center justify-between mt-3">
            <div>
                <a href="#" class="font-medium">Product Name</a>
                <a class="flex items-center" href="#">
                    <span class="text-xs font-medium text-gray-600">by</span>
                    <span class="text-xs font-medium ml-1 text-indigo-500">Store Name</span>
                </a>
            </div>
            <span class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">$34</span>
        </div>
    </div>
    {/* <!-- Product Tile End --> */}
</div>
<div class="flex justify-center mt-10 space-x-1">
    <button class="flex items-center justify-center h-8 w-8 rounded text-gray-400">
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
    </button>
    <button class="flex items-center justify-center h-8 px-2 rounded text-sm font-medium text-gray-400" disabled>
        Prev
    </button>
    <button class="flex items-center justify-center h-8 w-8 rounded bg-indigo-200 text-sm font-medium text-indigo-600" disabled>
        1
    </button>
    <button class="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
        2
    </button>
    <button class="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
        3
    </button>
    <button class="flex items-center justify-center h-8 px-2 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
        Next
    </button>
    <button class="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-gray-600 hover:text-indigo-600">
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
    </button>
</div>
{/* <!-- Component End  --> */}

 
         </div>
  )
}

export default Products