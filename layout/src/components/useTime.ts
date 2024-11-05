import { useEffect, useState } from "react";

export default function useTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Effect logic
    const intervaldId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      // Cleanup logic
      window.clearInterval(intervaldId);
    };
  }, []);

  return time;
}
