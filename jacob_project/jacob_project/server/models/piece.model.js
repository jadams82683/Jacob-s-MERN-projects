const mongoose = require("mongoose");

const PieceSchema = {

    title: {
        type: String,
        required: [true, "Title of piece is required!"],
        minLength: [2, "Title of piece must be at least 2 characters!"]
    },

    composer: {
        type: String,
        required: [true, "Composer of piece is required!"],
        minLength: [2, "Composer of piece must be at least 2 characters!"]
    },

    instrumentation: {
        type: String,
        required: [true, "Instrumentation is required!"],
        minLength: [3, "Instrumentation must be at least 3 characters!"]
    },

    length: {
        type: Number,
        required: [true, "Length is required!"]
    },

    description: {
        type: String,
        required: [false]
    },

    opus: {
        type: String,
        required: [false]
    },

    link: {
        type: String,
        required: [false]
    }
};

module.exports = mongoose.model("Piece", PieceSchema);