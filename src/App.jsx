import { useEffect, useState } from 'react'
import './App.css'
import InputBox from './components/input'
import usecurrencyinfo from './hooks/usecurrencyinfo'

function App() {

  const [amount,setamount] = useState()
  const[from,setfrom] = useState("usd")
  const[to,setto] = useState("inr")
  const[convertAmount,setconvertAmount] = useState("")
  const[isDarkmode,setisDarkmode] = useState(false)


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme == "dark"){
      setisDarkmode(true);
      document.documentElement.classList.add("dark");
    }
  },[]);

  const toggletheme=() => {
    setisDarkmode((prevmode) => {
      const newMode = !prevmode;
      document.documentElement.classList.toggle("dark",newMode);
      localStorage.setItem("theme",newMode ? "dark" : "bright");
      return newMode;
    });
  }

  const currencyinfo = usecurrencyinfo(from)
  const options = Object.keys(currencyinfo)

  const swap = () => {
    setfrom(to)
    setto(from)
    setconvertAmount(amount)
    setamount(convertAmount)
  }

  const convert = () =>{
    setconvertAmount(amount * currencyinfo[to])
  }
  

  return (
    <div className="w-full h-screen flex items-center justify-center bg-brightBg dark:bg-darkBg text-black dark:text-white transition-colors duration-300">
    <button
        onClick={toggletheme}
        className="absolute top-4 right-4 flex items-center px-3 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
    >
        <span className="mr-2">{isDarkmode ? "🌙" : "☀️"}</span>
        <span>{isDarkmode ? "Bright Mode" : "Dark Mode"}</span>
    </button>
      
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat transition-all duration-300 ease-in-out"
        style={{
          backgroundImage: `url('${
            isDarkmode
                ? "https://i.pinimg.com/736x/fa/2a/da/fa2ada730010d21b609fdf087b49cbd9.jpg" // Dark mode image
                : "https://i.pinimg.com/736x/d2/8e/2e/d28e2e29ce756244654cff788acffda0.jpg" // Bright mode image
                
        }')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-300 dark:border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30 dark:bg-black/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setamount(amount)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setamount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setto(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>


    </div>
  
);
}

export default App
