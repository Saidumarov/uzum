import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../market/products/product-card";
import LoadingProducts from "../loading/loadingproducts";
import "../../styles/sass/wishes.scss";
import hearts from "../../assets/icons/imgs/hearts.cf414be.png";
import useLikeStore from "../../hooks/likes";
import { Modal } from "../modalProvider";
function Wishes() {
  const { setFixed } = useContext(Modal);
  const { likes } = useLikeStore((state) => state);
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    setFixed(true);
    localStorage.setItem("text", JSON.stringify("Saralangan"));
    setTimeout(() => {
      setisloading(false);
    }, 1000);
  }, []);

  return (
    <div className="wishis_w">
      <div className="wishis_cards">
        {isloading ? <div className="about-hig"></div> : ""}
        {isloading ? (
          <LoadingProducts />
        ) : likes?.length > 0 ? (
          likes?.map((item, index) => <ProductCard key={index} {...item} />)
        ) : (
          <div className="not-like">
            <div>
              <img src={hearts} alt="" className="hearts" />
              <h3>Sizga yoqqanini qoʻshing</h3>
              <p>
                Mahsulotdagi ♡ belgisini bosing. Akkauntga kiring va barcha
                saralanganlar saqlanib qoladi
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishes;
