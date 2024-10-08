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
} from "react-simple-maps";
import * as Tooltip from "@radix-ui/react-tooltip";

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([.02, .43])
  .range(["#b1ddab", "#FF5656"]);

export default function Map({currentYear}: {currentYear: number}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    csv(`/mean_maxtemp_countries_minified.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="world-map">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
        className="relative sm:-top-55 md:-top-30 lg:-top-40"
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
                const temp = d ? Number(d[currentYear.toString()] * 100).toFixed(2) : "N/A";
                const tempDisplay = currentYear +" - "+temp + "°C";
                return (
                  <Tooltip.Provider key={geo.rsmKey}>
                      <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                            outline: 'none'
                        },
                        hover: {
                            outline: 'none',
                            fill: "#add8e6"
                        },
                        pressed: {
                            outline: 'none'
                        }
                      }}
                      className="hover:fill-[#e1e4f3] my-anchor-element"
                      fill={d ? d[currentYear.toString()] ? colorScale(d[currentYear.toString()]).toString() : "#D3D3D3" : "#F5F4F6"}
                    />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="TooltipContent" sideOffset={5}>

                        {geo.properties.name} {tempDisplay}
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
      </ComposableMap>
    </div>
  );
}
