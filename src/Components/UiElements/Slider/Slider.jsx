import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';


const Slider = ({items:cards}) => {

  const [currentIndex, setCurrentIndex] = useState(null);

console.log(cards);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2 < cards.length ? prevIndex + 2 : 0));
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 >= 0 ? prevIndex - 2 : cards.length - 2));
  };

  return (
    <div className="container mx-auto">
      <div className="flex overflow-x-auto">
        {cards?.map((card) => (
          <ProductCard key={card.id} id={card.id} url={card?.images[0]} title={card?.name} price={card?.price + card?.tax + card?.fee} isShop={false}  />
        ))}
      </div>
      <div className="slider-buttons">
        <button onClick={handlePrevClick} className="btn">
          Previous
        </button>
        <button onClick={handleNextClick} className="btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default Slider;
