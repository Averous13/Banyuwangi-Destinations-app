import Destination from "../models/Destinations.js";

class DestinationController{
    static async createDestination(req, res){
        try {
            const {
                name,
                category,
                description,
                image,
                location,
                contacts,
                tags
            } = req.body;

            const destination = new Destination({
                name,
                category,
                description,
                image,
                location,
                contacts,
                tags
            });

            const savedDestination = await destination.save()
            res.status(201).json({message: "Destination created successfully", savedDestination});

        } catch (error) {
            console.error('Error Creating destination: ', error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    static async getAllDestination(req, res){
        try {
            const destinations = await Destination.find();
            res.status(200).json({destinations})
        } catch (error) {
            console.error("Error fetching data: ", error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    static async getDestinationById(req, res){
        try {
            const destination = await Destination.findById(req.params.id);
            if (!destination){
              return res.status(404).json({message: "Destination not found"})
            } 
            res.status(200).json(destination);
        } catch(error) {
            console.error('Error fetching data:', error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    static async updateDestination(req, res){
        try {
            const {
                name,
                category,
                description,
                image,
                locations,
                contacts,
                tags
            } = req.body
            const updatedDestination = await Destination.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    category,
                    description,
                    image,
                    locations,
                    contacts,
                    tags
                }, {new: true});
            if (!updatedDestination){
                return res.status(404).json({message: "Destination not found"})
            } 
            res.status(200).json({message: "destination updated successfully",data: updatedDestination});
        } catch (error) {
            console.error("Error fetching data", error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    static async deleteDestinations(req, res){
        try{
            const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
            if(!deletedDestination){
                res.status(404).json({message: "Destination not found"});
            }
            res.status(200).json({message: "Destination deleted successfully"});
        } catch(error){
            console.error('Error deleting data:', error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }



    
}

export default DestinationController;




