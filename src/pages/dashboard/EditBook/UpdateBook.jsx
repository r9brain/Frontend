import React, { useEffect } from 'react'
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData?.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage)
    }
  }, [bookData, setValue])

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      Swal.fire({
        title: "Libro Actualizado",
        text: "¡Tu libro se ha actualizado con éxito!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, está bien!"
      });
      await refetch()
    } catch (error) {
      console.log("Error al actualizar el libro.");
      alert("Error al actualizar el libro.");
    }
  }
  if (isLoading) return <Loading />
  if (isError) return <div>Error al obtener los datos del libro</div>
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Actualizar Libro</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Título"
          name="title"
          placeholder="Ingrese el título del libro"
          register={register}
        />

        <InputField
          label="Descripción"
          name="description"
          placeholder="Ingrese la descripción del libro"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Categoría"
          name="category"
          options={[
            { value: '', label: 'Elija una categoría' },
            { value: 'business', label: 'Negocios' },
            { value: 'technology', label: 'Tecnología' },
            { value: 'fiction', label: 'Ficción' },
            { value: 'horror', label: 'Terror' },
            { value: 'adventure', label: 'Aventura' },
          ]}
          register={register}
        />
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

        <InputField
          label="Precio Anterior"
          name="oldPrice"
          type="number"
          placeholder="Precio Anterior"
          register={register}
        />

        <InputField
          label="Precio Nuevo"
          name="newPrice"
          type="number"
          placeholder="Precio Nuevo"
          register={register}
        />

        <InputField
          label="URL de la Imagen de Portada"
          name="coverImage"
          type="text"
          placeholder="URL de la Imagen de Portada"
          register={register}
        />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Actualizar Libro
        </button>
      </form>
    </div>
  )
}

export default UpdateBook
