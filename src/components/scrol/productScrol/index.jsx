import { useRef } from "react";
import "../../../styles/sass/slider-product.scss";
import ProductCard from "../../market/products/product-card";
import Next from "../../../constants";
function ProductScrol(product) {
  const { dataResponse, isLoading } = product?.products;
  const carouselCardRef = useRef(null);
  const scrollAmount = 249;

  const next = () => {
    if (carouselCardRef.current) {
      carouselCardRef.current.scrollLeft += scrollAmount;
    }
  };

  const prev = () => {
    if (carouselCardRef.current) {
      carouselCardRef.current.scrollLeft -= scrollAmount;
    }
  };
  return (
    <>
      {!isLoading ? (
        <div className="slider-product-w">
          <h2>
            Kiyimlar
            <span>
              <Next />
            </span>
          </h2>
          <button
            className="swiper-button-prev"
            onClick={prev}
            id="prev"
          ></button>
          <div className="slider-product-scrol" ref={carouselCardRef}>
            <div className="slider-product-scrol_item">
              {dataResponse?.map((item, index) => {
                if (item?.type === "kiyim") {
                  return <ProductCard key={index} {...item} />;
                }
              })}
            </div>
          </div>
          <button
            className="swiper-button-next"
            onClick={next}
            id="next"
          ></button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ProductScrol;
