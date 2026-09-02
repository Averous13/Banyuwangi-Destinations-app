import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from  "react-leaflet"
import { renderToString } from "react-dom/server"
import { Badge } from "./ui/badge"
import L from "leaflet"
import "leaflet/dist/leaflet.css";

import { Leaf, Landmark, MapPin, Trees, TreePalm, FerrisWheel } from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const CATEGORY_CONFIG = {
  Pantai:  { Icon: TreePalm,      cssVar: "--color-ocean-blue" },
  Budaya:  { Icon: Landmark,      cssVar: "--color-ijen-purple" },
  Alam:    { Icon: Trees,         cssVar: "--color-bay-green" },
  Buatan:  { Icon: FerrisWheel,   cssVar: "--color-ijen-orange" },
  Konservasi:  { Icon: Leaf,      cssVar: "--color-ijen-green" },
}

const getCategoryIcon = (category, isSelected = false) => {
  const config = CATEGORY_CONFIG[category] || { Icon: MapPin, cssVar: "--color-muted-foreground" }
  const { Icon, cssVar } = config  // ganti `bg` dengan `cssVar`
  const size = isSelected ? 44 : 36
  const iconSize = isSelected ? 20 : 16

  const iconSvg = renderToString(
    <Icon size={iconSize} color="white" strokeWidth={2.2} />
  )

  const html = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: var(${cssVar});
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15);
      cursor: pointer;
      ${isSelected ? `outline: 3px solid white; outline-offset: 2px;` : ""}
    ">
      <div style="display: flex; align-items: center; justify-content: center;">
        ${iconSvg}
      </div>
    </div>
  `

  return L.divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -(size + 4)],
  })
}

const FlyToMarker = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
};

const BigMap = ({destinations, selectedId, onSelect}) => {
    const selected = destinations.find((d) => d._id === selectedId);
    return (
        <MapContainer
            center={[-8.23, 114.35]}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_2rl6_1_49536fc94a08555fc8489135"/>

            {selected && (
                <FlyToMarker position={[selected.location.lat, selected.location.long]} />
            )}

            {destinations.map((dest) => (
                <Marker
                    key={dest._id}
                    position={[dest.location.lat, dest.location.long]}
                    icon={getCategoryIcon(dest.category)}
                    eventHandlers={{ click: () => onSelect(dest._id) }}
                >
                  <Popup className="!p-0">
                    <div className="w-[260px] overflow-hidden rounded-2xl shadow-xl bg-white">
                      
                      {/* IMAGE */}
                      <div className="w-full h-[160px] overflow-hidden">
                        <img
                          src={dest.image.url}
                          alt={dest.image.public_id}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="px-4 pt-3">
                        <h5 className="text-[16px] font-semibold text-gray-900 leading-snug">
                          {dest.name}
                        </h5>

                        <Badge className="my-1">
                          {dest.category}
                        </Badge>
                        
                      </div>

                    </div>
                  </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default BigMap;