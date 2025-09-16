import { useCallback, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const referenceOBJ = useRef(null);

  function passwordGenerator() {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "123456789";
    if (characterAllowed) str += "][{}&@*()!#$%-_=+-";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }

  useCallback(passwordGenerator, [length, numberAllowed, characterAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    referenceOBJ.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-8 bg-gray-800">
        <h1 className="text-3xl text-orange-400 font-extrabold text-center mb-6">
          Password Generator
        </h1>

        <div className="flex items-center shadow-md rounded-lg overflow-hidden mb-6 bg-gray-700">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-3 font-semibold bg-transparent text-orange-300"
            placeholder="password"
            ref={referenceOBJ}
            readOnly
          />
          <button
            className="bg-blue-500 hover:bg-blue-400 text-gray-900 font-bold px-4 py-3 transition rounded-md"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-2/3 accent-orange-400"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="accent-orange-400"
              />
              Numbers
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={characterAllowed}
                onChange={() => setCharacterAllowed((prev) => !prev)}
                className="accent-orange-400"
              />
              Special Chars
            </label>
          </div>
        </div>

        <button
          onClick={passwordGenerator}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-400 text-gray-900 font-bold py-3 rounded-lg transition"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
