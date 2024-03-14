import { useContext, useEffect } from "react";
import Settings from "../../components/settings";
import { Modal } from "../../components/modalProvider";

function SettingsPage() {
  const { setSet, setFixed, setActiveItem } = useContext(Modal);
  useEffect(() => {
    setSet(true);
    setFixed(true);
    localStorage.setItem("text", JSON.stringify("Bosh"));
    setActiveItem("Bosh");
  }, []);
  return (
    <>
      <Settings />
    </>
  );
}

export default SettingsPage;
