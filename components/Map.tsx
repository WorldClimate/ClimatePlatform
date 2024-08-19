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
  .domain([0.29, 0.68])
  .range(["#78c46e", "#c4996e"]);

export default function Map() {
  const [data, setData] = useState([]);

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
      className="relative sm:-top-55 md:-top-60 lg:-top-60"
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
                    fill={d ? colorScale(d["2017"]).toString() : "#F5F4F6"}
                  />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent" sideOffset={5}>
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
    </ComposableMap>
  );
}