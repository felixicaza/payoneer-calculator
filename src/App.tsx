import { useState, useRef } from 'react'

function App() {
  const INITIAL_VALUE = 20

  const BANK_FEE = 4

  const PAYONEER_FEE = 3.15
  const PAYONEER_FEE_EXTRACT = 0.0185

  const [inputValue, setInputValue] = useState(INITIAL_VALUE)
  const [value, setValue] = useState(INITIAL_VALUE)
  const inputRef = useRef<HTMLInputElement>(null)
  const plusBtnRef = useRef<HTMLButtonElement>(null)
  const minusBtnRef = useRef<HTMLButtonElement>(null)

  const handleChange = () => {
    setValue(Number(inputRef.current?.value))
    setInputValue(Number(inputRef.current?.value))
  }

  const handlePlus = () => {
    setValue(Number(inputRef.current?.value) + 20)
    setInputValue(Number(inputRef.current?.value) + 20)
  }

  const handleMinus = () => {
    if (value > 0) {
      setValue(Number(inputRef.current?.value) - 20)
      setInputValue(Number(inputRef.current?.value) - 20)
    }
  }

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center gap-8 bg-[#FF4800]/10 px-4 text-center">
        <h1 className="text-5xl font-bold text-[#e39578]">
          Payoneer Calculator
        </h1>
        <section className="relative">
          <input
            className="col-span-1 row-span-2 max-w-xs rounded bg-[#FF4800]/10 py-2 text-center text-4xl font-semibold text-[#e39578] focus:outline-none"
            type="text"
            value={inputValue}
            onChange={handleChange}
            ref={inputRef}
          />
          <button
            className="absolute right-0 top-0 h-1/2 w-[30px] rounded-tr font-bold text-[#e39578] transition-colors active:bg-[#FF4800]/10 any-hover:bg-[#FF4800]/10"
            ref={plusBtnRef}
            onClick={handlePlus}
          >
            +
          </button>
          <button
            className="absolute bottom-0 right-0 h-1/2 w-[30px] rounded-br font-bold text-[#e39578] transition-colors active:bg-[#FF4800]/10 any-hover:bg-[#FF4800]/10"
            ref={minusBtnRef}
            onClick={handleMinus}
          >
            -
          </button>
        </section>
        {inputValue >= INITIAL_VALUE && (
          <output className="rounded px-4 py-2 text-lg font-bold text-[#56b372]">
            ${' '}
            {(
              Number(value) * PAYONEER_FEE_EXTRACT +
              PAYONEER_FEE +
              BANK_FEE +
              Number(value)
            ).toFixed(2)}
          </output>
        )}
        {inputValue < INITIAL_VALUE && (
          <span className="rounded px-4 py-2 text-lg font-bold text-[#f76965]">
            El valor mínimo es de $20
          </span>
        )}
      </main>
    </>
  )
}

export default App
