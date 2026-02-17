import { Button } from "./ui/button";

const Title2 = ({
    spaceY = "pt-20",
    title,
    children
}) => {
        return (
            <section>
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${spaceY} flex flex-2 justify-between`}>
                    {/* Header */}
                    <div className="text-left mb-12">
                        <h4 className="text-4xl md:text-5xl font-bold mb-4">
                            {title}
                        </h4>
                    </div>

                    {children}

                </div>
            </section>
        )
    }

export default Title2;