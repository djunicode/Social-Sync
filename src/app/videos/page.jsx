import React from 'react'

export default function page() {
    return (
        <body className="font-sans antialiased text-zinc-900 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4">
              
              <div className="bg-zinc-900 text-white w-full lg:w-1/4 p-4 rounded-lg">
                <h1 className="text-3xl font-bold mb-4">SocialSync</h1>
                <div className="flex items-center mb-6">
                  <div className="rounded-full h-10 w-10 bg-zinc-700 mr-3"></div>
                  <div>
                    <div className="font-semibold">Full Name</div>
                    <div className="text-zinc-400 text-sm">@username</div>
                  </div>
                </div>
                <div className="mb-6">
                  <a href="#" className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h6l6 9v-6h6l-6-9v6H9l-6 6z" />
                    </svg>
                    Home
                  </a>
                  <a href="#" className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12 7-12 6z" />
                    </svg>
                    Explore
                  </a>
                  <a href="#" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M12 4v16m8-8H4" />
                    </svg>
                    Subscriptions
                  </a>
                </div>
                <div className="mb-6">
                  <a href="#" className="flex items-center mb-3">
                    <div className="rounded-full h-8 w-8 bg-zinc-700 mr-3"></div>
                    @user123
                  </a>
                  <a href="#" className="flex items-center mb-3">
                    <div className="rounded-full h-8 w-8 bg-zinc-700 mr-3"></div>
                    @userabcxyz
                  </a>
                  <a href="#" className="flex items-center mb-3">
                    <div className="rounded-full h-8 w-8 bg-zinc-700 mr-3"></div>
                    @user65773
                  </a>
                  <a href="#" className="flex items-center">
                    <div className="rounded-full h-8 w-8 bg-zinc-700 mr-3"></div>
                    @user678
                  </a>
                </div>
                <a href="#" className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M12 4v16m8-8H4" />
                  </svg>
                  Help
                </a>
              </div>
              
              <div className="flex-1">
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <input type="text" placeholder="What are you looking for?" className="p-2 rounded-lg bg-zinc-700 text-white w-full lg:w-auto flex-1"/>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Search</button>
                  <button className="bg-zinc-700 text-white px-4 py-2 rounded-lg">All</button>
                  <button className="bg-zinc-700 text-white px-4 py-2 rounded-lg">Sports</button>
                  <div className="flex gap-2 overflow-auto">
                    <button className="bg-zinc-700 text-white px-4 py-2 rounded-lg">Tags</button>
                    <button className="bg-zinc-700 text-white px-4 py-2 rounded-lg">Tags</button>
                    <button className="bg-zinc-700 text-white px-4 py-2 rounded-lg">Tags</button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">From your subscribed creators</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-zinc-700 p-4 rounded-lg">
                      <div className="h-40 bg-zinc-600 rounded-lg mb-4"></div>
                      <h3 className="font-semibold">Title of stream here</h3>
                      <div className="text-zinc-400 text-sm">@user123</div>
                      <div className="text-zinc-400 text-xs">dd/mm/yyyy</div>
                    </div>
                    <div className="bg-zinc-700 p-4 rounded-lg">
                      <div className="h-40 bg-zinc-600 rounded-lg mb-4"></div>
                      <h3 className="font-semibold">Title of stream here</h3>
                      <div className="text-zinc-400 text-sm">@user123</div>
                      <div className="text-zinc-400 text-xs">dd/mm/yyyy</div>
                    </div>
                    <div className="bg-zinc-700 p-4 rounded-lg">
                      <div className="h-40 bg-zinc-600 rounded-lg mb-4"></div>
                      <h3 className="font-semibold">Title of stream here</h3>
                      <div className="text-zinc-400 text-sm">@user123</div>
                      <div className="text-zinc-400 text-xs">dd/mm/yyyy</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Creators currently live from your subscriptions</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-zinc-700 p-4 rounded-lg">
                      <div className="h-40 bg-zinc-600 rounded-lg mb-4"></div>
                      <h3 className="font-semibold">Title of stream here</h3>
                      <div className="flex justify-between items-center">
                        <div className="text-zinc-400 text-sm">@user123</div>
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">Live</span>
                      </div>
                    </div>
                    <div className="bg-zinc-700 p-4 rounded-lg">
                      <div className="h-40 bg-zinc-600 rounded-lg mb-4"></div>
                      <h3 className="font-semibold">Title of stream here</h3>
                      <div className="flex justify-between items-center">
                        <div className="text-zinc-400 text-sm">@user123</div>
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">Live</span>
                      </div>
                    </div>
                    <div className="bg-zinc-700 p-4 rounded-lg">
                      <div className="h-40 bg-zinc-600 rounded-lg mb-4"></div>
                      <h3 className="font-semibold">Title of stream here</h3>
                      <div className="flex justify-between items-center">
                        <div className="text-zinc-400 text-sm">@user123</div>
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">Live</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
    )
}