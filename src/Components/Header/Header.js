import {forwardRef} from 'react'
import { Dropdown } from "react-bootstrap"
import './header.css'

const Header = () => {

    // The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <div 
    className="d-flex"
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </div>
  ));
    return (<div className="header">
            <div className="title">
                Home
            </div>
            <div className="d-flex">
               <div>JD</div> 
               <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        <div>Hi,John Doe</div>
                    </Dropdown.Toggle>

                <Dropdown.Menu as="div">
                <Dropdown.Item eventKey="1">Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
               
            </div>
    </div>)
}

export default Header