import { Button } from "@/components/ui/button";

const Hero2 = ({src, title="Banyuwangi"}) => {
    return (
        <section id="hero" className="relative h-[70vh] min-h-[500px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src={src} 
                    alt="Kawah Ijen"
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay - Ijen Navy Theme */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--ijen-navy)]/90 via-[var(--ijen-navy)]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
                <div className="max-w-3xl space-y-6 animate-fadeIn">

                    {/* Main Heading */}
                    <h1 className="text-white drop-shadow-2xl">
                        Explore
                        <br />
                        <span className="text-[var(--ijen-cyan)]">{title}</span>
                    </h1>



                </div>
            </div>

        </section>
    );
};

export default Hero2;