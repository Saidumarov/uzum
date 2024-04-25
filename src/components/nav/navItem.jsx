import { useContext, useEffect, useState } from "react";
import uzm1 from "../../assets/icons/savg/uzm1.svg";
import uzm from "../../assets/icons/savg/uzm.svg";
import katalog from "../../assets/icons/savg/kat.svg";
import kirish from "../../assets/icons/savg/odam.svg";
import layk from "../../assets/icons/savg/like.svg";
import savat from "../../assets/icons/savg/savatt.svg";
import savat1 from "../../assets/icons/savg/savat.svg";
import passImg from "../../assets/icons/savg/pas.svg";
import joy from "../../assets/icons/savg/joy.svg";
import xar from "../../assets/icons/savg/xarita.svg";
import savol from "../../assets/icons/savg/suroq.svg";
import email from "../../assets/icons/savg/email.svg";
import uz from "../../assets/icons/savg/uz.svg";
import ilova from "../../assets/icons/imgs/ilova.png";
import { Link, useNavigate } from "react-router-dom";
import SearchPage from "../../pages/SearchPage/index";
import { Modal } from "../modalProvider";
import SignUp from "../signUp";
import useCardStore from "../../hooks/products";
import { DeleteIc } from "../../constants";
const NavItme = () => {
  const { active, setActive, activee } = useContext(Modal);
  const [profil, setprofil] = useState("Kirish");
  const naviget = useNavigate();
  const { removeCard, cards } = useCardStore((state) => state);

  let name = JSON.parse(localStorage.getItem("profilUser"));
  const login = () => {
    if (!name) {
      setActive(!active);
    } else {
      naviget("/settings");
    }
  };

  const navgatio = useNavigate();

  useEffect(() => {
    if (name) {
      setprofil("Profil");
      if (name?.name !== "") {
        setprofil(name?.name);
      }
    }
  }, [name]);

  return (
    <div>
      <SignUp />
      <div className="barr"></div>
      <div className="navitme">
        <div className={`bar-menyu ${activee ? "activ" : ""}`}>
          <div className="barlin">
            <div className="bar-x"></div>
            <div className="kirsh1">
              <p onClick={login}>Kirish</p>/
              <p onClick={login}>Ro'yxatdan o'tish</p>
            </div>
          </div>
          <div className="katalog1">
            <img src={katalog} alt="" className="katim" />
            <p>Katalog</p>
            <img src={passImg} alt="" className="katim1" />
          </div>
          <div className="bar-man">
            <div className="buy">
              <img src={savat1} alt="" />
              <p className="bar-p">Buyurtmalarim</p>
            </div>
            <div className="sar">
              <img src={layk} alt="" />
              <p className="bar-p">Saralangan</p>
            </div>
            <div className="joyla">
              <img src={joy} alt="" />
              <p className="bar-p"> Shahar: Toshkent</p>
            </div>
            <div className="xarit">
              <img src={xar} alt="" />
              <p className="bar-p">Topshirish punkti</p>
            </div>
            <hr />
            <div className="savol1">
              <img src={savol} alt="" />
              <p className="bar-p">Savol-javoblar</p>
            </div>
            <a href="https://t.me/saidumarov_006">
              <div className="email">
                <img src={email} alt="" />
                <p className="bar-p">Biz bilan bog'lanish</p>
              </div>
            </a>
            <div className="ilova">
              <img src={ilova} alt="" />
              Uzum ilovasi
            </div>
            <div className="til">
              <img src={uz} alt="" />
              <p className="bar-p">Sayt tili: Оʻzbekcha</p>
            </div>
            <hr />
            <div className="biz">
              <p className="bar-p">Biz haqimizda</p>
              <img src={passImg} alt="" className="katim1" />
            </div>
            <hr />
            <div className="hamkor">
              <p className="bar-p">Hamkorlarga</p>
              <img src={passImg} alt="" className="katim1" />
            </div>
          </div>
        </div>
        <div className="navitme_w">
          <div className="uzm">
            <Link to="/">
              <img src={uzm} alt="" className="uzmm1" />
              <img src={uzm1} alt="" className="uzmm" />
            </Link>
          </div>
          <div className="navitme_w_item">
            <SearchPage />
            <div className="kirsh" onClick={login}>
              <img src={kirish} alt="" />
              <p> {profil}</p>
            </div>
            <Link to={"/wishes"}>
              <div className="sara">
                <img src={layk} alt="" />
                <p> Saralangan</p>
              </div>
            </Link>
            <div className="savat-wrapper">
              <div className="savat" onClick={() => navgatio("/cart")}>
                <img src={savat} alt="" />
                <p className="savatt"> Savat</p>
                <p
                  className="pas"
                  style={{
                    backgroundColor:
                      cards?.length > 0 ? " rgb(111, 0, 255)" : "",
                  }}
                >
                  {cards?.length}
                </p>
              </div>
              <div
                className="savat-product"
                style={{ display: cards?.length > 0 ? "" : "none" }}
              >
                <div>
                  {cards?.map((item, index) => (
                    <div className="product-card-pas" key={index}>
                      <div
                        onClick={() => navgatio(`/uzum/product/${item?._id}`)}
                      >
                        {item?.imgags?.slice(0, 1)?.map((url, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={url?.img}
                            alt=""
                            className="pas-img"
                          />
                        ))}
                        <p className="dec-pas">
                          {item?.dec?.substring(0, 45)}...
                        </p>
                        <p className="pic-pas">
                          {item?.price
                            ?.toString()
                            ?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                          so'm
                        </p>
                      </div>
                      <span
                        className="delete"
                        onClick={() => removeCard(item?._id)}
                      >
                        <DeleteIc />
                      </span>
                    </div>
                  ))}
                </div>
                <Link to={"/checkout/products"}>
                  <div className="savat-product1">
                    <p>Buyurtmani rasmilashtirish </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavItme;
