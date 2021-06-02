import Axios from 'axios';

const books_rest_api = 'http://localhost:8080/books';

class BooksService {

    getBooks() {

        return Axios.get(books_rest_api);

    }

    setBook(book) {

        return Axios.post(books_rest_api, book);

    }

    deleteBook(id) {

        const books_rest_api_id = books_rest_api.concat(`/${id}`);
        return Axios.delete(books_rest_api_id);

    }

    
    editBook(id, obj) {

        const books_rest_api_id = books_rest_api.concat(`/${id}`);
        return Axios.put(books_rest_api_id, {"name": obj.name});
        
    }

}

export default new BooksService();