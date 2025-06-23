'use client';

import { useEffect } from "react";
 
const TawkTo = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/6853095aaec363190de6ed10/1iu25p2vp";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);
 
  return null;
};
 
export default TawkTo;