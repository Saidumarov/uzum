import React, { useEffect, useContext, useState } from "react";
import { Modal } from "../modalProvider";
import { LoadingProducts } from "../index";
import notProduct from "../../assets/icons/imgs/shopocat.490a4a1 (1).png";
import "../../styles/sass/cart.scss";
import { Link, useNavigate } from "react-router-dom";
import useCardStore from "../../hooks/products";
import { DeleteIcon, Dicremint, Increment } from "../../constants";
function Cart() {
  const { removeCard, cards, updateCard } = useCardStore((state) => state);
  const { setFixed, setActiveItem } = useContext(Modal);
  const [subtotal, setSubtotal] = useState();
  const root = useNavigate();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setFixed(true);
    localStorage.setItem("text", JSON.stringify("Savat"));
    setActiveItem("Savat");
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const totalSubtotal = cards.reduce((acc, item) => {
      return acc + item?.price * item?.count;
    }, 0);
    setSubtotal(totalSubtotal);
  }, [cards]);

  const handelIncrement = (value, ID) => {
    if (value == "dic") {
      const cardToUpdate = cards.find((el) => el?._id === ID);
      if (cardToUpdate) {
        const updatedCard = {
          ...cardToUpdate,
          count: cardToUpdate.count + 1,
        };
        updateCard(updatedCard);
      }
    } else {
      const cardToUpdate = cards.find((el) => el?._id === ID);
      if (cardToUpdate) {
        const updatedCard = {
          ...cardToUpdate,
          count: cardToUpdate.count - 1,
        };
        updateCard(updatedCard);
      }
    }
  };

  return (
    <div className="data">
      {cards?.length > 0 ? (
        <div className="cards_wrapper">
          <div className="mah">
            Savatingizda<span> {cards.length}ta mahsulot</span>
          </div>
          <div className="cards_w_b">
            {isLoading ? (
              <LoadingProducts />
            ) : (
              cards?.map((el, index) => (
                <div key={index} className="carts-wrapper">
                  <div className="carts_card_left">
                    <div className="card_card">
                      <div className="img_card">
                        {el?.imgags?.slice(0, 1).map((el, imgIndex) => (
                          <img key={imgIndex} src={el?.img} alt="" />
                        ))}
                      </div>
                      <div className="dec_card">
                        <div className="top_dec">
                          <p> {el?.dec?.substring(0, 50)} </p>
                          <div
                            className="delete"
                            onClick={() => removeCard(el?._id)}
                          >
                            <DeleteIcon /> <p>Yo'q qilish</p>
                          </div>
                        </div>
                        <div className="bottom_dec">
                          <p className="name">
                            Sotuvchi: <span> {el?.name}</span>
                          </p>
                          <div className="count">
                            <button
                              onClick={() => handelIncrement("inc", el?._id)}
                              disabled={el?.count === 1}
                            >
                              <span>
                                <Increment />
                              </span>
                            </button>
                            {el?.count}
                            <button
                              onClick={() => handelIncrement("dic", el?._id)}
                              disabled={el?.count === el?.piece}
                            >
                              <span>
                                <Dicremint />
                              </span>
                            </button>
                          </div>
                          <div className="narxone">
                            <h3>
                              {el?.price
                                ?.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                              so'm
                            </h3>
                            <s>
                              {el?.old_price
                                ?.toString()
                                ?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                              so'm
                            </s>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="carts_card_right">
            <h4>Buyurtmangiz</h4>
            <div className="mahsulot">
              Mahsulotlar:({cards?.length})
              <span>
                {subtotal?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                so'm
              </span>
            </div>
            <div className="time">Yetkazib berish M01 27 (Erta)</div>
            <button
              className="rasmiy"
              onClick={() => root("/checkout/products")}
            >
              Rasmiylashtirishga o'tish
            </button>
          </div>
        </div>
      ) : (
        <div className="not-product">
          <div>
            <img src={notProduct} alt="" />
            <h3>Savatda hozircha mahsulot yoʻq</h3>
            <p>
              Bosh sahifadagi to’plamlardan boshlang yoki kerakli mahsulotni
              qidiruv orqali toping
            </p>
            <Link to={"/"}>
              <button
                onClick={() =>
                  localStorage.setItem("text", JSON.stringify("Bosh sahifa"))
                }
              >
                Bosh sahifa
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
