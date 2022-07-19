import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import "../App.css";

const ShowPiece = (props) => {
    const {id} = useParams();
    const [allPieces, setAllPieces] = useState([]);
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

    const handleDeletePiece = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/piece/${idFromBelow}`)
        .then((response) => {
            console.log("Success deleting piece.");
            console.log(response);
            const filteredPieces = allPieces.filter((piece) => {
                return piece._id !== idFromBelow;
            });
            setAllPieces(filteredPieces);
            navigate("/");
        })
        .catch((err) => {
            console.log("There was an error attempting to delete piece.")
        });
    };

    return (
        <div className = "container">
            <div className = "row">
                <h1 className = 'head'>Jacob's Song Tracker</h1>
                <Link to = "/" id = "link">Back to home page</Link>
            </div>
            <br/>
            <div className = "row">
                <h2>Here are some details about {pieceTitle}</h2>
            </div>
            <br/>
            <table className = "table">
                <h3>Composer/Artist: {pieceComposer}</h3>
                <br/>
                <h3>Piece Instrumentation: {pieceInstrumentation}</h3>
                <br/>
                <h3>Piece length in minutes: {pieceLength}</h3>
                <br/>
                <h3>Description of Piece/Song: {pieceDescription}</h3>
                <br/>
                <h3>Catalog or opus number of piece/song: {pieceOpus}</h3>
                <br/>
                <h4 className = "link"><a href = {pieceLink}>YouTube link of song:</a></h4>
            </table>
            <button onClick = {(e) => handleDeletePiece(id)} className = "btn btn-danger">Not a fan anymore? Click here to remove - {pieceTitle}</button>
        </div>
    
    );
};

export default ShowPiece;