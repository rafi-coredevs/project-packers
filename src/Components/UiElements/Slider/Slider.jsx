import  { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const Slider = ({items}) => {
const [cards, setCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(null);
  console.log(items)
useEffect(()=>{
    setCards(items)
    console.log(items)
},[])

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
          <ProductCard key={card.id} id={card.id} url={card.thumbnail} title={card.title} price={card.price}  />
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
