export const Contactform = ()=>{
    return (
        <main className="">
            <section className="bg-blue-200 h-[85vh] m-20 rounded flex ">
            <div className="w-1/2 p-10">

            <div>
                <h1 className=" text-black  mt-32 ml-60 text-4xl px-7 font-bold ">Meet with Sujal!</h1>
                <p className="text-black w-96 ml-60 font-mono ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum sequi nisi fuga vel voluptate ipsa neque perspiciatis?.</p>
            </div>

            <div className=" flex gap-x-6 gap-y-6 ">

            <div className=" w-20  h-20 rounded-full mt-11 ml-60 bg-gray-300 border border-black"> <div className=" flex justify-center items-center text-black mt-6"> pic </div></div>

            <div className=" mt-5 ">
                <h2 className="text-black">Sujal Charati</h2>
                <p className="text-black">full stack engineer</p>
            </div>
            </div>
            </div>

            <div className="w-1/2 p-10 flex flex-col gap-4 mb-36 mt-40 mr-3">
            <div>
                <label className="text-black"> Full name*</label>
                <input type="text"
                      placeholder="enter your full name"
                      className="w-full mt-2 rounded bg-white text-black px-3 py-2 "/>
            </div>
            <div>

                <label className="text-black"> Company Name</label>
                <input type="text"
                      placeholder="enter your company Name"
                      className="w-full mt-2 rounded bg-white text-black py-2 pl-3"/>
            </div>
            <div>

                <label className="text-black"> Email</label>
                <input type="text"
                      placeholder="enter email"
                      className="w-full mt-2 rounded bg-white text-black px-3 py-2"/>
            </div>

            <div>
                <label className="text-black"> Phone</label>
                <input type="text"
                      placeholder="enter phone numeber"
                      className="w-full mt-2 rounded bg-white text-black pl-3 py-2"/>
            </div>

            <div className=" flex  ">
            <input type="checkbox" className=" "></input>
            <p className=" text-black pl-6">I agree that my personal data will in accordacne with the sujal right i dont know what will happen !</p>
            </div>

            <button className="border border-black rounded-md text-black w-24 py-2 self-end ">Message</button> 

            </div>

            </section>
        </main>
    )
}