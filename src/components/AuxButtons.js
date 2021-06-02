import React, { Component } from 'react';

class AuxButtons extends Component {

    render() {

        return(            
            <section className="d-grid gap-2 d-md-flex justify-content-md">
                <button type="button" className="btn btn-primary btn-lg" onClick={this.props.onClickProp}>New</button>
                <button type="button" className="btn btn-primary btn-lg" onClick={this.props.handleLoadLess} disabled={this.props.disabledLess}>Back</button>
                <button type="button" className="btn btn-primary btn-lg" onClick={this.props.handleLoadMore} disabled={this.props.disabledMore}>Next</button>
            </section>
        )}

}

export default AuxButtons;