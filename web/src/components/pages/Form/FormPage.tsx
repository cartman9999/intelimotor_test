import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import {
  FormContainer,
  FormHeader,
  StyledTextField,
  SubmitButton,
  InputContainer,
  FlexWrapBox,
  PageHeader,
} from './FormPage.styled'
import ErrorModal from './ErrorModal'
import Loader from './Loader'
import useSubmitForm from '../../../hooks/Form/useSubmitForm'

interface Errors {
  inputPrecio?: string
  inputDescription?: string
}

const FormPage = () => {
  const [inputPrecio, setInputPrecio] = useState('')
  const [inputDescription, setInputDescription] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const {
    loading,
    errorMessage,
    isErrorModalOpen,
    handleSubmit,
    handleCloseErrorModal,
  } = useSubmitForm()

  return (
    <>
      <PageHeader variant="h4">¡Publica tu vehículo ahora!</PageHeader>
      <Box
        component="form"
        onSubmit={(e) =>
          handleSubmit(e, inputPrecio, inputDescription, setErrors)
        }
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
                autoComplete="off"
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
                autoComplete="off"
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

      <Loader
        loading={loading}
        message="Publicando anuncio, espera un poco..."
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        errorMessage={errorMessage}
        onClose={handleCloseErrorModal}
      />
    </>
  )
}

export default FormPage
