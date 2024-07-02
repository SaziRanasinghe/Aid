 
import React from 'react';
import { ReactTyped } from 'react-typed';
 
import Image2 from '../assets/main-images/img.jpg';
import { Link } from 'react-router-dom';
import Img1 from '../assets/main-images/img.jpg';
import Img2 from '../assets/main-images/img2.jpg';
import Img3 from '../assets/main-images/img3.jpg';
import Img4 from '../assets/main-images/poorty.avif';
import Img5 from '../assets/main-images/com.jpg'
import Img6 from '../assets/main-images/needs.jpg'
import Img7 from '../assets/main-images/doctor.jpg'
 



export default function MainPage() {
   
     

    
  return (
    <div className="  text-white  ">
    <img className="absolute inset-0 w-full h-full object-cover z-[-1]" src={Image2} alt='' />
<div className="max-w-[800px] w-full h-full text-left flex flex-col justify-center pt-32 px-4 sm:px-8 md:px-16">
  <div className="flex flex-col md:flex-row justify-center items-center">
    <p className="md:text-4xl sm:text-3xl text-xl md:ml-8 font-bold text-center md:text-left">Give it a Second Life by,</p>
    <ReactTyped
      className="md:text-4xl sm:text-3xl text-xl font-bold text-orange-500 text-center md:text-left"
      strings={['CONNECT', 'CONTRIBUTE', 'CHANGE']}
      typeSpeed={120}
      backSpeed={140}
      loop
    />
  </div>
  <h1 className="mt-4 lg:mx-0 md:mx-8 text-4xl md:text-5xl lg:text-7xl font-bold text-white text-center md:text-left">Share More, Waste Less from Anywhere</h1>
  <p className="mt-2 md:ml-8 text-center md:text-left">"Empowering Humanity, One Nexus at a Time."</p>
  <div className="mt-5 flex justify-center md:justify-start md:ml-8">
  <Link to='/aboutus'>
  <button className="relative inline-flex items-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-orange-600 to-orange-900 group-hover:from-orange-600 group-hover:to-orange-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none ">
    <span className="relative px-9 py-3 transition-all ease-in duration-75 bg-orange-500 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Explore Us!
    </span>
  </button>
</Link>

      </div>
</div>



<div className='text-center mt-60 mb-10 max-w-[400px] mx-auto'>
        <p className='text-xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600'>Donate, Get or Distribute</p>
        <h1  className='text-5xl font-bold'> Let's Involve!</h1>
        <p className='text-sm text-gray-400 mt-3'>Together, let's harness the spirit of generosity to create a brighter, more equitable future for all.</p>
      </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0.5 place-items-center mb-40'>


       

<div className="bg-white rounded-lg w-full md:w-1/2 shadow-lg text-center">
             <img src={Img1} alt="Background" className='max-w-[100px] block mx-auto transform translate-y-4 group-hover:scale-105 duration-300 shaow-md rounded-t-lg'/>
             <div class="p-6">
    <h2 class="font-bold mb-2 text-2xl text-orange-600">Donar</h2>
    <p class="mb-2 text-gray-700"> Individuals or organizations providing goods or funds to support those in need through the portal.</p>
    <Link to='/donate'>
    <button className='bg-gradient-to-r from-orange-600 to-orange-400 border-2 border-orange-600 rounded-full px-4 py-2 text-white hover:scale-105 duration-200'>
      Donate
      </button></Link>
  </div>
</div>

<div className="bg-white rounded-lg w-full md:w-1/2 shadow-lg text-center">
             <img src={Img2} alt="Background" className='max-w-[100px] block mx-auto transform translate-y-4 group-hover:scale-105 duration-300 shaow-md rounded-t-lg'/>
             <div class="p-6">
    <h2 class="font-bold mb-2 text-2xl text-orange-600">Reciepient</h2>
    <p class="mb-2 text-gray-700  ">Reciepient is individuals or groups seeking assistance or resources through the portal for various needs.</p>
    <Link to='/category'>
    <button className='bg-gradient-to-r from-orange-600 to-orange-400 border-2 border-orange-600 rounded-full px-4 py-2 text-white hover:scale-105 duration-200'>Get</button></Link>
  </div>
</div>

<div className="bg-white rounded-lg w-full md:w-1/2 shadow-lg text-center">
             <img src={Img3} alt="Background" className='max-w-[100px] block mx-auto transform translate-y-4 group-hover:scale-105 duration-300 shaow-md rounded-t-lg'/>
             <div class="p-6">
    <h2 class="font-bold mb-2 text-2xl text-orange-600">Volunteer</h2>
    <p class="mb-2 text-gray-700">Individuals offering their time and skills to facilitate the donation and distribution process within the portal.</p>
    <Link to='/distribute'>
    <button className='bg-gradient-to-r from-orange-600 to-orange-400 border-2 border-orange-600 rounded-full px-4 py-2 text-white hover:scale-105 duration-200'>Destribute</button>
</Link>
</div>
</div>

<div className="bg-white rounded-lg w-full md:w-1/2 shadow-lg text-center">
             <img src={Img3} alt="Background" className='max-w-[100px] block mx-auto transform translate-y-4 group-hover:scale-105 duration-300 shaow-md rounded-t-lg'/>
             <div class="p-6">
    <h2 class="font-bold mb-2 text-2xl text-orange-600">Administrator</h2>
    <p class="mb-2 text-gray-700">Admins manage users, donations and requests, assign distributions, generate reports, configure system settings.</p>
    <Link to='/admin'>
    <button className='bg-gradient-to-r from-orange-600 to-orange-400 border-2 border-orange-600 rounded-full px-4 py-2 text-white hover:scale-105 duration-200'>Explore</button>
</Link>
</div>
</div></div>
             

<div style={{ cursor: 'auto', backgroundColor: 'rgba(0, 0, 0, 0)' }}>
  <div class="container px-5 py-2 -mt-16 mx-auto" style={{ cursor: 'auto' }}>
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="Background" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={Img4}  style={{ cursor: 'auto' }} />
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0" style={{ cursor: 'auto' }}>
        <h2 class="text-sm title-font text-gray-500 tracking-widest" style={{ cursor: 'auto' }}>Your Impact Matters</h2>
        <h1 class="text-orange-500 text-4xl title-font font-bold mb-1" style={{ cursor: 'auto' }}>Combatting Hunger!</h1>
        <div class="flex mb-4">
          <span class="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg> 
        </span>
        
      </div>
      <p class="leading-relaxed">"Did you know that every day, millions of children around the world go to bed hungry? In fact, hunger remains a staggering reality for 1 in 9 people globally. Your support can make a tangible difference: just $10 can provide a month's worth of nutritious meals for a child in need. Together, we can tackle this crisis head-on and ensure that no child has to go to bed hungry. Join us in the fight against hunger today."</p>
      <div class="flex mt-4 items-center pb-5 border-b-2 border-gray-100 mb-5">
        
        
      </div>
      <div class="flex">
        <Link to='./login'><button class="title-font font-medium text-orange-800 bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Donate Funds</button></Link>
        <Link to = './aboutus'><button class="flex ml-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Learn More</button></Link>
        <button class="flex ml-auto rounded-full w-10 h-10 bg-gray-200 p-0 border-0   items-center justify-center text-gray-500  ">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
</div>
              
              
             
<div class="mx-auto container flex justify-center items-center mt-6 ml-8 py-12 px-4 sm:px-6 2xl:px-0">
 
            <div class="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0">
                <div class="w-80 sm:w-auto flex flex-col justify-start items-start">
                    <div>
                        <p class="text-3xl xl:text-5xl font-bold leading-9 text-orange-500 dark:text-white">Our Donation Services</p>
                    </div>
                    <div class="mt-4 lg:w-4/5 xl:w-3/5">
                        <p class="text-base leading-6 text-gray-300 dark:text-white">With just a few clicks, you can support vital causes around the world and help create a brighter future for those in need</p>
                    </div>
                    <div class="mt-16 w-full">
                        <button class="px-4 bg-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-400  flex justify-between items-center w-full lg:w-72 h-14 text-white hover:bg-gray-700 focus:ring-2 outline-none   focus:ring-offset-2 focus:ring-gray-800  ">
                            <Link to ='./gallery'><p class="text-xl font-medium leading-5 ">See More</p></Link>
                            <svg class="dark:text-gray-900" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.66663 16H25.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20 21.3333L25.3333 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20 10.6667L25.3333 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
      
                <div class="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 -ml-8 sm:space-y-0">
                    <div class="">
                        <img class="hidden lg:block" src={Img7} alt="sofa" />
                        <img class="w-80 sm:w-auto lg:hidden" src={Img7} alt="sofa" />
                    </div>
                    <div class="flex flex-col justify-center items-center space-y-4 sm:space-y-5 lg:space-y-5 xl:space-y-8">
                        <div>
                            <img class="hidden lg:block" src=  {Img5} alt="chairs" />
                            <img class="w-80 sm:w-auto lg:hidden" src= {Img5} alt="chairs" />
                        </div>
                        <div>
                            <img class="hidden lg:block" src= {Img6} alt="chairs" />
                            <img class="w-80 sm:w-auto lg:hidden" src=  {Img6}alt="chairs" />
                        </div>
                    </div>
                </div>
            </div>
        </div>


             <div></div>
      
    </div>
  );
}
