"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CheckoutFormProps {
  onSubmit: (formData: any) => Promise<void>
  isProcessing: boolean
}

export function CheckoutForm({ onSubmit, isProcessing }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    // Contact Information
    email: "",
    phone: "",
    
    // Shipping Information
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Norge",
    
    // Payment Information
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    
    // Billing same as shippinṣ
    billingSameAsShipping: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields validation
    const requiredFields = [
      'email', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode',
      'cardNumber', 'expiryDate', 'cvv', 'cardName'
    ]

    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'This field is required'
      }
    })

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Card number validation (basic length check)
    if (formData.cardNumber && formData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number'
    }

    // CVV validation
    if (formData.cvv && (formData.cvv.length < 3 || formData.cvv.length > 4)) {
      newErrors.cvv = 'Please enter a valid CVV'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    await onSubmit(formData)
  }

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  const errorInputClassName = "w-full px-3 py-2 border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Kontakt informasjon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Epost
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? errorInputClassName : inputClassName}
              placeholder="ola@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefonnr
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={inputClassName}
              placeholder="+47 123 45 678"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <Card>
        <CardHeader>
          <CardTitle>Leverings adresse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Fornavn
              </label>
              <input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={errors.firstName ? errorInputClassName : inputClassName}
                placeholder="John"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Etternavn
              </label>
              <input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={errors.lastName ? errorInputClassName : inputClassName}
                placeholder="Doe"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Addresse
            </label>
            <input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={errors.address ? errorInputClassName : inputClassName}
              placeholder="Bredalsveien 14"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
              Hus, Leilighet, etc. (Optional)
            </label>
            <input
              id="apartment"
              value={formData.apartment}
              onChange={(e) => handleInputChange('apartment', e.target.value)}
              className={inputClassName}
              placeholder="Leilighet 3B"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                By
              </label>
              <input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={errors.city ? errorInputClassName : inputClassName}
                placeholder="Hønefoss"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                Fylkeskommune
              </label>
              <input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={errors.state ? errorInputClassName : inputClassName}
                placeholder="Viken"
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                Postnummer
              </label>
              <input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className={errors.zipCode ? errorInputClassName : inputClassName}
                placeholder="3513"
              />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Betalings informasjon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
              Navn på kortholder
            </label>
            <input
              id="cardName"
              value={formData.cardName}
              onChange={(e) => handleInputChange('cardName', e.target.value)}
              className={errors.cardName ? errorInputClassName : inputClassName}
              placeholder="Ola Nordmann"
            />
            {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
          </div>

          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Kortnummer
            </label>
            <input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => {
                // Format card number with spaces
                const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
                handleInputChange('cardNumber', value)
              }}
              maxLength={19}
              className={errors.cardNumber ? errorInputClassName : inputClassName}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Uløpsdato
              </label>
              <input
                id="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={(e) => {
                  // Format expiry date
                  const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
                  handleInputChange('expiryDate', value)
                }}
                maxLength={5}
                className={errors.expiryDate ? errorInputClassName : inputClassName}
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>
            
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                maxLength={4}
                className={errors.cvv ? errorInputClassName : inputClassName}
              />
              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="billingSameAsShipping"
              type="checkbox"
              checked={formData.billingSameAsShipping}
              onChange={(e) => handleInputChange('billingSameAsShipping', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="billingSameAsShipping" className="ml-2 block text-sm text-gray-700">
              Faktureringsadresse er den samme som leveringsadresse
            </label>
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Complete Order'}
      </Button>
    </form>
  )
}
