import { changeLanguage } from 'i18next';
import React from 'react';
import { Button } from 'react-bootstrap';

function LangSelector(props) {
  const changeLang = (lang) => {
    changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <>
      <Button {...props} bsStyle="link" onClick={() => changeLang('en')}>EN</Button>
      <Button {...props} bsStyle="link" onClick={() => changeLang('fr')}>FR</Button>
    </>
  );
}

export default LangSelector;
