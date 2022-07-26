import React, { useContext, useState } from 'react';
import './Hotel.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFetch from '../../hooks/useFetch';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';

export const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const photos = [
    {
      src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/194444427.jpg?k=488ce34ee314363cb10f067754b304d79392de0c9588affc3dcf77108db6b39c&o=&hp=1',
    },
    {
      src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/21777964.jpg?k=283a5fad6de7082a37b0e604dc552421320e9df80d451f9ff84d5d225c745728&o=&hp=1',
    },
    {
      src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/194444030.jpg?k=19523066086a3c88bfc2eed56c1cbddd25deefa16731c82280334b7eb10a9d40&o=&hp=1',
    },
    {
      src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/194444447.jpg?k=bc4a4d56efb0281aa65f0046c3b1ef1ca390ed9fd57328dc28210b8a21237f2c&o=&hp=1',
    },
    {
      src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/210819410.jpg?k=2f095c966edd686280af1a497ffcc598c9cb1eb97c4f3dc2802d24199b6b69a7&o=&hp=1',
    },
    {
      src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/185377251.jpg?k=748b327752b1a9253e4c63c44c034034beae307c8c6377c9ec9ed544d34825ee&o=&hp=1',
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };
  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate('/login');
    }
  };
  return (
    <div>
      {<Navbar />}
      {<Header type="list" />}
      {loading ? (
        'Loading'
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove('l')}
              />
              <div className="sliderWrapper">
                <img
                  src={photos[slideNumber].src}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove('r')}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location {data.distance} from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over &#8377; {data.cheapestPrice} at this property and
              get a free airport taxi.
            </span>
            <div className="hotelImages">
              {photos?.map((photo, i) => (
                <div key={i} className="hotelImgWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay</h1>
                <span>
                  Located in the heart of London, this property has an excellent
                  score of 8.9!
                </span>
                <h2>
                  <b>&#8377; {days * data.cheapestPrice*options.rooms}</b> (
                  {days}) nights
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          {<MailList />}
          {<Footer />}
        </div>
      )}
      {openModal &&  <Reserve setOpen={setOpenModal} hotelId={id}/> }
    </div>
  );
};
