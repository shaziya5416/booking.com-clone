import React from 'react';
import useFetch from '../../hooks/useFetch';
import './Featured.css';

const Featured = () => {
  const { data, loading, error } = useFetch(
    '/hotels/countByCity?cities=Berlin,MADRID,Udaipur'
  );
  return (
    <div className="featured">
      {loading ? (
        'Loading please Wait'
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/150554539.jpg?k=01d633e3f9f2854569c85afd9a167973ff1c3eb691e4377645013ef6f98820ef&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Berlin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/129741501.jpg?k=d90c51dac125aecbee2398daea416fdde2e422384a40711a75fc6041c9f35a93&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>MADRID</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://q-xx.bstatic.com/xdata/images/xphoto/max1200/129955309.jpg?k=3ba6320ce0033705be46ebf900d0d9b5b60fb1533f7ecf8267273006ec871f9b&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Udaipur</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
