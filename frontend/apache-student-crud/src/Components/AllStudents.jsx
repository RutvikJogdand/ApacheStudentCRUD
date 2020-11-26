import React from "react"
import axios from "axios"
import styles from "./AllStudents.module.css"
import { Link } from "react-router-dom"


export default class AllStudents extends React.Component{

    constructor(props)
    {
        super(props)
        this.state={

            studentsArr: [],
            displayDiv: false
        }
    }

    componentDidMount(){

        axios.get("http://localhost:8000/api/students")
        .then((res)=> 
            {
                console.log(res)
                this.setState({

                    studentsArr: res.data
                })
            }
        )
        .catch((err)=> console.log(err))
    }

    handleDelete= (userId) =>{


        axios.delete(`http://localhost:8000/api/student/${userId}`)
        .then( (res)=>{

            console.log(res)
            axios.get("http://localhost:8000/api/students")
            .then((res)=> 
                {
                    console.log(res)
                    this.setState({
    
                        studentsArr: res.data
                    })
                }
            )
            .catch((err)=> console.log(err))
            
        } )
        .catch((err)=>{

            console.log(err)
        })

    }

   
    render()
    {
        return(
            <div className={styles.StudentsContainer} >
                {this.state.studentsArr.map(item => {
                    return(
                        <div key={item._id} className={styles.DisplayEdit} >
                            <div>
                                <img style={{borderRadius: "200px"}} src={item.imageLink} alt="Avatar" height="150px" />
                            </div>
                            <h3> {item.name} </h3>
                            <small> {item.email} </small>
                            <br/><br/>
                            <h4>Details:</h4>
                            <hr/>
                            <div className={styles.UserDetails}> 
                                <p> <small>Gender: <br/> </small> {item.gender} </p>
                                <p> <small>City: <br/> </small> {item.city} </p>
                                <p> <small>Blood Group: <br/> </small> {item.bloodGroup} </p>
                            </div>
                            <div className={styles.EditDelete}>
                                <button onClick={()=> this.handleDelete(item._id)} style={{borderRadius: "100px"}} className="btn btn-danger">
                                    <i className="fa fa-remove"></i>
                                </button>
                                <button  onClick={this.handleEdit} style={{borderRadius: "100px"}} className="btn btn-primary">
                                     <Link style={{textDecoration: "none", color: "white"}} to={`/edit-student/${item._id}`}>  
                                        <i  className="fa fa-edit"></i>
                                     </Link>
                                </button>
                            </div> 
                        </div>
                    )
                })}
            </div>
        )
    }
}