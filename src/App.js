import './App.css';
import BookTable from './components/BookTable';
import AutorTable from './components/AutorTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container-fluid">
        <h1>Book controller system</h1>
        <section className="table-spacement">
          <BookTable />
        </section>
        <section className="table-spacement">
          <AutorTable />
        </section>
    </div>
  );
}

export default App;
