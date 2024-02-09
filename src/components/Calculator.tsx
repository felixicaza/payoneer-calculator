import { useState, useRef, type ReactElement } from 'react'

export default function Calculator(): ReactElement {
  const INITIAL_VALUE = 20
  const BANK_FEE = 4
  const PAYONEER_FEE = 3.15
  const PAYONEER_FEE_EXTRACT = 0.0185
  const MAX_SAFE_NUMBER = 99_999

  const [inputValue, setInputValue] = useState(INITIAL_VALUE)
  const [value, setValue] = useState(INITIAL_VALUE)
  const inputRef = useRef<HTMLInputElement>(null)
  const plusBtnRef = useRef<HTMLButtonElement>(null)
  const minusBtnRef = useRef<HTMLButtonElement>(null)

  const handleChange = (): void => {
    const input = inputRef.current

    if (input !== null) {
      let newValue = Number(inputRef.current?.value)

      if (Number.isNaN(newValue)) newValue = INITIAL_VALUE

      if (newValue >= MAX_SAFE_NUMBER) newValue = INITIAL_VALUE

      setValue(newValue)
      setInputValue(newValue)
    }
  }

  const handlePlus = (): void => {
    const input = inputRef.current

    if (input !== null) {
      let newValue = Number(inputRef.current?.value)

      if (newValue >= MAX_SAFE_NUMBER) newValue = INITIAL_VALUE

      setValue(newValue + 20)
      setInputValue(newValue + 20)
    }
  }

  const handleMinus = (): void => {
    const input = inputRef.current

    if (input !== null) {
      if (value > 0) {
        const value = Number(inputRef.current?.value)

        setValue(value - 20)
        setInputValue(value - 20)
      }
    }
  }

  const TOTAL_EXTRACT = (
    value * PAYONEER_FEE_EXTRACT +
    PAYONEER_FEE +
    BANK_FEE +
    value
  ).toFixed(2)

  const OUTPUT_TOTAL = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(Number(TOTAL_EXTRACT))

  return (
    <>
      <section>
        <label className="flex flex-col gap-2">
          <span className="text-[#783F2A]">Ingresa el monto a retirar:</span>
          <div className="relative">
            <input
              className="col-span-1 row-span-2 max-w-xs rounded bg-[#ff4800]/10 py-4 text-center text-4xl font-semibold text-[#783F2A] focus:outline focus:outline-4 focus:outline-[#ff4800]/15"
              type="text"
              value={inputValue}
              ref={inputRef}
              onChange={handleChange}
            />
            <button
              className="absolute right-0 top-0 flex h-1/2 w-[36px] items-center justify-center rounded-tr font-bold text-[#783F2A] transition-colors active:bg-[#ff4800]/10 any-hover:bg-[#ff4800]/15"
              type="button"
              ref={plusBtnRef}
              onClick={handlePlus}
              aria-label="Aumentar cantidad"
            >
              <svg width="0.7rem" viewBox="0 0 448 512">
                <path
                  fill="currentColor"
                  d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32"
                ></path>
              </svg>
            </button>
            <button
              className="absolute bottom-0 right-0 flex h-1/2 w-[36px] items-center justify-center rounded-tr font-bold text-[#783F2A] transition-colors active:bg-[#ff4800]/10 any-hover:bg-[#ff4800]/15"
              type="button"
              ref={minusBtnRef}
              onClick={handleMinus}
              aria-label="Disminuir cantidad"
            >
              <svg width="0.7rem" viewBox="0 0 448 512">
                <path
                  fill="currentColor"
                  d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32"
                ></path>
              </svg>
            </button>
          </div>
        </label>
      </section>
      {inputValue >= INITIAL_VALUE && (
        <div>
          <p className="text-[#783F2A]">Necesitas al menos:</p>
          <output className="rounded px-4 py-2 text-lg font-bold text-[#265A36]">
            {OUTPUT_TOTAL}
          </output>
        </div>
      )}
      {inputValue < INITIAL_VALUE && (
        <span className="rounded px-4 py-2 text-lg font-bold text-[#9D1A1A]">
          El valor mínimo es de $20
        </span>
      )}
    </>
  )
}
