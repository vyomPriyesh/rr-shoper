import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      // Instantly resets scroll position to the top on page change
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback if Lenis hasn't loaded yet
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}
