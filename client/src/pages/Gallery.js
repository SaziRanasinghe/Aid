import React from 'react'
import img1 from '../assets/gallery-images/donation 1.jpg'
import img3 from '../assets/gallery-images/donation -2.jpg'
import img2 from '../assets/gallery-images/donation 3.webp'
import img4 from '../assets/gallery-images/donation 4.webp'
import img5 from '../assets/gallery-images/donation 5.jpg'

function Gallery() {
  return (
    
<div class="max-w-screen-2xl mx-auto px-4 pb-16 lg:pb-24 mt-8 relative ">
<h1 className='text-5xl text-center font-bold'> Donations of <span className='text-orange-600'>AidNexus</span></h1>
    <div class="mt-4 flex flex-col md:flex-row gap-2">
        <div class="flex flex-1 flex-col gap-2">
            <div class="flex flex-1 flex-col">
                
                <img class="object-cover h-full" src= {img1}/>
            </div>
            <div class="hidden md:flex flex-1 flex-row gap-2">
                <div class="flex flex-1 flex-col">
                
                  <img class="object-cover h-full" src={img2}/>
                </div>
                <div class="hidden md:flex flex-1 flex-col">
                  
                  <img class="object-cover h-full" src={img3}/>
                </div>
            </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
            <div class="hidden md:flex flex-1 flex-row gap-2">
                <div class="flex flex-1 flex-col">
                  
                  <img class="object-cover h-full" src= {img4}/>  
                </div>
                <div class="hidden md:flex flex-1 flex-col">
                  
                  <img class="object-cover h-full" src= {img5}/>
                </div>
            </div>                        
            <div class="flex flex-1 flex-col">
             
              <img class="object-cover h-full" src= {img2}/>
            </div>
        </div>
    </div>
</div>

 
             
  )
}

export default Gallery