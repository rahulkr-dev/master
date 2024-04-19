import React from "react";

export const useFirstRender = () => {
  const renderRef = React.useRef(true);

  if (renderRef.current) {
    renderRef.current = false;
    return true;
  }

  return renderRef.current;
};
