import {
  addBook, getAllBook, updateBook, deleteBook, getByIdBook,
} from '../handler/bookHandler.js';

const routes = [
  // Routing utama
  {
    method: 'GET',
    path: '/',
    handler: () => { JSON.stringify({ nama: 'BookShelf API', keterangan: 'Untuk memenuhi submission course dicoding back-end pemula.' }); },
  },
  // Routing insert buku
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  // Routing read buku
  {
    method: 'GET',
    path: '/books',
    handler: getAllBook,
  },
  // Routing detail buku by id
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getByIdBook,
  },
  // Routing update buku
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
  // Routing delete buku
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

export default routes;
