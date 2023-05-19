import { nanoid } from 'nanoid';
import Books from '../data/book.js';
import { setResponse, setFormat, getBookByParam } from '../helper/helper.js';

const addBook = async (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
  } = request.payload;

  // validasi 1
  if (!name) {
    return setResponse(h, 'failed', 400, 'Gagal menambahkan buku. Mohon isi nama buku');
  }

  // validasi 2
  if (readPage > pageCount) {
    return setResponse(h, 'failed', 400, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  }

  const newBook = {
    id: nanoid(),
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: (finished ?? pageCount === readPage) ? true : false,
    reading: (reading && reading === 'true') ? true : false,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // insert buku
  Books.push(newBook);

  // cek apakah berhasil atau tidak
  const isCreated = Books.find((book) => book.id === newBook.id);
  if (isCreated) {
    return setResponse(h, 'success', 201, 'Buku berhasil ditambahkan', { bookId: newBook.id });
  }
  return setResponse(h, 'failed', 500, 'Gagal menambahkan buku', 'error');
};

const getAllBook = async (request, h) => {
  const { name, reading, finished } = request.query;

  // [OPTIONAL] menampilkan buku by parameter (nama, reading, finised)
  if (typeof name === 'string') return getBookByParam('name', name, h);
  if (typeof reading === 'string') return getBookByParam('reading', reading, h);
  if (typeof finished === 'string') return getBookByParam('finished', finished, h);

  // Menampilkan semua buku
  const allBooks = setFormat(Books);
  return setResponse(h, 'success', 200, 'Berhasil menampilkan semua buku', { books: allBooks });
};

const getByIdBook = async (request, h) => {
  const { bookId } = request.params;
  const result = Books.filter((book) => book.id === bookId);

  // cek apakah buku ditemukan atau tidak
  if (result.length > 0) {
    return setResponse(h, 'success', 200, `Berhasil menampilkan buku dengan ID '${bookId}`, { book: result[0] });
  }
  return setResponse(h, 'failed', 404, 'Buku tidak ditemukan');
};

const updateBook = async (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
  } = request.payload;

  const { bookId } = request.params;
  const updatedAt = new Date().toISOString();
  const index = Books.findIndex((book) => book.id === bookId);

  // validasi 1
  if (!name) {
    return setResponse(h, 'failed', 400, 'Gagal memperbarui buku. Mohon isi nama buku');
  }

  // validasi 2
  if (readPage > pageCount) {
    return setResponse(h, 'failed', 400, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
  }

  // validasi 3
  if (index === -1) {
    return setResponse(h, 'failed', 404, 'Gagal memperbarui buku. Id tidak ditemukan');
  }

  // update buku
  Books[index] = {
    ...Books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: (finished ?? pageCount === readPage) ? true : false,
    reading: (reading && reading === 'true') ? true : false,
    updatedAt,
  };
  return setResponse(h, 'success', 200, 'Buku berhasil diperbarui', Books[index]);
};

const deleteBook = async (request, h) => {
  const { bookId } = request.params;

  // mencari buku dengan parameter id
  const bookIndex = Books.findIndex((book) => book.id === bookId);

  // validasi 1
  if (bookIndex === -1) {
    return setResponse(h, 'failed', 404, 'Buku gagal dihapus. Id tidak ditemukan');
  }

  // delete buku
  Books.splice(bookIndex, 1);
  return setResponse(h, 'success', 200, request.params.bookId, 'Buku berhasil dihapus');
};

export {
  addBook, getAllBook, updateBook, deleteBook, getByIdBook,
};
