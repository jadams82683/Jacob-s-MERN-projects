import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';

const EditPiece = (props) => {
    const {id} = useParams();
    const [pieceTitle, setPieceTitle] = useState("");
    const [pieceComposer, setPieceComposer] = useState("");
    const [pieceInstrumentation, setPieceInstrumentation] = useState("");
    const [pieceLength, setPieceLength] = useState("");
    const [pieceDescription, setPieceDescription] = useState("");
    const [pieceOpus, setPieceOpus] = useState("");
    const [pieceLink, setPieceLink] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [pieceNotFoundError, setPieceNotFoundError] = useState("");
    console.log(id);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/piece/${id}`)
        .then((response) => {
            console.log(response.data);
            setPieceTitle(response.data.title);
            setPieceComposer(response.data.composer);
            setPieceInstrumentation(response.data.instrumentation);
            setPieceLength(response.data.length);
            setPieceDescription(response.data.description);
            setPieceOpus(response.data.opus);
            setPieceLink(response.data.link);
        })
        .catch((err) => {
            console.log(err.response);
            setPieceNotFoundError(`Piece not found using that ID.`)
        });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/piece/${id}`, {title: pieceTitle, composer: pieceComposer, instrumentation: pieceInstrumentation, length: pieceLength, description: pieceDescription, opus: pieceOpus})
        .then((response) => {
            console.log(response);
            navigate("/");
        })
        .catch((err) => {
            console.log(err.response.data.err.errors);
            setErrors(err.response.data.err.errors);
        });
    };

    return (
        <div>
            {pieceNotFoundError ? (
                <h2>{pieceNotFoundError}<Link to = "/new">Click here to add a new piece to the list.</Link></h2>
            ) : null}
            <div>
                <h1>Jacob's Song Tracker</h1>
                <Link to = "/">Return to the home page</Link>
                <h2>Edit {pieceTitle}</h2>
            </div>
            <form onSubmit = {submitHandler} className = "form">
                <div className = "child">
                    <div className = "form-group">
                        <label htmlFor = "title">Song/Piece Title:</label>
                        <input type = "text" value = {pieceTitle} id = "title" onChange = {(e) => setPieceTitle(e.target.value)}/>
                        {errors.title ? <h2 className = "error">{errors.title.message}</h2> : null}
                    </div>
                    
                    <div className = "form-group">
                        <label htmlFor = "composer">Song/Piece Composer:</label>
                        <input type = "text" value = {pieceComposer} id = "composer" onChange = {(e) => setPieceComposer(e.target.value)}/>
                        {errors.composer ? <h2 className = "error">{errors.composer.message}</h2> : null}
                    </div>
                    
                    <div className = "form-group">
                        <label htmlFor = "instrumentation">Song/Piece Instrumentation:</label>
                        <input type = "text" value = {pieceInstrumentation} id = "instrumentation" onChange = {(e) => setPieceInstrumentation(e.target.value)}/>
                        {errors.instrumentation ? <h2 className = "error">{errors.instrumentation.message}</h2> : null}
                    </div>
                    
                    <div className = "form-group">
                        <label htmlFor = "length">Song/Piece Length (in minutes):</label>
                        <input type = "number" value = {pieceLength} id = "length" onChange = {(e) => setPieceLength(e.target.value)}/>
                        {errors.length ? <h2 className = "error">{errors.length.message}</h2> : null}
                    </div>
                    
                    <div className = "form-group">
                        <label htmlFor = "description">Song/Piece Description (optional):</label>
                        <input type = "text" value = {pieceDescription} id = "description" onChange = {(e) => setPieceDescription(e.target.value)}/>
                    </div>
                    
                    <div className = "form-group">
                        <label htmlFor = "opus">Song/Piece Catalog or Opus Number (optional):</label>
                        <input type = "text" value = {pieceOpus} id = "title" onChange = {(e) => setPieceOpus(e.target.value)}/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor = "link">Add a YouTube link of your song (optional):</label>
                        <input type = "text" value = {pieceLink} id = "title" onChange = {(e) => setPieceLink(e.target.value)}/>
                    </div>
                    <br/>
                    <button type = "submit" className = "btn btn-primary">Edit Song/Piece Info</button>
                </div>
            </form>
        </div>
    );
};

export default EditPiece;