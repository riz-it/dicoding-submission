import Books from '../data/book.js';

// Helper untuk menampilkan informasi buku
const setFormat = (books) => books.map(({
  id, name, publisher,
}) => ({ id, name, publisher }));

// Helper untuk memformat response
const setResponse = (hapi, status = 'failed', code = 200, message = 'Request processed successfully.', data = null) => {
  if (status === 'success') {
    return hapi.response({ status, message, data }).code(code);
  }
  return hapi.response({ status, message }).code(code);
};

// Helper untuk mengambil data sesuai parameter
const getBookByParam = (type, param, h) => {
  if (type === 'name') {
    const result = Books.filter((book) => {
      // kalau ada query name
      const nameRegex = new RegExp(param, 'gi');
      return nameRegex.test(book.name);
    });
    return setResponse(h, 'success', 200, `Berhasil menampilkan semua buku dengan nama ${param}`, { books: setFormat(result) });
  }
  if (type === 'reading') {
    const result = Books.filter(
      (book) => Number(book.reading) === Number(param),
    );
    let msg = null;
    if (Number(param)) {
      msg = 'belum selesai';
    } else {
      msg = 'selesai';
    }
    return setResponse(h, 'success', 200, `Berhasil menampilkan semua buku yang ${msg} dibaca.`, { books: setFormat(result) });
  }
  if (type === 'finished') {
    const result = Books.filter(
      (book) => Number(book.finished) === Number(param),
    );
    let msg = null;
    if (Number(param)) {
      msg = 'selesai';
    } else {
      msg = 'belum selesai';
    }
    return setResponse(h, 'success', 200, `Berhasil menampilkan semua buku yang ${msg} dibaca.`, { books: setFormat(result) });
  }
  return false;
};

export {
  setFormat, setResponse, getBookByParam,
};
