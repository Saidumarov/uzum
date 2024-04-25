import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/chilla.css";
import "../../styles/sass/typeProduct.scss";
import baho from "../../assets/icons/savg/baho.svg";
import olovv from "../../assets/icons/savg/olov.svg";
import haftaa from "../../assets/icons/imgs/hafta.png";
import likiia from "../../assets/icons/savg/lik.png";
import like from "../../assets/icons/savg/like.svg";
import LoadingProducts from "../loading/loadingproducts";
import { Modal } from "../modalProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import ProductCard from "../market/products/product-card";
import { CardIC, Dicremint, Increment } from "../../constants";
import useCardStore from "../../hooks/products";
import useLikeStore from "../../hooks/likes";
const AboutCards = ({ loading }) => {
  const apiUrl = import.meta.env.VITE_SOME_KEY;
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [productData, setProductData] = useState("");
  const [typeData, setTypeData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { setFixed } = useContext(Modal);
  const root = useNavigate();
  const { addCard, removeCard, cards, updateCard } = useCardStore(
    (state) => state
  );
  const { likes, removeLike, addLike } = useLikeStore((state) => state);
  const { _id, name, price, old_price, per_month, piece, imgags, dec, type } =
    productData;

  // // inc va dic

  const handleButtonClick = () => {
    if (count === piece) {
      setCount(1);
    } else {
      setCount(count + 1);
    }

    const cardToUpdate = cards.find((el) => el?._id === _id);
    if (cardToUpdate) {
      const updatedCard = {
        ...cardToUpdate,
        count: cardToUpdate.count + 1,
      };
      updateCard(updatedCard);
    }
  };
  const handleButtonClick1 = () => {
    if (count === piece) {
      setCount(count - 1);
    } else {
      setCount(count - 1);
    }

    const cardToUpdate = cards.find((el) => el?._id === _id);
    if (cardToUpdate) {
      const updatedCard = {
        ...cardToUpdate,
        count: cardToUpdate.count - 1,
      };
      updateCard(updatedCard);
    }
  };

  const buttonDisabled = count === piece;
  const buttonDisabled1 = count === 1;

  useEffect(() => {
    setFixed(false);
    setIsLoading(true);
    loading(true);
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}product/${id}`);
        const typeRes = await axios.get(`${apiUrl}product`);
        const data = await response?.data;
        const typeResdata = await typeRes?.data;
        setTypeData(typeResdata);
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
        loading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <LoadingProducts />;
  }

  // 404
  if (!productData) {
    return (
      <div className="hom_not" style={{ marginBottom: "-500px" }}>
        <h2> Sayt vaqtincha ishlamayapti :(</h2>
        <p>
          <hr />
          Serverda texnik ishlar olib borilmoqda. <hr />
        </p>
        <button onClick={() => window.location.reload()}>Qayta yuklash</button>
      </div>
    );
  }
  //
  const pirc = price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const old = old_price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const result = count * parseInt(pirc.replace(/\s/g, ""), 10);

  // Format result with thousand separators
  const formattedResult = result
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Horizontal Scrolling
  let carouselCard = document.getElementById("wrap");
  let scrollAmount = 249;

  const next = () => {
    carouselCard.scrollLeft += scrollAmount;
  };

  const prev = () => {
    carouselCard.scrollLeft -= scrollAmount;
  };

  const handelChek = (el) => {
    const newChekCard = {
      ...el,
      count: 1,
    };
    localStorage.setItem("chaekout_card", JSON.stringify([newChekCard]));
    root(`/checkout/${id}`);
  };

  return (
    <>
      {productData ? (
        <div>
          <div className="tavar">
            <div className="img-Itme">
              {imgags.map((item, index) => (
                <img
                  key={index}
                  src={item.img}
                  alt="Note not found"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://img.freepik.com/premium-vector/error-404-found-glitch-effect_8024-4.jpg";
                  }}
                  className="imglist"
                />
              ))}
            </div>
            <div className="imgscrool">
              <div className="imgsledr"></div>
              <Swiper
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
              >
                {imgags.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="imglist"
                      src={item.img}
                      alt="Note not found"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://img.freepik.com/premium-vector/error-404-found-glitch-effect_8024-4.jpg";
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="tavar2">
              <div className="baho">
                <img src={baho} alt="" />
                <p>
                  4.9 (
                  <abbr title="">
                    <span>405 baho</span>
                  </abbr>
                  )<span className="sapan">21000 ta buyurtma</span>
                </p>
                <p className="istak">
                  <img
                    src={like}
                    alt=""
                    className={`lik ${
                      likes && likes?.some((el) => el?._id === _id)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => addLike(productData)}
                  />
                  <img
                    src={likiia}
                    alt=""
                    className={`liki ${
                      likes && likes?.some((el) => el?._id === _id)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => removeLike(_id)}
                  />
                  <span> Istaklarga</span>
                </p>
              </div>
              <p className="title">{dec}</p>
              <div className="sot">
                <p className="sot1">Sotuvchi: </p>
                <p className="sot2">
                  <u>{name}</u>
                </p>
              </div>
              <div className="yetkaz">
                <p className="yet1">Yetkazib berish:</p>
                <p className="yet2">1 kun, bepul</p>
              </div>
              <hr />
              <div className="miqdor">
                <p className="miq">Miqdor:</p>
                <div className="miqdor-itme">
                  <div className="inc">
                    <button
                      onClick={handleButtonClick1}
                      disabled={buttonDisabled1}
                      className="incc"
                    >
                      <Increment />
                    </button>
                    <p className="res">{count * 1}</p>
                    <button
                      className="dic"
                      onClick={handleButtonClick}
                      disabled={buttonDisabled}
                    >
                      <Dicremint />
                    </button>
                  </div>
                  <div className="mimg">
                    <img src={olovv} alt="" /> <p>Sotuvda {piece} dona bor</p>
                  </div>
                </div>
              </div>
              <div className="narx">
                <p className="narx1">Narx:</p>
                <div className="narx-itme">
                  <h3>{formattedResult} so'm</h3>
                  <p>
                    <s>{old} so'm</s>
                  </p>
                  <div className="chil">Chilla Bozor</div>
                </div>
              </div>
              <div className="oyiga">
                <div className="oyiga-itme">
                  <p>
                    {`Oyiga ${(per_month / 12)
                      .toFixed(0)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'mdan`}
                  </p>
                </div>
                <p className="o-p"> muddatli to'lov</p>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
              <div className="fxs">
                <button
                  className="savatga"
                  onClick={() => addCard(productData)}
                >
                  Savatga qo'shish
                </button>
                <button
                  className="tugmani"
                  onClick={() => handelChek(productData)}
                >
                  Tugmani 1 bosishda xarid qilish
                </button>
              </div>
              <div className="hafta">
                <img src={haftaa} alt="" />
                <p> Bu haftada kishi sotib oldi</p>
              </div>
            </div>
            <div className="narx111">
              <div className="narx-itme11">
                <p
                  className="narx12"
                  style={{ fontSize: "10px", textAlign: "center" }}
                >
                  Narx umumiy
                </p>
                <h3 style={{ color: "black", fontSize: "18px" }}>
                  {formattedResult} so'm
                </h3>
              </div>
              {cards?.length > 0 ? (
                <>
                  {cards?.some((el) => el?._id === _id) ? (
                    <Link to={"/cart"}>
                      <button className="savat-item-card">
                        <CardIC />
                        <span>Oʻtish</span>
                      </button>
                    </Link>
                  ) : (
                    <div className="sav" onClick={() => addCard(productData)}>
                      Savatga
                    </div>
                  )}
                </>
              ) : (
                <div className="sav" onClick={() => addCard(productData)}>
                  Savatga
                </div>
              )}
            </div>
          </div>
          <hr className="hh" />
          <div className="type_product">
            <h2>Oʻxshash mahsulotlar</h2>
            <button
              className="swiper-button-prev"
              onClick={prev}
              id="prev"
            ></button>
            <div className="type_product_scrol" id="wrap">
              <div className="type_product_w">
                {typeData?.map((el, index) => {
                  if (el?.type === type) {
                    return <ProductCard key={index} {...el} />;
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
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AboutCards;
