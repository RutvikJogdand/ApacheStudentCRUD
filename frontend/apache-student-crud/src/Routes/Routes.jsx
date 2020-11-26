import React from "react"
import {Route, Switch} from "react-router-dom"
import AllStudents from "../Components/AllStudents"
import CreateStudent from "../Components/CreateStudent"
import EditStudent from "../Components/EditStudent"


export default class Routes extends React.Component{

    render()
    {
        return(
            <div>
                <Switch>
                    <Route path="/" exact render={()=> <AllStudents/> } />
                    <Route path="/create-student" render={(props)=> <CreateStudent {...props} /> } />
                    <Route path="/edit-student/:id" render={(props)=> <EditStudent {...props}/>} />
                </Switch>      
            </div>
        )
    }
}