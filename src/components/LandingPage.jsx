import React from "react";

function LandingPage(){
    return(
        <>

        <div className="flex h-screen">
          {/* Left Side (3/7) */}
          <div className="w-4/7 bg-white flex flex-col justify-between p-6">
              <nav className="flex justify-between items-center p-6 bg-white rounded-4xl p-6">
                  <div className="text-xl font-bold flex items-center gap-2">
                    <span className="text-orange-500">&#9650;</span> MapIt
                  </div>
                  <div className="hidden md:flex gap-10 text-gray-600">
                    <a href="#" className="hover:text-black">Features</a>
                    <a href="#" className="hover:text-black">Cities</a>
                    <a href="#" className="hover:text-black">GitHub</a>
                    <a href="#" className="hover:text-black">About Us</a>
                  </div>
                  <button className="bg-orange-400 px-6 py-2 text-white rounded-lg hover:bg-orange-500">
                    Sign Up
                  </button>
              </nav>
              <div className="flex flex-col justify-center items-start space-y-4 md:w-1/2 p-6">
                <h1 className="text-4xl font-bold text-gray-800">Find The Best Places To <span className="text-blue-600">Hangout</span></h1>
                <p className="text-gray-600 my-4">
                  With this map, you can easily find places of entertainment, shopping centers, and more.
                  Stay informed with photos, hours, and costs.
                </p>
                <div className="flex gap-4 mt-4">
                  <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">Download App</button>
                  <button className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-200">See Platforms</button>
                </div>
              </div>
              
              {/* Statistics Section */}
              <div className="flex gap-10 justify-center mt-10 p-6 bg-gray-100 w-1/2 max-w-4xl rounded-4xl">
                <div className="text-center">
                  <p className="text-xl font-bold">25,000</p>
                  <p className="text-gray-600">Places</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">2,000,000</p>
                  <p className="text-gray-600">Users</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">100,000</p>
                  <p className="text-gray-600">Photos</p>
                </div>
              </div>
          </div>

          {/* Right Side (4/7) */}
          <div className="w-3/7 bg-white flex justify-center p-6 items-center">
                  <img 
                    src="https://play-lh.googleusercontent.com/SGbM96RBOdg5AtHdBZkDMDVOcuTf-1ToQOOj58kMrMNAklEn-wDJC1LGkrlcD2L26v8=w5120-h2880-rw" 
                    alt="Map"
                    className="w-full h-full object-cover shadow-xl rounded-4xl" 
                  />
          </div>

        </div>
        </>
    )
}


export default LandingPage;