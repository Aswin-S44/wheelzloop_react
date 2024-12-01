import { useState, useEffect } from "react";

function useMobileView() {
  const [isMobile, setIsMobile] = useState(false);

  const checkMobileView = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkMobileView();
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  return isMobile;
}

export default useMobileView;
