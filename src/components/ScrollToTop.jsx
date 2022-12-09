import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location.pathname]);

  return;
}

export default ScrollToTop;
