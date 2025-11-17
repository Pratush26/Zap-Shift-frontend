import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import Logo1 from './brands/amazon.png'
import Logo2 from './brands/amazon_vector.png'
import Logo3 from './brands/casio.png'
import Logo4 from './brands/moonstar.png'
import Logo5 from './brands/randstad.png'
import Logo6 from './brands/star.png'
import Logo7 from './brands/start_people.png'

export default function LogoSlider() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoScroll()])
    return (
        <div className='embla'>
            <section className='my-6 embla__viewport' ref={emblaRef}>
                <div className="embla__container">
                    <img src={Logo1} alt="brands contributions" className='m-7 h-8 w-fit' />
                    <img src={Logo2} alt="brands contributions" className='m-7 h-8 w-fit' />
                    <img src={Logo3} alt="brands contributions" className='m-7 h-8 w-fit' />
                    <img src={Logo4} alt="brands contributions" className='m-7 h-8 w-fit' />
                    <img src={Logo5} alt="brands contributions" className='m-7 h-8 w-fit' />
                    <img src={Logo6} alt="brands contributions" className='m-7 h-8 w-fit' />
                    <img src={Logo7} alt="brands contributions" className='m-7 h-8 w-fit' />
                </div>
            </section>
        </div>
    )
}