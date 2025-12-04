
const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="min-h-[70vh] flex flex-col justify-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          Edwrelyn Buhian
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mb-8">
          Computer Engineering student. Service Consultant. Event Host. Leader.
        </p>
        <div className="flex gap-4 text-sm">
          <a 
            href="/about" 
            className="px-6 py-3 bg-black text-white hover:bg-neutral-800 transition-colors"
          >
            View Portfolio
          </a>
          <a 
            href="/contact" 
            className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mt-20 border-t border-neutral-200 pt-12">
        <div>
          <h3 className="font-semibold mb-2">Current Role</h3>
          <p className="text-sm text-neutral-600">Service Consultant at AEG</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Education</h3>
          <p className="text-sm text-neutral-600">Computer Engineering, Samuel Christian College</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Location</h3>
          <p className="text-sm text-neutral-600">General Trias, Cavite</p>
        </div>
      </div>
    </div>
  )
}

export default Home