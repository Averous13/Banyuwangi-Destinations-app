import mongoose from "mongoose"

const destinationsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 30
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        long: Number,
        lat: Number
    },
    contacts: [String],
    tags: [String]
 }, {timestamps: true}
);

const Destination = mongoose.model('Destination', destinationsSchema);

export default Destination;