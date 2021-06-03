import './App.css';
import BookTable from './components/BookTable';
import AutorTable from './components/AutorTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container-fluid">
        <section className="">
          <h1 className="card-header">Book controller system</h1>
          <section className="table-spacement card-body">
            <BookTable />
          </section>
          <section className="table-spacement card-body">
            <AutorTable />
          </section>
        </section>
        <section className="card-footer">
        <ul className="list-inline d-grid gap-4 d-md-flex justify-content-lg"> 
          <li className="list-inline-item"><h5>Simple Crud project</h5></li>
          <li className="list-inline-item"><h5>Developed by <span><a href="https://github.com/RibeiroFilho92" target="_blank" without rel="noreferrer">José Ribeiro</a></span></h5></li>
        </ul>
        </section>
    </div>
  );
}

export default App;
