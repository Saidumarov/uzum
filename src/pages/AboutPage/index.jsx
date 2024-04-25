import { useState } from "react";
import AboutCards from "../../components/aboutcards";

function AboutPage() {
  const [isloading, setisloading] = useState(true);
  return (
    <>
      <AboutCards loading={setisloading} />
      {isloading ? <div className="about-hig"></div> : ""}
    </>
  );
}

export default AboutPage;
