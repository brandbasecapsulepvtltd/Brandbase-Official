import React from 'react'

const Country = () => {
  return (
    <>
    <div className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Crafting Our Innovative<br />
          Exhibitions with Expert Exhibition Booth Designers Worldwide
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* India */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
              <img 
                src="https://ik.imagekit.io/vinayak06/india%20(1).png" 
                alt="India" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-700 font-medium text-lg">India</span>
          </div>
          
          {/* Germany */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
              <img 
                src="https://ik.imagekit.io/vinayak06/europe%20(1).png" 
                alt="Germany" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-700 font-medium text-lg">Germany</span>
          </div>
          
          {/* Singapore */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
              <img 
                src="https://ik.imagekit.io/vinayak06/singapore%20(1).png" 
                alt="Singapore" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-700 font-medium text-lg">Singapore</span>
          </div>
          
          {/* United Arab Emirates */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
              <img 
                src="https://ik.imagekit.io/vinayak06/UAE%20(1).png" 
                alt="United Arab Emirates" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-700 font-medium text-lg">United Arab Emirates</span>
          </div>
          
          {/* United Kingdom */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
              <img 
                src="https://ik.imagekit.io/vinayak06/UK%20(1).png" 
                alt="United Kingdom" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-700 font-medium text-lg">United Kingdom</span>
          </div>
          
          {/* United States */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
              <img 
                src="https://ik.imagekit.io/vinayak06/USA%20(1).png" 
                alt="United States" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-700 font-medium text-lg">United States</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Country
