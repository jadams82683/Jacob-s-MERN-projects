const Piece = require("../models/piece.model")

const createPiece = (req, res) => {
    Piece.create(req.body)
    .then((newPiece) => {
        res.json({newPiece});
    })
    .catch((err) => {
        res.status(400).json({err});
    });
};

const getAllPieces = (req, res) => {
    Piece.find()
    .then((allPieces) => {
        res.json(allPieces);
    })
    .catch((err) => {
        res.status(400).json({err});
    });
};

const getOnePiece = (req, res) => {
    Piece.findOne({_id: req.params.id})
    .then((queriedPiece) => {
        res.json(queriedPiece);
    })
    .catch((err) => {
        res.status(400).json({err});
    });
};

const updatePiece = (req, res) => {
    Piece.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true,
    })
    .then((updatedPiece) => {
        res.json({updatedPiece});
    })
    .catch((err) => {
        res.status(400).json({err});
    });
};

const deletePiece = (req, res) => {
    Piece.deleteOne({_id: req.params.id})
    .then((deletedPiece) => {
        res.json({deletedPiece});
    })
    .catch((err) => {
        res.status(400).json({err});
    });
};

module.exports = {
    getAllPieces,
    createPiece,
    getOnePiece,
    updatePiece,
    deletePiece,
};