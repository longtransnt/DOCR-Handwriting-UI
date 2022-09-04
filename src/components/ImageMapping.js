/* Reference: https://github.com/yj-ang/react-image-mapper2/blob/master/src/components/ImageMapper.tsx */
import React, { useRef, useEffect } from "react";

export default function ImageMapper({
  src,
  map,
  fillColor = "rgba(255, 255, 255, 0)",
  strokeColor = "rgba(153, 0, 0, 0.8)",
  lineWidth = 1,
  width,
  height,
  active,
  imgWidth,
  onLoad,
  onClick,
}) {
  const absPos = { position: "absolute", top: 0, left: 0 };
  const styles = {
    container: { position: "relative" },
    canvas: { ...absPos, pointerEvents: "none", zIndex: 2 },
    img: { ...absPos, zIndex: 1, userSelect: "none" },
    map: (onClick && { cursor: "pointer" }) || undefined,
  };
  const img = useRef(null);
  const container = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    initCanvas();
  }, [
    src,
    map,
    fillColor,
    strokeColor,
    lineWidth,
    width,
    height,
    active,
    imgWidth,
  ]);

  const drawrect = (coords, fillColor, lineWidth, strokeColor) => {
    let [left, top, right, bot] = coords;
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(left, top, right - left, bot - top);
    ctx.fillRect(left, top, right - left, bot - top);
    ctx.fillStyle = fillColor;
  };

  const drawpoly = (coords, fillColor, lineWidth, strokeColor) => {
    const coords1 = coords.reduce(
      (a, _, i, s) => (i % 2 ? a : [...a, s.slice(i, i + 2)]),
      []
    );
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    coords1.forEach((c) => ctx.lineTo(c[0], c[1]));
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = fillColor;
  };

  const initCanvas = () => {
    if (!canvas.current || !img.current || !container.current) {
      return;
    }

    if (width) img.current.width = width;

    if (height) img.current.height = height;

    canvas.current.width = width || img.current.clientWidth;
    canvas.current.height = height || img.current.clientHeight;
    container.current.style.width = (width || img.current.clientWidth) + "px";
    container.current.style.height =
      (height || img.current.clientHeight) + "px";

    const ctx = canvas.current.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = fillColor;

    if (onLoad) onLoad();

    renderPrefilledAreas();
  };

  const scaleCoords = (coords) => {
    // calculate scale based on current 'width' and the original 'imgWidth'
    const scale = width && imgWidth && imgWidth > 0 ? width / imgWidth : 1;
    console.log("Scale: " + scale);
    return coords.map((coord) => coord * scale);
  };

  const renderPrefilledAreas = () => {
    map.areas.map((area) => {
      if (area.preFillColor) return;
      drawArea(area);
    });
  };

  const drawArea = (area) => {
    switch (area.shape) {
      case "rect":
        drawrect(
          scaleCoords(area.coords),
          area.preFillColor || fillColor,
          area.lineWidth || lineWidth,
          area.strokeColor || strokeColor
        );
        break;
      case "poly":
        drawpoly(
          scaleCoords(area.coords),
          area.preFillColor || fillColor,
          area.lineWidth || lineWidth,
          area.strokeColor || strokeColor
        );
        break;
    }
  };

  const renderAreas = () => {
    return map.areas.map((area, index) => {
      const scaledCoords = scaleCoords(area.coords);

      return (
        <area
          key={area._id || index}
          shape={area.shape}
          coords={scaledCoords.join(",")}
          href={area.href}
        />
      );
    });
  };

  return (
    <div style={styles.container} ref={container}>
      <img
        style={styles.img}
        src={src}
        useMap={`#${map.name}`}
        alt=""
        ref={img}
      />
      <canvas ref={canvas} style={styles.canvas} />
      <map name={map.name} style={styles.map}>
        {renderAreas()}
      </map>
    </div>
  );
}
