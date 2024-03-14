import { useContext, useEffect } from "react";
import Orders from "../../components/orders";
import { Modal } from "../../components/modalProvider";

function OrdersPage() {
  const { setSet, setFixed, setActiveItem } = useContext(Modal);
  useEffect(() => {
    setSet(true);
    setFixed(true);
    localStorage.setItem("text", JSON.stringify("Bosh"));
    setActiveItem("Bosh");
  }, []);
  return (
    <>
      <Orders />
    </>
  );
}

export default OrdersPage;
