import React, { useEffect, useState } from "react";
import useGeolocation from "../hooks/useGeolocation";

import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import ReactCountryFlag from "react-country-flag";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { mapLat, mapLng } = useUrlPosition();

  const { cities } = useCities();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      }
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading ..." : "Get your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.cityName}
          >
            <Popup>
              <span>
                {" "}
                <ReactCountryFlag
                  countryCode={city.emoji}
                  svg
                  style={{
                    width: "2em",
                    height: "2em",
                  }}
                />
              </span>{" "}
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition}></ChangeCenter>
        <DetectClick></DetectClick>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const naviagate = useNavigate();
  useMapEvents({
    click: (e) => naviagate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
