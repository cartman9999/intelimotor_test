import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import {
  FormContainer,
  FormHeader,
  StyledBackdrop,
  StyledTextField,
  LoaderMessage,
  SubmitButton,
  InputContainer,
  FlexWrapBox,
  PageHeader,
} from './FormPage.styled'
import { useEnv } from '../../../context/EnvContext'

interface Errors {
  inputPrecio?: string
  inputDescription?: string
}

const FormPage = () => {
  const { apiUrl } = useEnv()
  const [inputPrecio, setInputPrecio] = useState('')
  const [inputDescription, setInputDescription] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = async () => {
    const newErrors: Errors = {}

    if (!inputPrecio) {
      newErrors.inputPrecio = 'Este campo es requerido'
    }

    if (!inputDescription) {
      newErrors.inputDescription = 'Este campo es requerido'
    }

    setErrors(newErrors)
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = await validateForm()
    if (JSON.stringify(errors) === '{}') {
      setLoading(true)
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
      }
    }
  }

  return (
    <>
      <PageHeader variant="h4">¡Publica tu vehículo ahora!</PageHeader>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ '& .MuiTextField-root': { m: 1 } }}
      >
        <FormContainer>
          <FormHeader>
            <Typography variant="h5">Información del vehículo</Typography>
            <Typography variant="h6" gutterBottom>
              Completa todos los datos, con ello tu anuncio tendrá más impacto
            </Typography>
          </FormHeader>
          <InputContainer>
            <FlexWrapBox
              display="flex"
              flexWrap="wrap"
              justifyContent="space-evenly"
            >
              <StyledTextField
                label="Tipo"
                name="type"
                value="autos"
                margin="normal"
                disabled
              />

              <StyledTextField
                label="Marca"
                name="brand"
                value="Acura"
                margin="normal"
                disabled
              />

              <StyledTextField
                label="Model"
                name="model"
                value="ILX"
                margin="normal"
                disabled
              />

              <StyledTextField
                label="Subtipo"
                name="subtype"
                value="sedán"
                margin="normal"
                disabled
              />

              <StyledTextField
                label="Año"
                name="year"
                value="2018"
                margin="normal"
                disabled
              />

              <StyledTextField
                label="Estado"
                name="province"
                value="Nuevo León"
                margin="normal"
                disabled
              />

              <StyledTextField
                label="Ciudad/Delegación"
                name="city"
                value="Monterrey"
                margin="normal"
                disabled
              />

              <StyledTextField
                label="Transacción"
                name="negotiable"
                value="negociable"
                margin="normal"
                disabled
              />
              <StyledTextField
                label="Kms. Recorridos"
                type="number"
                name="input_recorrido"
                id="input_recorrido"
                value="20000"
                disabled
              />
              <StyledTextField
                label="Precio"
                type="number"
                name="input_precio"
                id="input_precio"
                value={inputPrecio}
                onChange={(e) => setInputPrecio(e.target.value)}
                error={!!errors.inputPrecio}
                helperText={errors.inputPrecio}
                fullWidth
                required
              />
            </FlexWrapBox>
            <Box>
              <StyledTextField
                label="Descripción"
                type="text"
                name="input_description"
                id="input_description"
                value={inputDescription}
                onChange={(e) => setInputDescription(e.target.value)}
                error={!!errors.inputDescription}
                helperText={errors.inputDescription}
                required
                fullWidth
              />
            </Box>
          </InputContainer>
        </FormContainer>

        <SubmitButton
          variant="contained"
          type="submit"
          color="primary"
          disabled={loading}
        >
          Publicar
        </SubmitButton>
      </Box>

      <StyledBackdrop open={loading}>
        <LoaderMessage variant="h6">
          {' '}
          Publicando anuncio, espera un poco...
        </LoaderMessage>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
    </>
  )
}

export default FormPage
