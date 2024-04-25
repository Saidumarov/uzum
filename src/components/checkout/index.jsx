import React, { useContext, useEffect, useState } from "react";
import "../../styles/sass/checkout.scss";
import { Modal } from "../modalProvider";
import useCardStore from "../../hooks/products";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingProducts from "../loading/loadingproducts";
import { useParams } from "react-router-dom";
function Checkout() {
  const botToken = "6805483507:AAEkBEiNwAK1OE7ZnrgNYa3tEFQsVZzhYjc"; // bot tokini
  const chatId = 1121426146; // botning adminini idisi 2042795731
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(true);
  const [name, setName] = useState(false);
  const [lasname, setLasame] = useState(false);
  const [number, setNumber] = useState(false);
  const [chek, setChek] = useState(false);
  const { setFixed, setActiveItem } = useContext(Modal);
  const { cards } = useCardStore((state) => state);
  const [subtotal, setSubtotal] = useState();
  const [ialoading, setialoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    lasname: "",
    number: "",
    chek: "",
  });
  const handelchange = (e) => {
    const { name, value } = e.target;
    setName(false);
    setNumber(false);
    setLasame(false);
    setChek(false);
    setContact((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    let checkout_card = [];

    // localStorage dan ma'lumotlarni olish
    const checkout_card_str = localStorage.getItem("chaekout_card");
    if (checkout_card_str) {
      checkout_card = JSON.parse(checkout_card_str);
    }

    // Ma'lumotlarni `data`ga joylash
    if (id === "products") {
      setData(cards);
    } else {
      setData(checkout_card);
    }
  }, [id]);

  useEffect(() => {
    setFixed(true);
    localStorage.setItem("text", JSON.stringify("Savat"));
    setActiveItem("Savat");
    const totalSubtotal = data?.reduce((acc, item) => {
      return acc + item?.price * item?.count;
    }, 0);
    setSubtotal(totalSubtotal);
    if (cards.length > 0) {
      setTimeout(() => {
        setialoading(false);
      }, 600);
    }
  }, [data]);

  const onSubmit = async () => {
    if (!contact.name || !contact.lasname || !contact.number || contact.chek) {
      if (!contact.name) setName(true);
      if (!contact.number) setNumber(true);
      if (!contact.lasname) setLasame(true);
      if (!contact.chek) setChek(true);
    } else {
      setLoading1(false);

      // Rasmlarni yuborish
      try {
        for (const product of data) {
          const imageUrl = product?.imgags[0]?.img;
          const imageCaption = `Xaridor: ${
            contact.name + " " + contact.lasname
          }\nTelefon: ${contact.number}\n\nMahsulotlar:\n\Nomi: ${
            product?.name
          }\nNarxi: ${product?.price
            ?.toString()
            ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} so'm\nTa'rif: ${
            product?.dec
          }\nTo'lov turi: ${product?.term || "Naxt"}\nOylik to'lov: ${
            product?.monthly_payment || 0
          } so'm\n\n`;

          const response = await fetch(
            `https://api.telegram.org/bot${botToken}/sendPhoto`,
            {
              method: "POST",
              body: JSON.stringify({
                chat_id: chatId,
                photo: imageUrl,
                caption: imageCaption,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            toast.error("Xabar yuborishda xatolik yuz berdi!");
            return;
          }
        }
        toast.success("Buyrtma berildi !");
        localStorage.setItem("zakas", JSON.stringify(data));
        setLoading(true);
        setTimeout(() => {
          setLoading1(true);
          setLoading(false);
        }, 1000);
        setContact({
          name: "",
          lasname: "",
          number: "",
          chek: "",
        });
      } catch (error) {
        console.error("Rasm yuborishda xatolik yuz berdi:", error);
        toast.error("Rasm yuborishda xatolik yuz berdi!");
      } finally {
      }
    }
  };

  return (
    <div className="checkout_w">
      <ToastContainer />
      {ialoading ? <LoadingProducts /> : ""}
      <div className="checkout">
        <div className="checkout_wrap">
          <h2>Buyurtma qabul qiluvchi:</h2>
          <div className="user_chek">
            <div className="name_chek">
              <p>Familiya </p>
              <input
                type="lasname"
                style={{ borderColor: lasname ? "red" : "" }}
                placeholder="Familyangizdi kiriting"
                value={contact.lasname}
                name="lasname"
                onChange={handelchange}
              />
            </div>
            <div className="surname_chek">
              <p>Ism </p>
              <input
                type="name"
                name="name"
                placeholder="Ismingizdi kiriting"
                style={{ borderColor: name ? "red" : "" }}
                value={contact.name}
                onChange={handelchange}
              />
            </div>
          </div>
          <p className="oparat">
            Siz koʻrsatgan telefon raqamiga buyurtma holati haqida bildirishnoma
            yuboramiz. Yetkazib berish vaqtini aniqlashtirish uchun kuryer siz
            bilan telefon orqali bogʻlanadi.
          </p>
          <div className="tel">
            <p>Telefon raqami </p>
            <input
              type="number"
              style={{ borderColor: number ? "red" : "" }}
              placeholder="+998 _-_-_-_-_-_-_"
              name="number"
              value={contact.number}
              onChange={handelchange}
            />
          </div>
          <div className="tasdiq">
            <input
              type="checkbox"
              name="chek"
              value={contact.chek}
              onChange={handelchange}
            />
            <p style={{ color: chek ? "red" : "" }}>Tasdiqlash</p>
          </div>
          <button onClick={onSubmit}>
            {loading ? (
              <span className="qabul">
                <span className="x"></span>
                <span className="y"></span>
              </span>
            ) : loading1 ? (
              "Buyurtma berish"
            ) : (
              <span className="loading_b"></span>
            )}
          </button>
        </div>
      </div>
      <div className="checkout_cards">
        {data?.map((el, i) => (
          <div key={i} className="checkout_card">
            <img src={el?.imgags[0].img} alt="" />
            <div>
              <p>
                <b>{el?.name}</b>
              </p>
              <p>
                {el?.dec.length > 30 ? el?.dec.slice(0, 30) + "..." : el.dec}
              </p>
              <p>
                Narx :{" "}
                {el?.price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                so'm
              </p>
              <p>Nechta : {el?.count}</p>
            </div>
          </div>
        ))}

        <p className="count">
          Jami: {subtotal?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
          so'm
        </p>
      </div>
    </div>
  );
}

export default Checkout;
