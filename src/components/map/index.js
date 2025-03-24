import React, { Component } from "react";
import { withRouter,Redirect } from "react-router-dom";


import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { PacmanLoader } from "react-spinners";


import Cookies from "js-cookie";

import "./index.css";

// Fix Leaflet marker issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

class Map extends Component {
    state ={latitude:null,longitude:null,loading:true,error:null,message:"",redirect:false}

    componentDidMount() {
       const{match}=this.props
       const {lat,lon} = match.params;
       this.fetchData();
       
       if(lat && lon){
           this.setState({latitude:parseFloat(lat),longitude:parseFloat(lon),loading:false})
       }
       else{
        if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition(position => {
             this.setState({latitude: position.coords.latitude,longitude: position.coords.longitude,loading:false})
           
           }, error => {
             this.setState({error: error.message, loading: false})
           });
       }
       else{
           this.setState({error: "Geolocation is not supported by this browser", loading: false})
  
       }
    }



    }

  fetchData=async()=>{
  
          const api= "https://syncthreadbackenddaveed.onrender.com/map-view";
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

      logout=()=>{
        Cookies.remove("jwtTokenSyncthread");
        this.props.history.push("/");
      }


    
  render() {
        const{latitude,longitude,error,loading,message,redirect}=this.state;
        if(redirect){
            return <Redirect to="/not-found"/>
        }
        if(loading){
            return <div className="loading-spinner"> <PacmanLoader /></div>
        }
        if(error){
            return <div>Error: {error}</div>
        }

    return (
        <div>
           <div className="navbarMap">
                {message && <p>{message}</p>}
                <button type="button" onClick={this.logout} className="button-logout">Logout</button>
           </div>

      
           
         
        <MapContainer center={[latitude, longitude]} zoom={5} style={{ height: "100vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]}>
          <Popup>Your are here</Popup>
        </Marker>
      </MapContainer>

      <div className="footer">
                    &copy; {new Date().getFullYear()} DaveedGangi. All rights reserved.

      </div>


      </div>
    );
  }
}

export default withRouter(Map);
