import Header from '../components/Header'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import heroImg from "@assets/images/pexels-ferli-3766560.webp";




const HomePage = () => {
    return (
        <>
            <Header />
            <Hero
                title="DEAR SUNRISE"
                subtitle="For you, who smiles like the sun, this story begins."
                ctaText='Visit'
                ctaLink='#'
                backgroundImage={heroImg} />

        </>

    )
}

export default HomePage