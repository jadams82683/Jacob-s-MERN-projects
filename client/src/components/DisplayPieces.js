import {useEffect, useState} from 'react';
import axios from 'axios';
import "../App.css";
import {Link} from 'react-router-dom';
import YoutubeEmbed from './YouTubeEmbed';

const DisplayPieces = () => {
    const [allPieces, setAllPieces] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/piece")
        .then((response) => {
            console.log(response.data);
            setAllPieces(response.data);
        })
        .catch((err) => {
            console.log(err.reponse);
        });
    }, []);

    return (
        <div className = "container" id = "home">
            <div className = "row">
                <h1 className = "heading">Welcome to Jacob's Song Tracker!</h1>
                <Link to = "/new" id = "link"> Want to add a new song/piece to your list? Click here!</Link>
            </div>
            <br/>
            <h2 className = "sub_heading">The perfect place to keep track of all of your favorite music.</h2>
            <br/>
            <table className = "table">
                <thead>
                    <tr className = "head">
                        <th scope = "col">Title of Composition</th>
                        <th scope = "col">Composer/Artist</th>
                        <th scope = "col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allPieces.map((piece, index) => {
                        return (
                            <tr className = "tbody" key = {piece._id}>
                                <td>{piece.title}</td>
                                <td>{piece.composer}</td>
                                <td>
                                    <Link to = {`/show/${piece._id}`} className = "link">View Details</Link> |  
                                    <Link to = {`/edit/${piece._id}`} className = "link">Edit Piece</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>   
            <YoutubeEmbed/>
        </div>
    )
};

export default DisplayPieces;