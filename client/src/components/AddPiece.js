import axios from 'axios';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const AddPiece = () => {
    const [title, setTitle] = useState("");
    const [composer, setComposer] = useState("");
    const [instrumentation, setInstrumentation] = useState("");
    const [length, setLength] = useState("");
    const [description, setDescription] = useState("");
    const [opus, setOpus] = useState("");
    const [link, setLink] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/piece", {title, composer, instrumentation, length, description, opus, link})
        .then((response) => {
            console.log(response);
            navigate("/");
        })
        .catch((err) => {
            console.log(err.response.data.err.errrors);
            setErrors(err.response.data.err.errors);
        });
    };

    return (
        <div className = "container">
            <div className = "row">
                <h1 className = "col-sm-11">Welcome to Jacob's Song Tracker!</h1>
                <Link to = "/" className = "col-sm-1">Return to Home Page</Link>
                <h2>Want to add a new piece of music to our list? You can do so here! Just fill out the form below.</h2>
            </div>
            <br/>
            <form onSubmit = {handleSubmit} className = "form">
                <div className = "child">
                    <div className = "form-group">
                        <label htmlFor = "title">Song/Piece Title:</label>
                        <input type = "text" value = {title} className = "form-control" onChange = {(e) => setTitle(e.target.value)}/>
                        {errors.title ? <h2 className = "error">{errors.title.message}</h2> : null}
                    </div>
                    
                    <div className = "form-group">
                        <label htmlFor = "composer">Song/Piece Composer:</label>
                        <input type = "text" value = {composer} className = "form-control" onChange = {(e) => setComposer(e.target.value)}/>
                        {errors.composer ? <h2 className = "error">{errors.composer.message}</h2> : null}
                    </div>
                    
                    <div className = "form-group">
                        <label htmlFor = "instrumentation">Song/Piece Instrumentation:</label>
                        <input type = "text" value = {instrumentation} className = "form-control" onChange = {(e) => setInstrumentation(e.target.value)}/>
                        {errors.instrumentation ? <h2 className = "error">{errors.instrumentation.message}</h2> : null}
                    </div>
                    
                    <div className = "form-group">
                        <label htmlFor = "length">Song/Piece Length (in minutes):</label>
                        <input type = "number" value = {length} className = "form-control" onChange = {(e) => setLength(e.target.value)}/>
                        {errors.length ? <h2 className = "error">{errors.length.message}</h2> : null}
                    </div>
                    
                    <div className = "form-group">
                        <label htmlFor = "description">Describe your song/piece (optional):</label>
                        <input type = "text" value = {description} className = "form-control" onChange = {(e) => setDescription(e.target.value)}/>
                    </div>
                    
                    <div className = "form-group">
                        <label htmlFor = "opus">Catalog/Opus number of song/piece (optional):</label>
                        <input type = "text" value = {opus} className = "form-control" onChange = {(e) => setOpus(e.target.value)}/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor = "link">Add a YouTube link of your song (optional):</label>
                        <input type = "text" value = {link} className = "form-control" onChange = {(e) => setLink(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <button className = "btn btn-primary" type = "submit">Add New Piece to the list!</button>
            </form>
        </div>
    );
};

export default AddPiece;