import { useState, useEffect } from "react";
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import RmPopup from './rmPopup'
import L from 'leaflet';

const markerIcon = new L.Icon({
    iconUrl: require("../resource/marker-icon.png"),
    iconSize: [25, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

const GioMap = () =>{


    const [locations, setlocations]=useState([]);
    
    const [popupBtn, setpopupBtn]=useState();
    const [rlSeconds, setrlSeconds]=useState();

    useEffect(() => {
        axios.get(`https://great-rapid-dance.glitch.me/poi`)
        .then((data)=>{
            for (let singleDate of data.data) {
                setlocations(locations => [...locations,singleDate]);
            }
        })
        .catch((err)=>{
            if(err.response.status === 429){
                setrlSeconds(err.response.data.error.time)
                setpopupBtn(true);
            }
        })
    },[]);

    return(
        <div id="visualization">
            <h3 id="mapHeading">Gio Chart</h3>
            
            <MapContainer center={[47.211, -100.23]} zoom={4} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location) => (
                    <Marker position={[location.lat,location.lon]} key={location.name} icon={ markerIcon }>
                    <Popup>
                        {location.name}
                    </Popup>
                </Marker>
                ))}

            </MapContainer>
            <RmPopup trigger={popupBtn} seconds={rlSeconds} setpopupBtn={setpopupBtn}></RmPopup>
        </div>
    )
}

export default GioMap;