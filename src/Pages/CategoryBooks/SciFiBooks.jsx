import PropTypes from 'prop-types';
import Books from '../../Component/Books/Books';
import { useLoaderData } from 'react-router-dom';
import bannerVideo from "../../images/Images/bg video.mp4";

const SciFiBooks = () => {
  const loadedBooks = useLoaderData();
  const books = loadedBooks.filter((book) => book?.category === 'Sci-Fi');
  console.log(books);

  return (
    <>
      <div className="App">
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '80vh',
            overflow: 'hidden',
            textAlign: 'center',
          }}
          className="video-container rounded-xl hidden md:block"
        >
          <video
            className='rounded-xl'
            autoPlay
            loop
            muted
            style={{ width: '100%', height: '80vh' }}
          >
            <source
              src={bannerVideo} // Replace with your video source
              type="video/mp4"
              
            />
            Your browser does not support the video tag.
          </video>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
              zIndex: 2,
            }}
            className="video-content"
          >
            <h1 className='bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text text-4xl md:text-8xl font-bold w-fit mx-auto'>Sci-Fi Books</h1>
            <p className='pt-6 text-xl font-bold hidden lg:block'>
            {"In the boundless universe of science fiction, we explore the uncharted realms of imagination, where technology and the human spirit merge to create extraordinary tales of the future, unknown worlds, and the limitless possibilities of the cosmos."}
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '80vh',
              background: 'rgba(0, 0, 0, 0.8)', // Adjust the opacity as needed
              zIndex: 1,
            }}
            className="overlay"
          ></div>
        </div>
      </div>
      <Books books={books} category={`Sci-Fi`}/>
    </>
  );
};

SciFiBooks.propTypes = {
  book: PropTypes.node,
};

export default SciFiBooks;
