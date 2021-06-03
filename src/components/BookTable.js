import React, { Component } from 'react';
import BooksService from '../services/BooksService';
import AuxButtons from './AuxButtons';
import EditButtons from './EditButtons'
import Modal from 'react-modal'

class BookTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allBooks: [],
            books:[],
            page: 0,
            booksPerPage: 5,
            findBook: '',
            openNew: false,
            openEdit: false,
            newName: '',
            currentId: 1
        }

    }

    componentDidMount() {

        BooksService.getBooks().then(response => {
            const aux = response.data;
            this.setState({
                allBooks: aux,
                books: aux.slice(0, 5)
            })
        });

    }

    handleLoadLessBooks = () => {
        const nextPage = this.state.page - this.state.booksPerPage; 
        const backSelection = this.state.allBooks.slice(nextPage, nextPage + this.state.booksPerPage);

        this.setState({
            books: backSelection,
            page: nextPage
        })

    }

    handleLoadMoreBooks = () => {
        const nextPage = this.state.page + this.state.booksPerPage; 
        const nextSelection = this.state.allBooks.slice(nextPage, nextPage + this.state.booksPerPage);

        this.setState({
            books: nextSelection,
            page: nextPage
        })

    }

    handleFindBook = (event) => {
        const findValue = event.target.value;
        this.setState({
            findBook: findValue,
        })
    }

    handleDeleteBook(id) {

        BooksService.deleteBook(id);
        window.location.reload();

    }

    handleNewBook = () => {

        this.setState({
            openNew: true,
        });


    }

    handleEditBook = (id) => {

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
        BooksService.setBook({"name": name});
        window.location.reload();

    }

    handleFinalEditChange = () => {

        const id = this.state.currentId;
        const name = this.state.newName;
        BooksService.editBook(id, {"name": name});
        window.location.reload();

    }

    render() {
        const noMoreNext = (this.state.page + this.state.booksPerPage) >= this.state.allBooks.length;
        const noMoreLess = (this.state.page + this.state.booksPerPage) <= this.state.allBooks.length;
        const filteredBooks = !!this.state.findBook ? (this.state.allBooks.filter(book => {
            return book.name.toLowerCase().includes(this.state.findBook.toLowerCase())
        })) : this.state.books;

        return(
        <section>
            <h2>Books</h2>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Book name</th>
                        <th><input className="form-control" placeholder="Search" type="search" onChange={this.handleFindBook} value={this.state.findBook} /></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map(book => {
                        return (<tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>
                                <EditButtons paraClick={this.handleDeleteBook} paraClickD={this.handleEditBook} idValue={book.id} ativoBooks={true}/>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
            <AuxButtons disabledMore={noMoreNext} disabledLess={noMoreLess} handleLoadMore={this.handleLoadMoreBooks} handleLoadLess={this.handleLoadLessBooks} onClickProp={this.handleNewBook}/>  
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
        </section>
        
        )}

}

export default BookTable;