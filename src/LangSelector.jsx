import { changeLanguage } from "i18next";
import React from "react";
import { Button } from "react-bootstrap";

function LangSelector({ className }) {
  const changeLang = (lang) => {
    changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <>
      <Button
        className={className}
        bsStyle="link"
        onClick={() => changeLang("en")}
      >
        EN
      </Button>
      <Button
        className={className}
        bsStyle="link"
        onClick={() => changeLang("fr")}
      >
        FR
      </Button>
    </>
  );
}

export default LangSelector;
