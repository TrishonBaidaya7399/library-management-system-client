// import PropTypes from 'prop-types';

const AboutPart = () => {
    return (
<div className="hero min-h-[80vh] font-serif mt-12">
  <div className="hero-content flex-col lg:flex-row gap-12">
    <div className="lg:w-1/2">
    <img src="https://i.ibb.co/mSLyqmW/reading.png" className="w-[100%]" />
    </div>
    <div className="lg:w-1/2">
    <h1 className="text-2xl md:text-6xl lg:text-6xl bg-gradient-to-r from-purple-700 to-blue-300 text-transparent bg-clip-text font-bold w-fit">About Us!</h1>
      <p className="py-6">
{`"Discover a world of knowledge and imagination at our library. Our vast collection of books spans every genre, from classics to contemporary bestsellers. Immerse yourself in captivating stories, gain insights from historical accounts, or explore the wonders of science fiction. Our library provides a tranquil and welcoming space for you to read, study, and expand your horizons. Whether you seek adventure, education, or leisure, our library offers it all. Engage in literary discussions, attend author events, and join our community of avid readers. Unlock the doors to endless possibilities and embark on a journey through the pages of our library."`}</p>
      <button className="btn bg-gradient-to-r from-purple-700 to-blue-300  text-white text-xl font-bold">About</button>
    </div>
  </div>
</div>
    );
};

AboutPart.propTypes = {
    
};

export default AboutPart;