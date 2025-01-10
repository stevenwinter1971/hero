import { useState, ChangeEvent } from 'react'

export function useMaskedInput(initialValue: string = '') {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, '')
    const currentYear = new Date().getFullYear()
    let maskedValue = ''

    for (let i = 0; i < input.length && i < 8; i++) {
      if (i === 0) {
        maskedValue += input[i]
      } else if (i === 1) {
        const month = parseInt(maskedValue + input[i], 10)
        maskedValue += month > 12 ? '' : input[i]
        maskedValue += maskedValue.length === 2 ? '/' : ''
      } else if (i === 2) {
        maskedValue += input[i]
      } else if (i === 3) {
        const day = parseInt(maskedValue.split('/')[1] + input[i], 10)
        maskedValue += day > 31 ? '' : input[i]
        maskedValue += maskedValue.length === 5 ? '/' : ''
      } else {
        maskedValue += input[i]
      }
    }

    // Pad the masked value with underscores
    while (maskedValue.length < 10) {
      if (maskedValue.length === 2 || maskedValue.length === 5) {
        maskedValue += '/'
      } else {
        maskedValue += '_'
      }
    }

    // Ensure YYYY is between 1924 and current year
    if (maskedValue.length === 10 && !maskedValue.includes('_')) {
      const [mm, dd, yyyy] = maskedValue.split('/')
      const year = parseInt(yyyy, 10)
      if (year < 1924) {
        maskedValue = `${mm}/${dd}/1924`
      } else if (year > currentYear) {
        maskedValue = `${mm}/${dd}/${currentYear}`
      }
    }

    setValue(maskedValue)
  }

  return [value, handleChange, setValue] as const
}

