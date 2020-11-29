import Link from "next/link";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

 
/** 
 * Render Header component
 * @component
 * @returns Footer component
*/
const Header = () => (
    <div>        
    <footer id="main_footer">		
            <div id="footer_copyright">
                <div className="container">			
                    <div className="row">			
                        <div className="col-lg-12 copyright-area">
                            <p>© Copyright 2020, Lead Management System All Rights Reserved | Design &amp; Devloped By  Akalma technologies</p>	 
                        </div>
                    </div>
                </div>
            </div>
            
        </footer>
    </div>
);

export default Header;