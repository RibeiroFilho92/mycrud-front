import React, { Component } from 'react';
import Modal from 'react-modal'
import AutorService from '../services/AutorService'
import BooksService from '../services/BooksService'
import AuxButtons from './AuxButtons';
import EditButtons from './EditButtons'

class AutorTable extends Component {

     state = {
        allAutors: [],
        autors: [],
        page: 0,
        autorsPerPage: 5,
        findAutor: '',
        openNew: false,
        openEdit: false,
        openViewBooks: false,
        newName: '',
        currentId: 1,
        autorBooks:[]
    }

    componentDidMount() {
        
        AutorService.getAutors().then(response => {
            const aux = response.data;

            this.setState({
                allAutors: aux,
                autors: aux.slice(this.state.page, this.state.autorsPerPage)
            })

        })

    }

    handleLoadLessAutors = () => {

        const nextPage = this.state.page - this.state.autorsPerPage; 
        const backSelection = this.state.allAutors.slice(nextPage, nextPage + this.state.autorsPerPage);

        this.setState({
            autors: backSelection,
            page: nextPage
        })

    }

    handleLoadMoreAutors = () => {

        const nextPage = this.state.page + this.state.autorsPerPage; 
        const nextSelection = this.state.allAutors.slice(nextPage, nextPage + this.state.autorsPerPage);

        this.setState({
            autors: nextSelection,
            page: nextPage
        })

    }

    handleFindAutor = (autor) => {

        const findValue = autor.target.value;
        this.setState({
            findAutor: findValue,
        })

    }

    handleDeleteAutor = async (id) => {

        await AutorService.getBooksAutors(id).then(response => {
            const aux = response.data;
            this.setState({
                autorBooks: aux.books,
            })

        })

        await this.state.autorBooks.forEach(book => {

            BooksService.deleteBook(book.id);

        })

        AutorService.deleteAutor(id);
        window.location.reload();

    }

    handleNewAutor = () => {

        this.setState({
            openNew: true,
        });


    }

    handleEditAutor = (id) => {

        this.setState({
            openEdit: true,
            currentId: id
        });


    }

    handleTakeName = (e) => {

        const nome = e.target.value;
        this.setState({
            newName: nome
        })

    }

    handleFinalNewObject = () => {

        const name = this.state.newName;
        AutorService.setAutor({"name": name});
        window.location.reload();

    }

    handleFinalEditChange = () => {

        const id = this.state.currentId;
        const name = this.state.newName;
        AutorService.editAutor(id, {"name": name});
        window.location.reload();

    }

    handleGetBooks = (id) => {

        this.setState({openViewBooks: true});

        AutorService.getBooksAutors(id).then(response => {
            const aux = response.data;
            this.setState({
                autorBooks: aux.books,
            })

        })

    }

    handleDeleteBook = (id) => {

        BooksService.deleteBook(id);

    }

    render() {

        const noMoreNext = (this.state.page + this.state.autorsPerPage) >= this.state.allAutors.length;
        const noMoreLess = (this.state.page + this.state.autorsPerPage) <= this.state.allAutors.length;
        const filteredAutors = !!this.state.findAutor ? (this.state.allAutors.filter(autor => {
            return autor.name.toLowerCase().includes(this.state.findAutor.toLowerCase())
        })) : this.state.autors;
        let counter = 0;
   
        return(
        <section>
            <h2>Autors</h2>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Autor's name</th>
                        <th><input type="search" onChange={this.handleFindAutor} value={this.state.findAutor} /></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAutors.map(autor => {
                        return (<tr key={autor.id}>
                            <td>{autor.id}</td>
                            <td>{autor.name}</td>
                            <td>
                                <EditButtons paraClick={this.handleDeleteAutor} paraClickD={this.handleEditAutor} livros={this.handleGetBooks} idValue={autor.id}/>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
            <AuxButtons disabledMore={noMoreNext} disabledLess={noMoreLess} handleLoadMore={this.handleLoadMoreAutors} handleLoadLess={this.handleLoadLessAutors} onClickProp={this.handleNewAutor}/> 
            <Modal isOpen={this.state.openNew} className="modal-dialog"> 
                <div className="modal-content">            
                    <div className="modal-header">
                        <h5 className="modal-title">New</h5>
                        <button type="button" className="close" onClick={() => this.setState({openNew: false})}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                            <input type="text" placeholder="New name" onChange={this.handleTakeName}></input>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.handleFinalNewObject}>Submit new object</button>
                    </div>
                </div>
            </Modal>  
            <Modal isOpen={this.state.openEdit} className="modal-dialog"> 
                <div className="modal-content">            
                    <div className="modal-header">
                        <h5 className="modal-title">Edit</h5>
                        <button type="button" className="close" onClick={() => this.setState({openEdit: false})}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                            <input type="text" placeholder="New name" onChange={this.handleTakeName}></input>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.handleFinalEditChange}>Submit changes</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={this.state.openViewBooks} className="modal-dialog"> 
                <div className="modal-content">            
                    <div className="modal-header">
                        <h5 className="modal-title">Autor books</h5>
                        <button type="button" className="close" onClick={() => this.setState({openViewBooks: false})}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th colSpan="2">Book title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.autorBooks.map(book => {
                                    return (<tr key={book.id} id={counter}>
                                        <td className="d-grid gap-4 d-md-flex justify-content-md">
                                            {book.name}
                                        </td>
                                        <td>
                                        <EditButtons paraClick={this.handleDeleteBook} idValue={book.id} ativo={true} ativoBooks={true}/>
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>   
        </section>
        
        )}

}

export default AutorTable;