import React from 'react'
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const ManageBooks = () => {
    const navigate = useNavigate();

    const {data: books, refetch} = useFetchAllBooksQuery()

    const [deleteBook] = useDeleteBookMutation()

    // Handle deleting a book
    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap();
            alert('¡Libro eliminado con éxito!');
            refetch();

        } catch (error) {
            console.error('Error al eliminar el libro:', error.message);
            alert('Error al eliminar el libro. Por favor, inténtalo de nuevo.');
        }
    };

    // Handle navigating to Edit Book page
    const handleEditClick = (id) => {
        navigate(`dashboard/edit-book/${id}`);
    };

    // Handle generating PDF
    const handleGeneratePDF = async () => {
        try {
            const response = await fetch('https://backend-ogct.onrender.com/api/books');
            const books = await response.json();

            const doc = new jsPDF();

            doc.setFontSize(16);
            doc.text('Lista de Libros', 105, 10, { align: 'center' });
            doc.setFontSize(12);
            let y = 20;

            books.forEach((book, index) => {
                doc.text(`${index + 1}. Título: ${book.title}`, 10, y);
                doc.text(`Categoría: ${book.category}`, 10, y + 10);
                doc.text(`Precio: $${book.newPrice}`, 10, y + 20);
                y += 30;

                if (y > 280) {
                    doc.addPage();
                    y = 10;
                }
            });

            doc.save('Lista_de_Libros.pdf');
        } catch (error) {
            console.error('Error al generar el PDF:', error);
            alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
        }
    };

  return (
    <section className="py-1 bg-blueGray-50">
    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">Todos los Libros</h3>
                    </div>
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                        <button
                            onClick={handleGeneratePDF}
                            className="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Generar PDF
                        </button>
                        <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Ver todos</button>
                    </div>
                </div>
            </div>

            <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                    <thead>
                        <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                #
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Título del Libro
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Categoría
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Precio
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            books && books.map((book, index) => (
                                <tr key={index}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                   {index + 1}
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    {book.title}
                                </td>
                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {book.category}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                    ${book.newPrice}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">

                                    <Link to={`/dashboard/edit-book/${book._id}`} className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2">
                                        Editar
                                    </Link>
                                    <button 
                                    onClick={() => handleDeleteBook(book._id)}
                                    className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2">Eliminar</button>
                                </td>
                            </tr> 
                            ))
                        }
         

                    </tbody>

                </table>
            </div>
        </div>
    </div>

</section>
  )
}

export default ManageBooks