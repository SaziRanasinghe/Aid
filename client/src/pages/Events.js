import React from 'react'
import img1 from '../assets/gallery-images/donation 1.jpg'
import img2 from '../assets/gallery-images/donation 3.webp'

function Events() {
  return (
    <div className="mx-4 my-8">
      <div className="flex flex-col space-y-8">
        <div className="card flex flex-col sm:flex-row md:flex-row bg-gray-800">
          <div className="sm:flex-shrink-0 md:flex-shrink-0">
            <img className="imagine w-full sm:w-56 md:w-56 lg:w-80" src={img1} alt="Event" />
          </div>
          <div className="righty ml-3 md:mt-0 md:ml-6 sm:ml-3">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-orange-400 mt-2 mb-4 uppercase tracking-wide text-xl font-bold cardheading cardtitle">SISU UPAKARA</div>
                <div className="text-gray-100 mb-4 uppercase tracking-wide text-lg font-bold cardheading">
                  <small className="text-gray-200 mb-1 uppercase tracking-wide cardheading">Time- 7:00am - 10:00am</small><br />
                  <small className="text-gray-200 mb-1 uppercase tracking-wide cardheading">Date- OCT 18</small>
                </div>
              </div>
            </div>
            <div className="block mt-1 mr-6 text-lg md:w-3/4 lg:w-3/4 leading-tight font-semibold text-gray-200 hover:underline">Helping for financial difficulties</div>
            <p className="mb-2 mt-2 mr-6 text-gray-300 md:w-3/4 lg:w-3/4">Although we face constraints such as limited resources for outreach and technical development, the dedication and collaboration of our stakeholders empower us to overcome these challenges. Together, we strive to create a lasting positive impact, fostering a more sustainable, equitable, and compassionate society.</p>
            <div className="flex justify-end h-16 mb-2">
              <a className="tickets bg-transparent uppercase hover:bg-orange-500 text-gray-100 font-semibold hover:text-black py-2 px-4 border-2 border-orange-500 hover:border-transparent mb-2 mr-4">
                Donate
              </a>
            </div>
          </div>
        </div>
        
        <div className="card flex flex-col sm:flex-row md:flex-row bg-gray-800">
          <div className="sm:flex-shrink-0 md:flex-shrink-0">
            <img className="imagine w-full sm:w-56 md:w-56 lg:w-80" src={img2} alt="Event" />
          </div>
          <div className="righty ml-3 md:mt-0 md:ml-6 sm:ml-3">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-orange-400 mt-2 mb-4 uppercase tracking-wide text-xl font-bold cardheading cardtitle">GAMATA DIRIYA</div>
                <div className="text-gray-100 mb-4 uppercase tracking-wide text-lg font-bold cardheading">
                  <small className="text-gray-200 mb-1 uppercase tracking-wide cardheading">Time- 10:00am - 2:00am</small><br />
                  <small className="text-gray-200 mb-1 uppercase tracking-wide cardheading">Date- NOV 20</small>
                </div>
              </div>
            </div>
            <div className="block mt-1 mr-6 text-lg md:w-3/4 lg:w-3/4 leading-tight font-semibold text-gray-200 hover:underline">Helping for financial difficulties</div>
            <p className="mb-2 mt-2 mr-6 text-gray-300 md:w-3/4 lg:w-3/4">Although we face constraints such as limited resources for outreach and technical development, the dedication and collaboration of our stakeholders empower us to overcome these challenges. Together, we strive to create a lasting positive impact, fostering a more sustainable, equitable, and compassionate society.</p>
            <div className="flex justify-end h-16 mb-2">
              <a className="tickets bg-transparent uppercase hover:bg-orange-500 text-gray-100 font-semibold hover:text-black py-2 px-4 border-2 border-orange-500 hover:border-transparent mb-2 mr-4">
                Donate
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events
