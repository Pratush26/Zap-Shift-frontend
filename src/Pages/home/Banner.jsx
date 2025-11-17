import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import Autoplay from 'embla-carousel-autoplay'
import Banner1 from './banner/banner1.png'
import Banner2 from './banner/banner2.png'
import Banner3 from './banner/banner3.png'

export default function BannerSection() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Fade(), Autoplay()])
    return (
        <div className='embla'>
            <section className='my-6 embla__viewport' ref={emblaRef}>
                <div className="embla__container">
                    <img src={Banner1} alt="banner" className='w-full h-auto' />
                    <img src={Banner2} alt="banner" className='w-full h-auto' />
                    <img src={Banner3} alt="banner" className='w-full h-auto' />
                </div>
            </section>
        </div>
    )
}