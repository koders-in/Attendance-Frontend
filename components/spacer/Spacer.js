import React from "react";

function Spacer({ height, width = undefined }) {
  return width ? (
    <div style={{ width: `${width}px` }} />
  ) : (
    <div style={{ height: `${height}px` }} />
  );
}

export default Spacer;
