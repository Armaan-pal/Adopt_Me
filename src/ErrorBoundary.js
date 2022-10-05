import { Component } from "react";
import { Link, Navigate } from "react-router-dom";




class ErrorBoundary extends Component {
    // state = {hasError: false,}

    state = {hasError : false,  Navigate: false};
    static getDerivedStateFromError(){
        return {hasError  : true}
    }
    componentDidCatch(error, info){
        console.log ("ErrorBoundary caught as error", error, info);
        if (this.state.hasError){
            setTimeout(()=> this.setState({Navigate: true}),5000)
        }
    }
    render(){

        if(this.state.Navigate){
            return <Navigate to="/"/>;}
        
    

        if(this.state.hasError){
            return(
                <h2>
                    there was an error with this list. <Link to='/'>Click here</Link>{" "}
                    back to homepage or wait for 5 sec.
                </h2>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;