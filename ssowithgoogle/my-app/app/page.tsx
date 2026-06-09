"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <div className="p-6 text-xl">Loading...</div>;
  // }

  // if (session) {
  //   return (
  //     <div className="flex flex-col items-center gap-3 p-6">
  //       <p className="text-2xl">Signed in as {session.user?.email}</p>
  //       <p>Name: {session.user?.name}</p>
  //       {session.user?.image && (
  //         <img src={session.user.image} alt="avatar" className="w-16 h-16 rounded-full" />
  //       )}
  //       <button
  //         onClick={() => signOut()}
  //         className="border border-white m-3 p-3 rounded-sm text-xl bg-white text-black"
  //       >
  //         Sign Out
  //       </button>
  //     </div>
  //   );
  // }


  const { data: session, status} = useSession();


  if( status == "loading"){
    return (
      <div> loading...</div>
    )
  }

  if( session){

    return (
      <div>
           <p> signed in as email: {session.user?.email}</p>
          <p> username : {session.user?.name}</p>
          <button onClick={()=> signOut()}>log out</button>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => signIn()}
        className="border border-white m-3 p-3 rounded-sm text-3xl bg-white text-black"
      >
        Sign In
      </button>
    </div>
  );
}
