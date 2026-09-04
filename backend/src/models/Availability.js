import mongoose from "mongoose";

const AvailabilitySchema = new mongoose.Schema(
    {
        accomodation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Accomodations',
            required: true,
        },
        room_type: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        date: {type: Date, required: true},
        total_units: {type: Number, required: true, min: 0},
        booked_units: {type: Number, required: true, min: 0, default: 0},
        held_units: {type: Number, required: true, default: 0, min: 0}, //status unit pending 
        is_blocked: {type: Boolean, default: false}, //status unit yang maintenance
        block_reason: {type: String},
        price_overide: {type: Number, min: 0},
    }, {timestamps: true}
)

AvailabilitySchema.index({ room_type: 1, date: 1}, {unique: true});
AvailabilitySchema.index({ accomodation: 1, date: 1});

AvailabilitySchema.virtual("available_units").get(function () {
    if (this.is_blocked) return 0;
    return Math.max(this.total_units - this.booked_units - this.held_units, 0);
});

AvailabilitySchema.set('toJSON', {virtuals: true})
AvailabilitySchema.set('toObject', {virtuals: true})

export default mongoose.model('Availability', AvailabilitySchema)