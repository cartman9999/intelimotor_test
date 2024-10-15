import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEnv } from '../../context/EnvContext'

interface Errors {
  inputPrecio?: string
  inputDescription?: string
}

const useSubmitForm = () => {
  const { apiUrl } = useEnv()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const navigate = useNavigate()

  const validateForm = (inputPrecio: string, inputDescription: string) => {
    const newErrors: Errors = {}

    if (!inputPrecio) {
      newErrors.inputPrecio = 'Este campo es requerido'
    }

    if (!inputDescription) {
      newErrors.inputDescription = 'Este campo es requerido'
    }

    return newErrors
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    inputPrecio: string,
    inputDescription: string,
    setErrors: React.Dispatch<React.SetStateAction<Errors>>
  ) => {
    e.preventDefault()

    const errors = validateForm(inputPrecio, inputDescription)
    setErrors(errors)

    if (Object.keys(errors).length === 0) {
      setLoading(true)
      try {
        const api = `${apiUrl}/api/scrape`
        const response = await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputPrecio, inputDescription }),
        })

        setLoading(false)

        if (response.ok) {
          const data = await response.json()
          const { advertisementId, imageUrl } = data
          const queryParams = new URLSearchParams({ imageUrl }).toString()
          navigate(`/ad/${advertisementId}?${queryParams}`)
        } else {
          const errorData = await response.json()
          setErrorMessage(
            `${errorData.error} \n Intentelo nuevamente.` ||
              'Hubo un error en el servidor. Intentelo nuevamente.'
          )
          setIsErrorModalOpen(true)
        }
      } catch (error) {
        setLoading(false)
        setErrorMessage('Error en la solicitud: ' + (error as Error).message)
        setIsErrorModalOpen(true)
      }
    }
  }

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false)
  }

  return {
    loading,
    errorMessage,
    isErrorModalOpen,
    handleSubmit,
    handleCloseErrorModal,
  }
}

export default useSubmitForm
