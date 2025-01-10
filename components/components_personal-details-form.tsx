'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMaskedInput } from '../hooks/useMaskedInput'

interface FormData {
  birthdate: string
  weight: string
  heightFeet: string
  heightInches: string
  biologicalSex: string
}

interface FormErrors {
  birthdate?: string
  weight?: string
  heightFeet?: string
  heightInches?: string
}

export default function PersonalDetailsForm() {
  const [birthdate, handleBirthdateChange, setBirthdate] = useMaskedInput()
  const [formData, setFormData] = useState<FormData>({
    birthdate: '',
    weight: '',
    heightFeet: '',
    heightInches: '',
    biologicalSex: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateBirthdate = (value: string) => {
    if (value.includes('_')) return 'Please complete the date'
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(\d{4})$/
    if (!regex.test(value)) {
      return 'Please enter a valid date in MM/DD/YYYY format'
    }
    const [, , year] = value.split('/')
    const yearNum = parseInt(year, 10)
    const currentYear = new Date().getFullYear()
    if (yearNum < 1924 || yearNum > currentYear) {
      return `Year must be between 1924 and ${currentYear}`
    }
    return ''
  }

  const validateWeight = (value: string) => {
    const weight = parseInt(value, 10)
    if (isNaN(weight) || weight < 50 || weight > 400) {
      return 'Weight must be between 50 and 400 pounds'
    }
    return ''
  }

  const validateHeightFeet = (value: string) => {
    const feet = parseInt(value, 10)
    if (isNaN(feet) || feet < 3 || feet > 12) {
      return 'Height (feet) must be between 3 and 12'
    }
    return ''
  }

  const validateHeightInches = (value: string) => {
    const inches = parseInt(value, 10)
    if (isNaN(inches) || inches < 0 || inches > 11) {
      return 'Height (inches) must be between 0 and 11'
    }
    return ''
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    let error = ''
    switch (name) {
      case 'weight':
        error = validateWeight(value)
        break
      case 'heightFeet':
        error = validateHeightFeet(value)
        break
      case 'heightInches':
        error = validateHeightInches(value)
        break
    }

    setErrors({ ...errors, [name]: error })
  }

  const handleBirthdateInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleBirthdateChange(e)
    const error = validateBirthdate(e.target.value)
    setErrors({ ...errors, birthdate: error })
    setFormData({ ...formData, birthdate: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = {
      birthdate: validateBirthdate(birthdate),
      weight: validateWeight(formData.weight),
      heightFeet: validateHeightFeet(formData.heightFeet),
      heightInches: validateHeightInches(formData.heightInches),
    }
    setErrors(newErrors)

    if (Object.values(newErrors).every(error => error === '')) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', { ...formData, birthdate })
    } else {
      console.log('Form has errors:', newErrors)
    }
  }

  return (
    <div className="max-w-xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Provide your personal details.
        </h1>
        <div className="px-3 py-1 rounded-full bg-green-50 whitespace-nowrap">
          <span className="text-sm text-green-600">1 / 6</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              id="birthdate"
              name="birthdate"
              type="text"
              placeholder="MM/DD/YYYY"
              value={birthdate}
              onChange={handleBirthdateInputChange}
              className={errors.birthdate ? 'border-red-500' : ''}
            />
            {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (pounds)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              placeholder="e.g. 165"
              value={formData.weight}
              onChange={handleInputChange}
              className={errors.weight ? 'border-red-500' : ''}
            />
            {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="heightFeet">Height (feet)</Label>
            <Input
              id="heightFeet"
              name="heightFeet"
              type="number"
              placeholder="e.g. 5"
              value={formData.heightFeet}
              onChange={handleInputChange}
              className={errors.heightFeet ? 'border-red-500' : ''}
            />
            {errors.heightFeet && <p className="text-red-500 text-sm mt-1">{errors.heightFeet}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="heightInches">Height (inches)</Label>
            <Input
              id="heightInches"
              name="heightInches"
              type="number"
              placeholder="e.g. 9"
              value={formData.heightInches}
              onChange={handleInputChange}
              className={errors.heightInches ? 'border-red-500' : ''}
            />
            {errors.heightInches && <p className="text-red-500 text-sm mt-1">{errors.heightInches}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Biological Sex</Label>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={formData.biologicalSex === 'female' ? 'default' : 'outline'}
              className="w-full h-[52px]"
              onClick={() => setFormData({ ...formData, biologicalSex: 'female' })}
            >
              <span className="mr-2">♀</span>
              Female
            </Button>
            <Button
              type="button"
              variant={formData.biologicalSex === 'male' ? 'default' : 'outline'} 
              className="w-full h-[52px]"
              onClick={() => setFormData({ ...formData, biologicalSex: 'male' })}
            >
              <span className="mr-2">♂</span>
              Male
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-gray-900 text-white w-full">
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}

