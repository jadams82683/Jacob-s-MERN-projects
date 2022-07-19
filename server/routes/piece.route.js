const pieceController = require("../controllers/piece.controller");

module.exports = (app) => {
    app.post("/api/piece", pieceController.createPiece);
    app.get("/api/piece", pieceController.getAllPieces);
    app.get("/api/piece/:id", pieceController.getOnePiece);
    app.put("/api/piece/:id", pieceController.updatePiece);
    app.delete("/api/piece/:id", pieceController.deletePiece);
};