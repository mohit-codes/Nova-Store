import { Link } from "react-router-dom";

const BuyNowTextLinks = ({ link }) => {
  return (
    <div className="space-x-1 mt-2">
      <Link to={`/product/${link}`}>Buy Now</Link>
      <span> | </span>
      <Link to="/products">See All Products</Link>
    </div>
  );
};

export default BuyNowTextLinks;
