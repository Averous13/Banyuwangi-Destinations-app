import mongoose from "mongoose";

const PriceSnapshotSchema = new mongoose.Schema(
    {
        price_per_night: { type: Number, required: true, min: 0},
        nights: { type: Number, required: true, min: 1},
        subtotal: { type: Number, required: true, min: 0},
        tax: { type: Number, required: true, min: 0},
        service_fee: { type: Number, default: 0},
        discount: { type: Number, default: 0},
        total: { type: Number, required: true, min: 0},
        currency: { type: String, default: 'IDR'}
    }, {_id: false}
)

const GuestInfoSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        total_guests: {type: Number, default: 1},
        notes: {type: String},
    }, {_id: false}
)

const PaymentSchema = new mongoose.Schema(
    {
        method: {
            type: String,
            enum: ["bank_transfer", "e_wallet", "cash", "virtual_account", "credit_card"],
        },
        provider: { type: String },
        transaction_id: { type: String},
        status: {
            type: String,
            enum: ['unpaid', 'pending', 'paid', 'failed', 'refunded'],
            default: 'unpaid',
        },
        paid_at: { type: Date},
        amount_paid: {type: Number, default: 0}
    },
    {_id: false}
)

const CancellationSchema = new mongoose.Schema(
    {
        cancelled_at: {type: Date},
        cancelled_by: {
            type: String,
            enum: ['guest', 'owner', 'system', 'admin']
        },
        reason: {type: String, required: true},
        refund_amount: {type: Number, default: 0},
        refund_status: {
            type: String,
            enum: ['not_applicable', 'pending', 'processed', 'rejected'],
        },
    }, {_id: false}
)

const BookingSchema = new mongoose.Schema(
    {
        accommodation: { type: mongoose.Schema.Types.ObjectId, ref: "Accomodations", required: true },
        room_type: { type: mongoose.Schema.Types.ObjectId, required: true},
        room_type_snapshot: {
            name: {type: String, required: true},
            bed_type: {type: String},
        },
        guest: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        guest_info: {type: GuestInfoSchema, required: true},
        check_in: {type: Date, required: true},
        check_out: {
            type: Date,
            required: true,
            validate: {
                validator: function (v) {
                    return v > this.check_in
                },
            message: "Error: check out harus setelah check in",
            }},
        booking_code: {type: String, required: true, unique: true},
        units_booked: {type: Number, required: true, default: 1, min: 1},
        price: {type: PriceSnapshotSchema, required: true},
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'expired', ],
            default: 'pending',
        },
        payment: {type: PaymentSchema, required: true},
        cancellation: {type: CancellationSchema},
        expires_at: {type: Date},
    }, {timestamps: true}
);

BookingSchema.index({ room_type: 1, check_in: 1, check_out: 1});
BookingSchema.index({ accommodation: 1, status: 1});
BookingSchema.index({ guest: 1, created_at: -1});
BookingSchema.index({ booking_code: 1}, {unique: true});

export default mongoose.model("Booking", BookingSchema);