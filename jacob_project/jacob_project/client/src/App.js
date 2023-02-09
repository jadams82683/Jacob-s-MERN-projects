import './App.css';
import {BrowserRoute, Routes, Route, BrowserRouter} from 'react-router-dom';
import DisplayPieces from './components/DisplayPieces';
import AddPiece from './components/AddPiece';
import EditPiece from './components/EditPiece';
import ShowPiece from './components/ShowPiece';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<DisplayPieces/>}/>
          <Route path = "/new" element = {<AddPiece/>}/>
          <Route path = "/edit/:id" element = {<EditPiece/>}/>
          <Route path = "/show/:id" element = {<ShowPiece/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  );
};

export default App;

