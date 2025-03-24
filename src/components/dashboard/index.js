import {Component} from "react";
import {Redirect,Link} from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";

const states = [
    { id: 1, name: "Current Location" },
  
    // States of India
    { id: 2, name: "Andhra Pradesh", lat: 15.9129, lon: 79.7400 },
    { id: 3, name: "Arunachal Pradesh", lat: 28.2180, lon: 94.7278 },
    { id: 4, name: "Assam", lat: 26.2006, lon: 92.9376 },
    { id: 5, name: "Bihar", lat: 25.0961, lon: 85.3131 },
    { id: 6, name: "Chhattisgarh", lat: 21.2787, lon: 81.8661 },
    { id: 7, name: "Goa", lat: 15.2993, lon: 74.1240 },
    { id: 8, name: "Gujarat", lat: 22.2587, lon: 71.1924 },
    { id: 9, name: "Haryana", lat: 29.0588, lon: 76.0856 },
    { id: 10, name: "Himachal Pradesh", lat: 31.1048, lon: 77.1734 },
    { id: 11, name: "Jharkhand", lat: 23.6102, lon: 85.2799 },
    { id: 12, name: "Karnataka", lat: 15.3173, lon: 75.7139 },
    { id: 13, name: "Kerala", lat: 10.8505, lon: 76.2711 },
    { id: 14, name: "Madhya Pradesh", lat: 23.4733, lon: 77.9470 },
    { id: 15, name: "Maharashtra", lat: 19.7515, lon: 75.7139 },
    { id: 16, name: "Manipur", lat: 24.6637, lon: 93.9063 },
    { id: 17, name: "Meghalaya", lat: 25.4670, lon: 91.3662 },
    { id: 18, name: "Mizoram", lat: 23.1645, lon: 92.9376 },
    { id: 19, name: "Nagaland", lat: 26.1584, lon: 94.5624 },
    { id: 20, name: "Odisha", lat: 20.9517, lon: 85.0985 },
    { id: 21, name: "Punjab", lat: 31.1471, lon: 75.3412 },
    { id: 22, name: "Rajasthan", lat: 27.0238, lon: 74.2179 },
    { id: 23, name: "Sikkim", lat: 27.5320, lon: 88.5122 },
    { id: 24, name: "Tamil Nadu", lat: 11.1271, lon: 78.6569 },
    { id: 25, name: "Telangana", lat: 18.1124, lon: 79.0193 },
    { id: 26, name: "Tripura", lat: 23.9408, lon: 91.9882 },
    { id: 27, name: "Uttar Pradesh", lat: 26.8467, lon: 80.9462 },
    { id: 28, name: "Uttarakhand", lat: 30.0668, lon: 79.0193 },
    { id: 29, name: "West Bengal", lat: 22.9868, lon: 87.8550 },
  
    // Union Territories of India
    { id: 30, name: "Andaman and Nicobar Islands", lat: 11.7401, lon: 92.6586 },
    { id: 31, name: "Chandigarh", lat: 30.7333, lon: 76.7794 },
    { id: 32, name: "Dadra and Nagar Haveli and Daman and Diu", lat: 20.1809, lon: 73.0169 },
    { id: 33, name: "Lakshadweep", lat: 10.5667, lon: 72.6417 },
    { id: 34, name: "Delhi", lat: 28.7041, lon: 77.1025 },
    { id: 35, name: "Puducherry", lat: 11.9416, lon: 79.8083 },
    { id: 36, name: "Jammu and Kashmir", lat: 33.2778, lon: 75.3412 },
    { id: 37, name: "Ladakh", lat: 34.2268, lon: 77.5619 },
  ];
  

class Dashboard extends Component {

    state={message:"",redirect:false,statesData:states}

    componentDidMount(){
        this.fetchData();
    }
    fetchData=async()=>{

        const api= "https://syncthreadbackenddaveed.onrender.com/dashboard";
        const jwtToken=Cookies.get("jwtTokenSyncthread");
        if(!jwtToken){
          
            this.setState({redirect:true});
            return;
        }
        const option={
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + jwtToken
            }

        }

    try{
        const fetchRequest=await fetch(api,option)
        if(fetchRequest.status===401){
            Cookies.remove("jwtTokenSyncthread");
            this.setState({redirect:true});
          
            
        }
        else if(fetchRequest.status===200){
            const data=await fetchRequest.json();
            this.setState({message:data.message})
        }

    }
    catch(error){
        console.log("error fetching the data:",error);
        this.setState({redirect:true});
    }
        
    }
    render(){
        const{message,redirect,statesData}=this.state;
        if(redirect){
            return <Redirect to="/not-found"/>
        }

        return(
            <div>
                <div className="nav">
                {message && <p>{message}</p>}
                Dashboard
                </div>
            <div className="dashboard">
              
                
               
            
            <div className="cards">
                {statesData.map((state)=>
                   
                    <div className="card" key={state.id}>
                        {state.id===1?<Link to ="/map/current">{state.id}. Current Location</Link>
                        :<Link to={`map/${state.lat}/${state.lon}`}>{state.id}. {state.name}</Link>
                        }
                    </div> 
                )
                
            
                }
                </div>


            </div>
           
                <div className="footer">
                    &copy; {new Date().getFullYear()} DaveedGangi. All rights reserved.

                </div>
      
            </div>
        )
    }
}

export default Dashboard;