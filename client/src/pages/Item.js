import React from 'react'
import cloth from '../assets/category-images/cloth.png'

function Item() {
  return (
    <div class="antialiased">
  

     
    <div class="bg-white shadow-sm sticky top-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div class="flex items-center justify-between md:justify-start">
          {/* <!-- Menu Trigger --> */}
          <button type="button" class="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center">
            <svg class="text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* <!-- ./ Menu Trigger --> */}
    
          <a href="/category" class="font-bold text-gray-700 text-2xl">Shop.</a>
    
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
    
    <div class="py-6">
      {/* <!-- Breadcrumbs --> */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-2 text-gray-400 text-sm">
          <a href="/category" class="hover:underline hover:text-gray-600">Category</a>
          <span>
            <svg class="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <a href="/products" class="hover:underline hover:text-gray-600">Products</a>
          <span>
            <svg class="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span>Items</span>
        </div>
      </div>
      {/* <!-- ./ Breadcrumbs --> */}
    
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div class="flex flex-col md:flex-row -mx-4">
          <div class="md:flex-1 px-4">
            <div x-data="{ image: 1 }" x-cloak>
              <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                <div x-show="image === 1" class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                <img src={cloth} alt='' className='w-[190px] ml-16 mt-8 absolute '/>
                </div>
    
                {/* <div x-show="image === 2" class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                  <span class="text-5xl">2</span>
                </div>
    
                <div x-show="image === 3" class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                  <span class="text-5xl">3</span>
                </div>
    
                <div x-show="image === 4" class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                  <span class="text-5xl">4</span>
                </div> */}
              </div>
    
              
            </div>
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="mb-2 leading-tight tracking-tight font-bold text-orange-600 text-2xl md:text-3xl">T-shirt with Ice Cap </h2>
            <p class="text-gray-500 text-sm">By <a href="#" class="text-indigo-600 hover:underline">Nimal perera</a></p>
    
            <div class="flex items-center space-x-4 my-4">
               
              <div class="flex-1">
                <p class="text-orange-400 text-xl font-semibold">Free of Charge</p>
                <p class="text-gray-400 text-sm">Free Delivery</p>
              </div>
            </div>
    
            <p class="text-gray-300"> one time used. good condition and good look. red and white colors. white ice cap. location is kottawa. size is medium. imported from america and brand is crokodile.</p>
            <div class="flex py-4 space-x-4">
              
              <button type="button" class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                Request Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
  )
}

export default Item