import React, { Component } from 'react';

class EditButtons extends Component {

    state = {

        id: this.props.idValue,
        ativo: this.props.ativo,
        ativoBooks: this.props.ativoBooks

    }

    handleFindIdValue = (e) => {
        
        e.stopPropagation(); 
        this.props.paraClick(this.state.id);

    }

    handleEditValue = (e) => {
        
        e.stopPropagation(); 
        this.props.paraClickD(this.state.id);
    }

    handleOpenBooks = (e) => {

        e.stopPropagation(); 
        this.props.livros(this.state.id);

    }
    
    render() {

        return(
            <div className="d-grid gap-4 d-md-flex justify-content-md">  
                <button type="button" className="btn btn-warning btn-sm" onClick={this.handleEditValue} hidden={this.state.ativo}>Edit</button>
                <button type="button" className="btn btn-danger btn-sm" onClick={this.handleFindIdValue}>Remove</button>
                <button type="button" className="btn btn-info btn-sm" onClick={this.handleOpenBooks} hidden={this.state.ativoBooks}>Books</button>
            </div>
        )

    }
}

export default EditButtons;