import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const AddBook = () => {
  const BASE_URL = getBaseUrl()
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [addBook, {isLoading, isError}] = useAddBookMutation()
  const [imageFileName, setimageFileName] = useState('')
  const onSubmit = async (data) => {
    try {
      let imageUrl = '';

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post(`${BASE_URL}/api/books/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrl = response.data.imageUrl;
      }

      const newBookData = {
        ...data,
        coverImage: imageUrl,
      };

      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Libro agregado",
        text: "¡Tu libro se ha subido exitosamente!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, está bien!",
      });
      reset();
      setimageFileName('');
      setimageFile(null);
    } catch (error) {
      console.error(error);
      alert("No se pudo agregar el libro. Por favor, inténtalo de nuevo.");
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  }
  return (
  <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Agregar Nuevo Libro</h2>

    {/* Formulario comienza aquí */}
    <form onSubmit={handleSubmit(onSubmit)} className=''>
    {/* Campo de entrada reutilizable para Título */}
    <InputField
      label="Título"
      name="title"
      placeholder="Ingresa el título del libro"
      register={register}
    />

    {/* Textarea reutilizable para Descripción */}
    <InputField
      label="Descripción"
      name="description"
      placeholder="Ingresa la descripción del libro"
      type="textarea"
      register={register}

    />

    {/* Campo de selección reutilizable para Categoría */}
    <SelectField
      label="Categoría"
      name="category"
      options={[
      { value: '', label: 'Elige una categoría' },
      { value: 'business', label: 'Negocios' },
      { value: 'technology', label: 'Tecnología' },
      { value: 'fiction', label: 'Ficción' },
      { value: 'horror', label: 'Terror' },
      { value: 'adventure', label: 'Aventura' },
      // Agrega más opciones según sea necesario
      ]}
      register={register}
    />

    {/* Checkbox de Tendencia */}
    <div className="mb-4">
      <label className="inline-flex items-center">
      <input
        type="checkbox"
        {...register('trending')}
        className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
      />
      <span className="ml-2 text-sm font-semibold text-gray-700">Tendencia</span>
      </label>
    </div>

    {/* Precio Anterior */}
    <InputField
      label="Precio Anterior"
      name="oldPrice"
      type="number"
      placeholder="Precio Anterior"
      register={register}
     
    />

    {/* Precio Nuevo */}
    <InputField
      label="Precio Nuevo"
      name="newPrice"
      type="number"
      placeholder="Precio Nuevo"
      register={register}
      
    />

    {/* Subir Imagen de Portada */}
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen de Portada</label>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
      {imageFileName && <p className="text-sm text-gray-500">Seleccionado: {imageFileName}</p>}
    </div>

    {/* Botón de Enviar */}
    <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
     {
      isLoading ? <span className="">Agregando.. </span> : <span>Agregar Libro</span>
      }
    </button>
    </form>
  </div>
  )
}

export default AddBook