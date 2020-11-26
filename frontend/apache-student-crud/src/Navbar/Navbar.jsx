import React from "react"
import {Link} from "react-router-dom"
import styles from "./Navbar.module.css"


export default class Navbar extends React.Component{

    render()
    {
        return(
          <>
            <div className={styles.Navbar}>
                <Link to="/">All Students</Link>
                <Link to="/create-student">Create Student</Link>
                {/* <Link to="/accessories">Accessories</Link>
                <Link to="/about-us">About Us</Link> */}
            </div> 
          </>  
        )
    }
}
