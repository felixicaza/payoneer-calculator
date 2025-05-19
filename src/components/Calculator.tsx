import { useState, useRef } from 'preact/hooks'

import '@styles/calculator.css'

import { INITIAL_VALUE, BANK_FEE, PAYONEER_FEE, PAYONEER_FEE_EXTRACT } from '@data/constants'

export default function Calculator() {
  const MAX_SAFE_NUMBER = 99_999

  const [inputValue, setInputValue] = useState(INITIAL_VALUE)
  const [value, setValue] = useState(INITIAL_VALUE)
  const inputRef = useRef<HTMLInputElement>(null)
  const plusBtnRef = useRef<HTMLButtonElement>(null)
  const minusBtnRef = useRef<HTMLButtonElement>(null)

  const handleInput = (): void => {
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

  const TOTAL_EXTRACT = (value * PAYONEER_FEE_EXTRACT + PAYONEER_FEE + BANK_FEE + value).toFixed(2)

  const OUTPUT_TOTAL = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(Number(TOTAL_EXTRACT))

  return (
    <>
      <section>
        <label>
          <span>Ingresa el monto a retirar:</span>
          <span className="wrapper">
            <input type="text" value={inputValue} ref={inputRef} onInput={handleInput} />
            <button type="button" ref={plusBtnRef} onClick={handlePlus} aria-label="Aumentar cantidad">
              <svg width="11" viewBox="0 0 448 512">
                <path
                  fill="currentColor"
                  d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32"
                >
                </path>
              </svg>
            </button>
            <button type="button" ref={minusBtnRef} onClick={handleMinus} aria-label="Disminuir cantidad">
              <svg width="11" viewBox="0 0 448 512">
                <path
                  fill="currentColor"
                  d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32"
                >
                </path>
              </svg>
            </button>
          </span>
        </label>
      </section>
      {inputValue >= INITIAL_VALUE && (
        <div className="output">
          <p>Necesitas al menos:</p>
          <output>{OUTPUT_TOTAL}</output>
        </div>
      )}
      {inputValue < INITIAL_VALUE && (
        <span className="output-label">El valor mínimo es de $20</span>
      )}
    </>
  )
}
