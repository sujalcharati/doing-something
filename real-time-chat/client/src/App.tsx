import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const ws = useRef< WebSocket | null>(null);
  const [username, setUsername] = useState("");


  useEffect(()=>{

     ws.current = new WebSocket("ws://localhost:3000");

    ws.current.onopen = ()=>{
      console.log(" websocket connected connected");
    }

    ws.current.onmessage = (e)=>{
      setMessages((prev)=> [...prev, e.data]);
    };
    return ()=>{
      ws.current?.close();
    };




  },[])


  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        username,
        messages : input

      }));
      setMessages((prev) => [...prev, input]); 
      setInput('');
    }
  }

  return (
    <>
      <div className='bg-blue-500 w-[800px] h-[400px] flex flex-col border-4 border-black shadow-lg rounded-lg p-4'>
        <div className='flex-1 overflow-y-auto bg-white rounded p-2 mb-4'>
          {messages.length === 0 ? (
            <div className='text-gray-400 text-center mt-32'>No messages yet</div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className='mb-2 p-2 bg-black rounded w-fit max-w-full'>{msg}</div>
            ))
          )}
        </div>
        <form
          className='flex gap-2'
          onSubmit={sendMessage}
        >
          <input
            className='flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
            type='text'
            placeholder='Type your message...'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors'
            onClick={sendMessage}
          >
            Send
          </button>
          <input 
             className=' border border-white rounded-2xl'
             type='text'
             placeholder=' Enter your username'
             value={username}
             onChange={ e => setUsername(e.target.value)}
            />
        </form>
      </div>
    </>
  )
}

export default App
