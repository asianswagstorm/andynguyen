import React  from 'react';
import '../css/Home.css';

const Navbar = () =>  (
  <nav id="nav">
    <ul>
      <li data-testid="nav__li__tag"><a href="#/" className="active"><span className="icon fa-home"></span></a></li>
    </ul>
  </nav>
);

export default Navbar;