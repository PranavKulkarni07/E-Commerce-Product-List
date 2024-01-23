import React from "react";

//Product Card Component
const ProductCard = (props) => {
  const { title, price, imageSrc } = props;

  return (
    <div className="card">
      <div className="card-img">
        {imageSrc && <img src={imageSrc} alt={title} />}
      </div>
      <div className="card-body">
        <h2>{title}</h2>
        <div className="price">
          <span className="dark-orange-text">${price}</span>
        </div>
        <div className="rating">
          <div className="stars">★★★★★</div>
        </div>
        <button className="buy-now-btn">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
