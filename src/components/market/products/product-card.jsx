import { Link } from "react-router-dom";
import "../../../styles/chilla.css";
import baho from "../../../assets/icons/savg/baho.svg";
import savat from "../../../assets/icons/savg/savat+.svg";
import like from "../../../assets/icons/savg/lik.svg";
import liki from "../../../assets/icons/savg/lik.png";
import useLikeStore from "../../../hooks/likes";
import useCardStore from "../../../hooks/products.js";
const ProductCard = (product) => {
  const { _id, imgags, dec, price, per_month, old_price, name, piece } =
    product;
  const { likes, removeLike, addLike } = useLikeStore((state) => state);
  const { addCard } = useCardStore((state) => state);

  const pirc = price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const old = old_price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className="wrr">
      <img
        src={like}
        alt=""
        className={`lik ${
          likes && likes?.some((el) => el?._id === _id) ? "active" : ""
        }`}
        onClick={() => addLike(product)}
      />
      <img
        src={liki}
        alt=""
        className={`liki ${
          likes && likes?.some((el) => el?._id === _id) ? "active" : ""
        }`}
        onClick={() => removeLike(_id)}
      />
      <Link to={`/uzum/product/${_id}`} className="a">
        <div className="clas">
          <div className="content">
            <div className="conimg">
              {imgags?.slice(0, 1)?.map((image, index) => (
                <img
                  key={index}
                  src={image?.img}
                  alt="Image not found"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://img.freepik.com/premium-vector/error-404-found-glitch-effect_8024-4.jpg";
                  }}
                />
              ))}

              <div className="chibozor">Chilla Bozor</div>
            </div>
            <div className="conimg-itme">
              <p className="bo">
                {dec?.length > 50 ? dec?.substring(0, 50) + "..." : dec}
              </p>
              <div className="baho1">
                <img src={baho} alt="" />
                <p>
                  4.9 (
                  <abbr title="">
                    <span>405 baho</span>
                  </abbr>
                  )
                </p>
              </div>
              <div className="oyiga1">
                <p>
                  {(per_month / 12)
                    .toFixed(0)
                    ?.toString()
                    ?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  so'm/oyiga
                </p>
              </div>
            </div>
          </div>
          <div className="xisobot">
            <div className="nar">
              <p className="narx11">
                <s>{old} so'm</s>
              </p>
              <p className="narx12">{pirc} so'm</p>
            </div>
          </div>
        </div>
      </Link>
      <div
        className="sev"
        onClick={() => {
          addCard(product);
        }}
      >
        <img src={savat} alt="" />
      </div>
    </div>
  );
};

export default ProductCard;
