import { useCallback, useState, useEffect, useRef } from "react";

function App() {
    const [password, setPassword] = useState("sldjflsd");
    const [isNumber, setIsNumber] = useState(false);
    const [isChar, setIsChar] = useState(false);
    const [passLength, setPassLength] = useState(8);
    const passwordRef = useRef(null)

    const generatePassword = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (isNumber) str = str + "0123456789";
        if (isChar) str = str + "~!@#$%^&*-_.><";
        for (let i = 1; i <= passLength; i++) {
            const randomNumber = Math.ceil(Math.random() * str.length);
            pass += str.charAt(randomNumber);
        }
        setPassword(pass);
    }, [setPassword, isNumber, isChar, passLength]);

    const copyToTheClipboard = useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 51);
        navigator.clipboard.writeText(password);
    }, [password])

    useEffect(() => {
        generatePassword();
    }, [setPassword, isNumber, isChar, passLength])

    return (
        <>
            <div className="flex flex-col items-center p-20 w-full h-screen bg-slate-800 text-white">
                <div className="font-extrabold text-2xl md:text-3xl mb-10">Password Generator</div>
                <div className="flex items-center justify-center min-w-full md:min-w-[600px]">
                    <input className="px-5 py-2 rounded-l-full text-xl text-yellow-600 bg-slate-700 w-full outline-none" value={password}  onChange={(e)=>setPassword(e.target.value)} ref={passwordRef} />
                    <span className="px-5 py-2 rounded-r-full text-xl text-black bg-red-400 active:bg-green-500 cursor-pointer select-none" onClick={copyToTheClipboard}>Copy</span>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center md:min-w-[600px] gap-8 py-8 text-lg">
                    <label htmlFor="passLength" className="select-none flex gap-3 font-extrabold">
                        <input type="range" min={6} max={50} value={passLength} onChange={(e) => setPassLength(e.target.value)} id="passLength" />
                        {passLength}
                    </label>
                    <label htmlFor="isNumber" className="select-none flex gap-1">
                        <input type="checkbox" defaultChecked={isNumber} onClick={() => setIsNumber(prev => !prev)} id="isNumber" />
                        Number Allowed
                    </label>
                    <label htmlFor="isChar" className="select-none flex gap-1">
                        <input type="checkbox" defaultChecked={isChar} onClick={() => setIsChar(prev => !prev)} id="isChar" />
                        Character Allowed
                    </label>
                </div>
            </div>
        </>
    );
}
export default App;
