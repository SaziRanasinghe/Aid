import React from 'react';
import Img1 from '../assets/main-images/contactus.webp'

function Aboutus() {
  return (
    <div>
      <h1 className="text-grey-darker text-5xl text-center mt-10 mb-8">Empowering Change Through <span className='text-orange-500'>AidNexus!</span></h1>
       
      <div className="flex flex-wrap"> 
        <div className="flex-1 text-gray-700 text-center bg-gray-400 px-3 py-2 mb-10 mx-20 rounded">
          <div className="lg:flex lg:items-center">
            <div className="lg:flex-shrink-0">
              <img className="rounded-lg lg:w-64" src={Img1} alt="" />
            </div>
            <div className="mt-2 lg:mt-0 lg:ml-6">
              <div className="uppercase tracking-wide text-xl text-blue-600 font-bold">
               Our Vision
              </div>
              <div className="block mt-1 text-lg leading-tight  text-gray-900">
              
                <p>"To build a world where every individual, regardless of circumstance, has the opportunity to thrive and contribute positively to society."</p>
                <div className="uppercase tracking-wide text-xl mt-2 text-blue-600 font-bold">
              Our Mission
              </div>
                <p>"Our mission is to empower individuals and communities by providing access to essential resources, education, and support systems. Through sustainable initiatives and collaborative partnerships, we strive to create lasting change and foster a more equitable and compassionate world for all."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-lg text-white px-3 py-2 mb-10 mx-20">
              
          <p>Aid Nexus is a non-profit organization committed to tackling the pervasive issue of underutilized excess items and secondhand goods. Our project addresses the dual challenges of waste reduction and the provision of essential support to vulnerable individuals and communities experiencing financial difficulties. Many donors face obstacles in finding convenient channels to donate their items, while those in need encounter barriers in accessing these necessary resources. By establishing a comprehensive platform that seamlessly connects donors, recipients, and volunteers, we aim to bridge this gap effectively.</p><br/>

          <p>Our initiative not only reduces waste but also transforms surplus items into valuable resources for those facing economic hardship. Our stakeholders, including donors, recipients, volunteers, and our organization, recognize the urgent need to address this problem. We believe that with the right system in place, the generosity of our community can flourish. Although we face constraints such as limited resources for outreach and technical development, the dedication and collaboration of our stakeholders empower us to overcome these challenges. Together, we strive to create a lasting positive impact, fostering a more sustainable, equitable, and compassionate society.</p>

                </div>
    </div>
  );
}

export default Aboutus;
