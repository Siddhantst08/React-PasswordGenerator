import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [initLength, setInitLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789"
    let chars = "!@#$%^&*()_+"
    
    let i = 0
    while (i < initLength) {

      if (numAllowed) {
        pass += num.charAt(Math.floor(Math.random() * num.length + 1))
        i++
      }
      if (charAllowed) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length + 1))
        i++
      }
      
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      i++
    }
    setPassword(pass);
  }, [initLength, charAllowed, numAllowed]);

  const passwordRef = useRef(null)

  useEffect(() => {
    generatePassword();
  }, [initLength, numAllowed, charAllowed]);

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password..."
          readOnly
          ref={passwordRef}
        />
        <button 
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        onClick={copyPasswordToClipBoard}
        >copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={initLength}
            className="cursor-pointer"
            onChange={(e) => setInitLength(e.target.value)}
          />
          <label htmlFor="length">Length: {initLength}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="character">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
