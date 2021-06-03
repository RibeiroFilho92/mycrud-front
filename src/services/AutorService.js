import Axios from 'axios';

const autors_rest_api = 'http://localhost:8080/autors';

class AutorsService {

    getAutors() {

        return Axios.get(autors_rest_api);

    }

    getBooksAutors(id) {

        return Axios.get(autors_rest_api.concat(`/${id}`));

    }

    setAutor(autor) {

        return Axios.post(autors_rest_api, autor);

    }

    deleteAutor(id) {

      return Axios.delete(autors_rest_api.concat(`/${id}`));

    }

    editAutor(id, obj) {

        const autors_rest_api_id = autors_rest_api.concat(`/${id}`);
        return Axios.put(autors_rest_api_id, {"name": obj.name});
        
    }

}

export default new AutorsService();