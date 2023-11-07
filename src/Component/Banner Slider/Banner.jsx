import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../images/HomeBanner/img1.jpg';
import img2 from '../../images/HomeBanner/img2.png';
import img3 from '../../images/HomeBanner/img3.png';
import img4 from '../../images/HomeBanner/img4.png';
import "./Banner.css"

const Banner = () => {
  const images = [
    {
      imgSrc: img1,
      title: 'Library Management',
      buttonText: 'Learn More',
    },
    {
      imgSrc: img2,
      title: 'Discover Books',
      buttonText: 'Browse Library',
    },
    {
      imgSrc: img3,
      title: 'Borrow and Return',
      buttonText: 'Get Started',
    },
    {
      imgSrc: img4,
      title: 'Online Catalog',
      buttonText: 'Explore Catalog',
    },
];

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings} className=' pt-[20px]'>
      {images.map((image, index) => (
        <div key={index} className="carousel-item relative w-full rounded-lg overflow-hidden">
          <img src={image.imgSrc} className="w-full z-20 h-[80vh] object-cover rounded-lg" />
          <div className="hero-overlay absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-800 to-blue-300 opacity-60"></div>
          <div className="absolute flex justify-center items-center inset-0">
            <div className="text-white text-5xl text-center font-serif">
              <h1 className="text-2xl md:text-6xl lg:text-8xl text-white">{image.title}</h1>
              <p className="mt-3">
                {image.buttonText && (
                  <button className="btn bg-gradient-to-r from-purple-800 to-blue-300 border-2 border-white md:text-xl text-white font-bold">{image.buttonText}</button>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
