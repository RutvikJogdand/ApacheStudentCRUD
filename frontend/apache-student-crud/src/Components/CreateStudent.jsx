import React from "react"
import axios from "axios"
import styles from "./CreateStudent.module.css"

export default class CreateStudent extends React.Component{

    constructor(props)
    {
        super(props)
        this.state={
            
            name : "",
            bloodGroup: "",
            email: "",
            city: "",
            imageLink: "",
            gender: ""
        }
    }

    handleChange = (event) => {

        const { name, value, checked, type } = event.target;
        const val = type === "checkbox" ? checked : value;
        this.setState({
        
            [name]: val,
        });
    }

    handleAdd = () => {

        console.log(this.state.name)
        
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/students',
            data: {
                name: this.state.name,
                bloodGroup: this.state.bloodGroup,
                email: this.state.email,
                city: this.state.city,
                imageLink: this.state.imageLink,
                gender: this.state.gender
            }
          })
          .then((res)=>console.log(res))
          .catch((err)=> console.log(err));

          alert("Student has been added")
          

    }


    render()
    {
        return(
            <>
                <h2 className={styles.AddEditNewStudent}>Add New Student:</h2>
                <div className={styles.FormBox}>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter Name" />
                    <br/>
                    <input type="text" name="bloodGroup" value={this.state.bloodGroup} onChange={this.handleChange} placeholder="Enter blood group" />
                    <br/>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
                    <br/>
                    <input type="text" name="city" value={this.state.city} onChange={this.handleChange} placeholder="Enter City" />
                    <br/>
                    <input type="url" name="imageLink" value={this.state.imageLink} onChange={this.handleChange} placeholder="Enter Avatar Link" />
                    <br/>
                    Gender:
                    <br/>
                    <input style={{marginLeft: "-150px"}} type="radio" name="gender" value="Male" onChange={this.handleChange}/>
                    <label style={{marginLeft: "-150px"}}>Male</label>
                    <br />
                    <input style={{marginLeft: "-150px"}} type="radio" name="gender" value="Female" onChange={this.handleChange}/>
                    <label style={{marginLeft: "-150px"}}>Female</label>
                    <br/>
                    <input className="btn btn-primary" type="button" value="Add" onClick={this.handleAdd} />
                </div>

            </>
        )
    }
}