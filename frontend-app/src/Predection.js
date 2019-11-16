import React from "react";
import pic1 from "./images/SalesPrediction.png";
import pic2 from "./images/Weather_VS_Sales.png";

export default class Predection extends React.Component {
  render() {
    return (
      <div>
        <div className="imageDiv">
          <center>
            <img src={pic1} alt="..." className="image" />
          </center>
          <center>
            <span className="spanText">
              <strong>PCM Future Demand </strong>
            </span>
          </center>
        </div>

        <div>
          <center>
            <img src={pic2} alt=".." className="image" />
          </center>
        </div>
      </div>
    );
  }
}
