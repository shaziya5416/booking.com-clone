import React from 'react'
import { Link } from 'react-router-dom'
import "./SearchItem.css"

function SearchItem({item}) {
  return (
    <div className="searchItem">
      <img src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/42214560.jpg?k=c3f8823652794ef2cd890905fa6888a6bb50b5fb4211a61c21035c0141a7369f&o=&hp=1" alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance} m from centre</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">Studio Apartment with Air Conditioner</span>
        <span className="siFeatures">
          Entire - 1 bathroom - 1 full bed
        </span>
        <span className="siCancelOp">Free Cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so book this great price details!
        </span>
  
      </div>
      <div className="siDetails">
        {item.rating &&
        <div className="siRating">
        <span>Excellent</span>
        <button>{item.rating}</button>
      </div> }
        
          <div className="siDetailTexts">
            <span className="siPrice">&#8377; {item.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See Availability</button>
            </Link>    
          </div>
      </div>
    </div>
  )
}

export default SearchItem