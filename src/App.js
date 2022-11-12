import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { TitleBar } from 'react-desktop/windows';
import * as pointData from "./data/sample_data.json";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 28.064570,
    longitude: -80.623040,
    width: "100vw",
    height: "100vh",
    zoom: 16
  });
  const [selectedPoint, setselectedPoint] = useState(null);
  
  return (
    <div>
      <div style={{
      display: "block", width:1500, paddingLeft:0
      }}>
      <h4>TESTING OVERLAY</h4>
      <TitleBar
      title= "Testing Overlay"
      isMaximized="false"
      background="orange"
    />
    </div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1IjoiZHJlc2VuZGVzIiwiYSI6ImNsOXJzN2UyOTAzZjUzb3FjeGFxZDJ6YzcifQ.9oqXuuS2mGdj7CuS9ZHLCQ"}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport=> {
          setViewport(viewport)}}
      >

        {pointData.features.map(datapoint => (
          <Marker 
            key={datapoint.properties.POINT_ID}
            latitude ={datapoint.geometry.coordinates[0]}
            longitude ={datapoint.geometry.coordinates[1]}
          >
            <button class = "marker-btn" onClick={(e) =>{
              e.preventDefault();
              setselectedPoint(datapoint);
            }}>
              <img src="/upload.svg" alt = "Upload Icon"/>
            </button>
          </Marker>
        ))}
        {selectedPoint ? (
          <Popup 
            latitude={selectedPoint.geometry.coordinates[0]} 
            longitude={selectedPoint.geometry.coordinates[1]}
            onClose={() => {
              setselectedPoint(null);

            }}
          >
            <div>
              <h2>{selectedPoint.properties.name}</h2>
              <p>{"DOWNLOAD: "}{selectedPoint.properties.DOWNLOAD}</p>
              <p>{"UPLOAD: "}{selectedPoint.properties.UPLOAD}</p>
              <p>{"PING: "}{selectedPoint.properties.PING}</p>

            </div>
          </Popup>

        ): null}
      </ReactMapGL>
    </div>
  );
}