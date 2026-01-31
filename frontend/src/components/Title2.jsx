import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Title2 = ({
    spaceY = "py-20",
    title,
    link
}) => {
        const navigate = useNavigate()
        return (
            <section>
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${spaceY} flex flex-2 justify-between`}>
                    {/* Header */}
                    <div className="text-left mb-12">
                        <h4 className="text-4xl md:text-5xl font-bold mb-4">
                            {title}
                        </h4>
                    </div>

                    <Button 
                        onClick={() => navigate(link)}
                        className="hover:bg-accent hover:text-white">
                        Create
                    </Button>
                </div>
            </section>
        )
    }

export default Title2;