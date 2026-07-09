/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';


const truncate = (str = '', max=60) => {
    str.length > max ? str.slice(0, max).trimEnd() + '...' : str;
}

const SkeletonCard = () => (
    <div className='relative flex-shrink-0 w-56 md:w-64 h-80 md:h-96 rounded-2xl overflow-hidden bg-gray-200 animate-pulse'></div>
)

const DestinationCard = ({ destination, onClick}) => {
    const {
        name,
        slug,
        images = [],
        // description = '',
        // location = {},
        // tags = [],
    } =destination;

    const imageUrl = images?.url || '/placeholder.jpg';
    
    return (
        <Button
            type='button'
            onClick={() => onClick?.(slug || destination._id)}
            className='relative flex-shrink-0 w-56 md:2-64 h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2'
            aria-label={`Lihat destinasi ${name}`}>

            <img src={imageUrl} alt={name}  
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105'
                loading="lazy"/>

            {/* overlat gradient */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent'/>

            <div className='absolute bottom-0 left-0 right-0 p-4 text-left'>
                <h3 className='text-white text-lg md:text-xl font-semibold leading-tight'>
                    {truncate(name, 40)}
                </h3>
            </div>
            
        </Button>
    )
}

const DestinationCarousel = ({
    destinations = [],
    loading      = false,
    error        = '',
    title        = 'Destinasi Banyuwangi',
    onCardClick,
}) => {
    const trackRef = useRef(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const SCROLL_BY = 280;

    const updateButtons = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setCanPrev(el.scrollLeft > 8);
        setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    })

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        updateButtons();
        el.addEventListener('scroll', updateButtons, { passive: true});
        return () => el.removeEventListener('scroll', updateButtons);
    }, [updateButtons, destinations]);

    const scrollTo = (dir) => {
        trackRef.current?.scrollBy({
            left: dir === 'prev' ? -SCROLL_BY : SCROLL_BY,
            behavior: 'smooth',
        })
    }

    const isEmpty = !loading && !error && destinations.length === 0;

    return (
        <section className='py-10 md:py-14'>
            <div className="px-6 md:px-10 lg:px-6 mb-6 flex items-end justify-between gap-4">
                <h2 className='text-2xl md:text-3xl font semibold text-foreground leading-tight'> 
                    {title}
                </h2>

                {!loading && !error && destinations.length > 0 && (
                    <div className='flex items-center gap-2 flex-shrink-0'>
                        <Button
                            type="button"
                            onClick={() => scrollTo('prev')}
                            disabled={!canPrev}
                            aria-label='Sebelumnya'
                            className='w-9 h-9 rounded-full border border-border flex items-center
                            justify-center bg-background hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors'>
                                <ChevronLeft className='w-4 h-4'/>
                        </Button>

                        <Button
                            type="button"
                            onClick={() => scrollTo('next')}
                            disabled={!canNext}
                            aria-label='Sebelumnya'
                            className='w-9 h-9 rounded-full border border-border flex items-center
                            justify-center bg-background hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors'>
                                <ChevronRight className='w-4 h-4'/>
                        </Button>
                    </div>
                )}
            </div>

            {/* Error state */}
            {error && (
                <div className="px-6 md:px-10 lg:px-16 text-sm text-red-500">
                    Gagal memuat destinasi: {error}
                </div>
            )}
 
            {/* Empty state */}
            {isEmpty && (
                <div className="px-6 md:px-10 lg:px-16 text-sm text-muted-foreground">
                    Belum ada destinasi tersedia.
                </div>
            )}

            {/* Carousel track */}
            {(loading || destinations.length > 0) && (
                <div
                    ref={trackRef}
                    className="
                        flex gap-3 md:gap-4
                        overflow-x-auto scroll-smooth
                        px-6 md:px-10 lg:px-16
                        pb-2
 
                        /* Sembunyikan scrollbar tapi tetap bisa di-scroll */
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                    "
                    role="list"
                    aria-label={title}
                >
                    {loading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))
                        : destinations.map((dest) => (
                            <div key={dest._id || dest.slug} role="listitem">
                                <DestinationCard
                                    destination={dest}
                                    onClick={onCardClick}
                                />
                            </div>
                        ))
                    }
                </div>
            )}
        </section>
    )
}

export default DestinationCarousel;