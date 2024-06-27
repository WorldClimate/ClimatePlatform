"use client";

import { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Marker,
} from "react-simple-maps";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#16A34A", "#FF6405"]);

  type Props = {
    filter: string;
  }
export default function Map({filter}: Props) {
  const [data, setData] = useState([]);

  const markers = [
    {
      markerOffset: -30,
      name: "Oxford",
      coordinates: [-1.5, 53],

    },
    { markerOffset: 15, name: "Lagos", coordinates: [4, 6.5] },
    { markerOffset: 15, name: "Mumbai", coordinates: [74, 18] },
    { markerOffset: 15, name: "New York", coordinates: [-77, 40] },
    { markerOffset: 15, name: "Jakarta", coordinates: [107, -6.8] },
    { markerOffset: 15, name: "San Francisco", coordinates: [-120.5, 36.6] },
  ];

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
      className="relative -top-[68px] sm:-top-24 md:-top-32 lg:-top-44"
    >
      <Sphere
        id="Sphere"
        fill="transparent"
        stroke="#E4E5E6"
        strokeWidth={0.5}
      />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.id);
              return (
                <Tooltip.Provider key={geo.rsmKey}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className="hover:fill-[#13cb56] my-anchor-element"
                        fill={d ? colorScale(d[filter]).toString() : "#F5F4F6"}
                      />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="TooltipContent"
                        sideOffset={5}
                      >
                        {geo.properties.name}
                        <Tooltip.Arrow className="TooltipArrow" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              );
            })
          }
        </Geographies>
      )}
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Link key={name} href={`/location/${name.toLowerCase()}`}>
        <Marker coordinates={coordinates}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fontSize: "12px" }}
            className="fill-[#36454F] dark:fill-foreground"
          >
            {name}
          </text>
        </Marker>
        </Link>
      ))}
    </ComposableMap>
  );
}
