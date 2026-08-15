import { useState, useEffect } from 'preact/hooks'
import clsx from 'clsx'
import { tiks } from '@rexa-developer/tiks'

import '@styles/calculator.css'

import { INITIAL_VALUE, BANK_FEE, PAYONEER_FEE, PAYONEER_FEE_EXTRACT } from '@data/constants'

const LIMITS = {
  max: 99_999,
  min: 0,
  step: 20
} as const

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

function sanitizeValue(value: number) {
  if (!Number.isFinite(value)) return INITIAL_VALUE
  return Math.max(LIMITS.min, Math.min(value, LIMITS.max))
}

function calculateTotal(amount: number) {
  return amount + amount * PAYONEER_FEE_EXTRACT + PAYONEER_FEE + BANK_FEE
}

export default function Calculator() {
  const [value, setValue] = useState(INITIAL_VALUE)

  useEffect(() => { tiks.init({ volume: 0.5 }) }, [])

  function updateValue(delta: number) {
    setValue((previous) => sanitizeValue(previous + delta))
  }

  function handleBeforeInput(event: InputEvent) {
    const input = event.currentTarget as HTMLInputElement

    const start = input.selectionStart ?? input.value.length
    const end = input.selectionEnd ?? input.value.length

    const nextValue = input.value.slice(0, start) + (event.data ?? '') + input.value.slice(end)

    if (Number(nextValue) > LIMITS.max) {
      event.preventDefault()
    }
  }

  function handleInput(event: InputEvent) {
    const target = event.currentTarget as HTMLInputElement
    setValue(sanitizeValue(target.valueAsNumber))
  }

  function handleIncrement() {
    tiks.click()
    updateValue(LIMITS.step)
  }

  function handleDecrement() {
    tiks.click()
    updateValue(-LIMITS.step)
  }

  const outputTotal = currencyFormatter.format(calculateTotal(value))
  const isValid = value >= INITIAL_VALUE

  return (
    <>
      <section className="input-container">
        <label htmlFor="amount">Ingresa el monto a retirar:</label>
        <div className="wrapper">
          <input id="amount" type="number" value={value} onBeforeInput={handleBeforeInput} onInput={handleInput} min={LIMITS.min} max={LIMITS.max} step={LIMITS.step} />
          <button type="button" onClick={handleIncrement} aria-label="Aumentar cantidad" disabled={value >= LIMITS.max}>
            <svg width="11" height="11" viewBox="0 0 448 512">
              <path
                fill="currentColor"
                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32"
              />
            </svg>
          </button>
          <button type="button" onClick={handleDecrement} aria-label="Disminuir cantidad" disabled={value === LIMITS.min}>
            <svg width="11" height="11" viewBox="0 0 448 512">
              <path
                fill="currentColor"
                d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32"
              />
            </svg>
          </button>
        </div>
      </section>

      <section className="output-container">
        <div className={clsx('output-total', { 'is-hidden': !isValid })} aria-hidden={!isValid}>
          <p>Total estimado a debitar:</p>
          <output htmlFor="amount">{outputTotal}</output>
          <small>
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12.3 7.29c.2-.18.44-.29.7-.29c.27 0 .5.11.71.29c.19.21.29.45.29.71c0 .27-.1.5-.29.71c-.21.19-.44.29-.71.29c-.26 0-.5-.1-.7-.29c-.19-.21-.3-.44-.3-.71c0-.26.11-.5.3-.71m-2.5 4.68s2.17-1.72 2.96-1.79c.74-.06.59.79.52 1.23l-.01.06c-.14.53-.31 1.17-.48 1.78c-.38 1.39-.75 2.75-.66 3c.1.34.72-.09 1.17-.39c.06-.04.11-.08.16-.11c0 0 .08-.08.16.03c.02.03.04.06.06.08c.09.14.14.19.02.27l-.04.02c-.22.15-1.16.81-1.54 1.05c-.41.27-1.98 1.17-1.74-.58c.21-1.23.49-2.29.71-3.12c.41-1.5.59-2.18-.33-1.59c-.37.22-.59.36-.72.45c-.11.08-.12.08-.19-.05l-.03-.06l-.05-.08c-.07-.1-.07-.11.03-.2M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-2 0c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8" />
            </svg>
            Basado en comisiones reales. El monto final puede variar según el cajero.
          </small>
        </div>
        <p className={clsx('output-label', { 'is-hidden': isValid })} aria-hidden={isValid}>
          El valor mínimo es de $20
        </p>
      </section>
    </>
  )
}
