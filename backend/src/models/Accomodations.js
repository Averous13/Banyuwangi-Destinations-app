import mongoose from "mongoose";
import ImageSchema from "./Image.js";

const CoordinatesSchema = new mongoose.Schema(
  
    {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      validate: {
        validator: (v) => v.length === 2,
        message: "Coordinates harus berupa [longitude, latitude]",
      },
    },
  },
  { _id: false }
);

CoordinatesSchema.path("coordinates").validate(function (v) {
  const [lng, lat] = v;
  // Bounding box kasar Kabupaten Banyuwangi
  const isWithinBanyuwangi = 
    lng >= 113.7 && lng <= 114.5 && 
    lat >= -8.8 && lat <= -7.9;
  return isWithinBanyuwangi;
}, "Koordinat harus berada dalam wilayah Banyuwangi");

const LocationSchema = new mongoose.Schema({
    address: { type: String, required: true},
    village: { type: String, required: true},
    district: { 
        type: String,
        required: true,
        enum: [
            "Banyuwangi", "Giri", "Glagah", "Kalipuro", "Licin",
            "Songgon", "Rogojampi", "Kabat", "Singojuruh", "Wongsorejo",
            "Sempu", "Genteng", "Srono", "Cluring", "Gambiran",
            "Tegalsari", "Muncar", "Purwoharjo", "Bangorejo", "Siliragung",
            "Pesanggaran", "Tegaldlimo", "Kalibaru", "Glenmore",
        ]
    },
    coordinates: { type: CoordinatesSchema, required: true},
},  { _id: false})

const RoomTypeSchema = new mongoose.Schema({
    name: {type: String}, 
    price: {type: Number, required: true},
    capacity: {type: Number, required: true},
    quantity: {type: String, required: true},
    bed_type: {
        type: String,
        enum: ["Single", "Twin", "Queen", "King", "Double", "Dorm"],
        default: "Single"
    },
    facilities: { type: [String], required: true},
},{_id: true})

const PriceSchema = new mongoose.Schema({
    min: {type: Number, required: true, min: 0},
    max: {type: Number, required: true, min: 0},
    currency: { type: String, default: "IDR"}
}, 
{_id: false})

const OtherSchema = new mongoose.Schema({
    label: {type: String, required: true},
    desc: {type: String, required: true}
},{_id: false})

const PoliciesSchema = new mongoose.Schema({
    check_in: {type: String, required: true, default: "13.00"},
    check_out: {type: String, required: true, default: "12.00"},
    cancellation: {type: String, required: true},
    is_smoking: {type: Boolean, required: true, default: false},
    document: {type: String},
    early_check_in: {type: String},
    late_check_out: {type: String},
    is_pet_allowed: {type: Boolean, required: true, default: false},
    other: { type: [OtherSchema]}
},{_id: false})

const FacilityItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String }, // optional (misal: "wifi", "tv")
}, { _id: false });

const AccomodationsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    }, 
    type: {
        type: String,
        enum: ['Homestay', 'Villa', 'Guest House', 'Hotel']
    },
    location: {
        type: LocationSchema,
        required: true
    },
    priceRange: {
        type: PriceSchema,
        required: true
    },
    roomType: {
        type: [RoomTypeSchema],
        required: true,
        validate: {
            validator: (v) => v.length > 0,
            message: "Minimal harus ada 1 tipe kamar",
      },
    },
    facilities: {
        room: [FacilityItemSchema],
        service: [FacilityItemSchema],
        connectivity: [FacilityItemSchema],
        nearby: [FacilityItemSchema],
        eatery: [FacilityItemSchema],
        common: [FacilityItemSchema],
        entertainment: [FacilityItemSchema],
        other: [FacilityItemSchema]
    },
    images: {
        type: [ImageSchema],
        required: true,
        validate: {
            validator: (v) => v.length > 0,
            message: "Minimal harus ada 1 gambar",
        },
    },
    policies: {
        type: PoliciesSchema,
        required: true
    },
    isActive: { type: Boolean, default: true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true})

AccomodationsSchema.index({ slug: 1 }, { unique: true });
AccomodationsSchema.index({ type: 1 });
AccomodationsSchema.index({ "location.village": 1, "location.district": 1 });
AccomodationsSchema.index({ "location.coordinates": "2dsphere" }); // untuk geo query (cari akomodasi terdekat)
AccomodationsSchema.index({ is_active: 1 });

export default mongoose.model("Accomodations", AccomodationsSchema);