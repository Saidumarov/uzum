import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profil from "./profil";
import { Modal } from "../../modalProvider";
import SiteBarpage from "./sitebarpage";
import x from "../../../assets/icons/savg/bar.svg";
import { imageDb } from "../../../FirebaseImageUpload/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
function ProfilAdd() {
  const apiUrl = import.meta.env.VITE_SOME_KEY;
  const {
    isupdate,
    setIsUpdate,
    updateProduct,
    setUpdateProduct,
    product,
    setProduct,
    text,
    setText,
    sitebar,
    setSitebar,
  } = useContext(Modal);
  //
  const [contact, setContact] = useState({
    name: "",
    user: "",
    imgags: [],
    dec: "",
    price: "",
    piece: "",
    per_month: "",
    old_price: "",
    type: "",
  });
  // post
  const [img, setImg] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  // update
  const [imgu, setImgu] = useState("");
  const [imgu1, setImgu1] = useState("");
  const [imgu2, setImgu2] = useState("");
  const [imgu3, setImgu3] = useState("");
  const [imgUrlu, setImgUrlu] = useState([]);

  // post
  useEffect(() => {
    axios
      .get(`${apiUrl}contact`)
      .then((response) => response?.data)
      .then((data) => {
        const selectedUsers = data?.find(
          (el) => el?.email === selectedUser?.email
        );
        if (selectedUsers) {
          localStorage.setItem("contactApi", JSON.stringify(selectedUsers));
        }
      });

    const userLocal = localStorage.getItem("user");
    const logonUserLocal = localStorage.getItem("logonUser");

    const user = userLocal ? JSON.parse(userLocal) : null;
    const logonUser = logonUserLocal ? JSON.parse(logonUserLocal) : null;

    const userLocalApi = localStorage?.getItem("contactApi");
    const userApi = userLocalApi ? JSON?.parse(userLocalApi) : null;

    const selectedUser = user || logonUser;

    setContact((prev) => ({
      ...prev,
      user: {
        id: userApi?._id || "",
      },
    }));

    // /
  }, [contact.name]);

  // update hok

  // update

  const updateProductHandler = async (id) => {
    try {
      if (
        Object.values(updateProduct).some((val) => !val) ||
        updateProduct.imgags.length <= 2
      ) {
        toast.error("To'liq ma'lumot kiriting");
      } else {
        await axios.put(`${apiUrl}put/${id}`, updateProduct);
        toast.success("Mahsulot tahrirlandi");
        setProduct(false);
        setIsUpdate(false);
        setUpdateProduct({
          name: "",
          user: {},
          imgags: [],
          dec: "",
          price: "",
          piece: "",
          per_month: "",
          old_price: "",
          type: "",
        });
        setImgu("");
        setImgu1("");
        setImgu2("");
        setImgu3("");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Xatolik yuz berdi, mahsulot tahrirlanmadi");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (img !== "") {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((prevUrls) => [...prevUrls, url]);
          setContact((prev) => ({
            ...prev,
            imgags: [...prev.imgags, { img: url }],
          }));
        });
      });
    }
  }, [img]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        Object.values(contact).some((val) => !val) ||
        contact.imgags.length <= 2
      ) {
        toast.error("To'liq ma'lumot kiriting");
      } else {
        const newProduct = { ...contact };
        await axios.post(`${apiUrl}newProduct`, newProduct);
        toast.success("Mahsulot qo'shildi");
        setContact({
          name: "",
          user: {},
          imgags: [],
          dec: "",
          price: "",
          piece: "",
          per_month: "",
          old_price: " ",
          type: "",
        });
        setImg("");
        setImg1("");
        setImg2("");
        setImg3("");
        // Reset contact state
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Xatolik yuz berdi, mahsulot qo'shilmadi");
    }
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (imgu !== "") {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, imgu).then((value) => {
        getDownloadURL(value.ref).then((url) => {
          setImgUrlu((prevUrls) => [...prevUrls, url]);
          setUpdateProduct((prev) => ({
            ...prev,
            imgags: [...prev.imgags, { img: url }],
          }));
        });
      });
    }
  }, [imgu]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <span className={`sitebar-ac1 ${sitebar ? "activ" : ""}`}>
        <SiteBarpage />
      </span>
      <nav className="nav-profil">
        {product ? (
          <h1 className="title-mahsulot"> {text} !</h1>
        ) : (
          <h1 className="title-mahsulot">Mahsulotlar !</h1>
        )}
        <img
          src={x}
          alt=""
          className="x-bar-ac"
          onClick={() => setSitebar(!sitebar)}
        />
      </nav>

      {product ? (
        <>
          {!isupdate ? (
            <div className="mahsulot-kiritish">
              <div className="mahsulot-item">
                <form className="foorm-input-w">
                  <div className="input-product">
                    <label htmlFor="name" className="form-profil-label">
                      Sotuvchi ismi
                    </label>
                    <input
                      onChange={handleChange}
                      name="name"
                      type="text"
                      value={contact?.name}
                      className="form-control"
                      id="name"
                    />
                  </div>
                  <div className="input-product">
                    <label htmlFor="narx" className="form-profil-label">
                      Mahsulot narxi
                    </label>
                    <input
                      id="narx"
                      onChange={handleChange}
                      name="price"
                      type="number"
                      value={contact?.price}
                      className="form-control"
                    />
                  </div>
                  <div className="input-product">
                    <span className="img_text"> Rasm 1</span>
                    <label
                      htmlFor="img"
                      className="form-profil-label"
                      id="imgg"
                    >
                      {img1?.name}
                    </label>
                    <input
                      id="img"
                      onChange={(e) =>
                        setImg(e.target.files[0], setImg1(e.target.files[0]))
                      }
                      name="img"
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="input-product">
                    <label htmlFor="narxe" className="form-profil-label">
                      Mahsulot eski narxi
                    </label>
                    <input
                      id="narxe"
                      onChange={handleChange}
                      name="old_price"
                      type="number"
                      vlaue={contact.old_price}
                      className="form-control"
                    />
                  </div>
                  <div className="input-product">
                    <span className="img_text"> Rasm 2</span>

                    <label
                      htmlFor="img1"
                      className="form-profil-label"
                      id="imgg"
                    >
                      {img2?.name}
                    </label>
                    <input
                      id="img1"
                      onChange={(e) => (
                        setImg(e.target.files[0]), setImg2(e.target.files[0])
                      )}
                      name="img1"
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="input-product">
                    <label htmlFor="dona" className="form-profil-label">
                      Mahsulotdan necha dona bor ?
                    </label>
                    <input
                      onChange={handleChange}
                      name="piece"
                      type="number"
                      value={contact?.piece}
                      className="form-control"
                      id="dona"
                    />
                  </div>
                  <div className="input-product">
                    <span className="img_text"> Rasm 3</span>

                    <label
                      htmlFor="img2"
                      className="form-profil-label"
                      id="imgg"
                    >
                      {img3?.name}
                    </label>
                    <input
                      id="img2"
                      name="img2"
                      type="file"
                      onChange={(e) => (
                        setImg(e.target.files[0]), setImg3(e.target.files[0])
                      )}
                      className="form-control"
                    />
                  </div>
                  <div className="input-product">
                    <label htmlFor="bulib" className="form-profil-label">
                      Mahsulot bo'lib tolash narxi ?
                    </label>
                    <input
                      onChange={handleChange}
                      name="per_month"
                      type="number"
                      value={contact?.per_month}
                      className="form-control"
                      id="bulib"
                    />
                  </div>
                  <div className="input-product">
                    <label htmlFor="last" className="form-profil-label">
                      Mahsulot haqida
                    </label>
                    <textarea
                      onChange={handleChange}
                      name="dec"
                      type="text"
                      value={contact?.dec}
                      className="form-control"
                      id="last"
                    ></textarea>
                  </div>
                  <div className="input-product">
                    <label htmlFor="type" className="form-profil-label">
                      Mahsulot turini tanlang ?
                    </label>
                    <select
                      name="type"
                      value={contact?.type}
                      onChange={handleChange}
                      className="slect"
                      id="type"
                    >
                      <option></option>
                      <option value="elektronika">Elektronika</option>
                      <option value="maishiy_texnika">Maishiy-texnika</option>
                      <option value="kiyim">Kiyim</option>
                      <option value="poyabzallar">Poyabzallar</option>
                      <option value="aksessuarlar">Aksessuarlar</option>
                      <option value="goʻzallik">Goʻzallik</option>
                      <option value="salomatlik">Salomatlik</option>
                      <option value="roʻzgʻor_buyumlari">
                        Uy-roʻzgʻor-buyumlari
                      </option>
                      <option value="qurilish">Qurilish-va-taʼmirlash</option>
                      <option value="avtotovarlar">Avtotovarlar</option>
                    </select>
                  </div>
                  <button onClick={handleSubmit} className="btn-form">
                    Qo'shish
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="mahsulot-kiritish">
              <div className="mahsulot-item">
                <form
                  className="foorm-input-w"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="input-product" id="input-product">
                    <label htmlFor="name" className="form-profil-label">
                      Sotuvchi ismi
                    </label>
                    <input
                      onChange={handleUpdate}
                      name="name"
                      type="text"
                      value={updateProduct?.name}
                      className="form-control"
                      id="name"
                    />
                  </div>
                  <div className="input-product" id="input-product">
                    <label htmlFor="narx" className="form-profil-label">
                      Mahsulot narxi
                    </label>
                    <input
                      id="narx"
                      onChange={handleUpdate}
                      name="price"
                      type="number"
                      value={updateProduct?.price}
                      className="form-control"
                    />
                  </div>
                  <div className="input-product" id="input-product">
                    <label htmlFor="narxe" className="form-profil-label">
                      Mahsulot eski narxi
                    </label>
                    <input
                      id="narxe"
                      onChange={handleUpdate}
                      name="old_price"
                      type="number"
                      value={updateProduct?.old_price}
                      className="form-control"
                    />
                  </div>

                  <div className="input-product" id="input-product">
                    <span className="img_text"> Rasm 1</span>
                    <label
                      htmlFor="img"
                      className="form-profil-label"
                      id="imgg"
                    >
                      {imgu1?.name}
                    </label>
                    <input
                      id="img"
                      onChange={(e) =>
                        setImgu(e.target.files[0], setImgu1(e.target.files[0]))
                      }
                      name="img"
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="input-product" id="input-product">
                    <span className="img_text"> Rasm 2</span>

                    <label
                      htmlFor="img1"
                      className="form-profil-label"
                      id="imgg"
                    >
                      {imgu2?.name}
                    </label>
                    <input
                      id="img1"
                      onChange={(e) => (
                        setImgu(e.target.files[0]), setImgu2(e.target.files[0])
                      )}
                      name="img1"
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="input-product" id="input-product">
                    <span className="img_text"> Rasm 3</span>

                    <label
                      htmlFor="img2"
                      className="form-profil-label"
                      id="imgg"
                    >
                      {imgu3?.name}
                    </label>
                    <input
                      id="img2"
                      name="img2"
                      type="file"
                      onChange={(e) => (
                        setImgu(e.target.files[0]), setImgu3(e.target.files[0])
                      )}
                      className="form-control"
                    />
                  </div>
                  <div className="input-product" id="input-product">
                    <label htmlFor="dona" className="form-profil-label">
                      Mahsulotdan necha dona bor ?
                    </label>
                    <input
                      onChange={handleUpdate}
                      name="piece"
                      type="number"
                      value={updateProduct?.piece}
                      className="form-control"
                      id="dona"
                    />
                  </div>

                  <div className="input-product" id="input-product">
                    <label htmlFor="bulib" className="form-profil-label">
                      Mahsulot bo'lib tolash narxi ?
                    </label>
                    <input
                      onChange={handleUpdate}
                      name="per_month"
                      type="number"
                      value={updateProduct?.per_month}
                      className="form-control"
                      id="bulib"
                    />
                  </div>

                  <div className="input-product" id="input-product">
                    <label htmlFor="last" className="form-profil-label">
                      Mahsulot haqida
                    </label>
                    <textarea
                      onChange={handleUpdate}
                      name="dec"
                      type="text"
                      value={updateProduct?.dec}
                      className="form-control"
                      id="last"
                    ></textarea>
                  </div>
                  <div className="input-product">
                    <label htmlFor="type" className="form-profil-label">
                      Mahsulot turini tanlang ?
                    </label>
                    <span className="isclec">
                      <select
                        name="type"
                        value={updateProduct?.type}
                        onChange={handleUpdate}
                        className="slect"
                        id="type"
                      >
                        <option></option>
                        <option value="elektronika">Elektronika</option>
                        <option value="maishiy_texnika">Maishiy-texnika</option>
                        <option value="kiyim">Kiyim</option>
                        <option value="poyabzallar">Poyabzallar</option>
                        <option value="aksessuarlar">Aksessuarlar</option>
                        <option value="goʻzallik">Goʻzallik</option>
                        <option value="salomatlik">Salomatlik</option>
                        <option value="roʻzgʻor_buyumlari">
                          Uy-roʻzgʻor-buyumlari
                        </option>
                        <option value="qurilish">Qurilish-va-taʼmirlash</option>
                        <option value="avtotovarlar">Avtotovarlar</option>
                      </select>
                    </span>
                  </div>
                  <button
                    onClick={() => updateProductHandler(updateProduct.id)}
                    className="btn-form"
                  >
                    O'zgartirish
                  </button>
                  <button
                    onClick={() => (
                      setIsUpdate(false),
                      setProduct(false),
                      setText("Mahsulot qo'shish")
                    )}
                    className="btn-form1"
                  >
                    Yopish
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <Profil />
        </>
      )}
    </>
  );
}

export default ProfilAdd;
