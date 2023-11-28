import "./SearchItem.css"
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";


const SearchItem = ({ item , date}) => {
  const navigate = useNavigate()
  
  return (
    <div className="searchItem">
      <img
        src={`http://localhost:3008/shared/${item.pic}`}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.city},{item.country}</h1>
        <span className="siLocation">{item.title}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${item.price} <span className="perNight">/ per night</span></span> 
          <span className="siTaxOp">Includes taxes and fees</span>
          
          <button className="siCheckButton" onClick={()=>{
            navigate(`/listings/${item.id}` , { state: {date}})
          }}>See More</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;