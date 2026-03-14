import { useEffect, useState } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const finish = () => {
      window.setTimeout(() => setVisible(false), 420);
    };

    if (document.readyState === "complete") {
      finish();
      return;
    }

    window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, []);

  if (!visible) return null;

  return (
    <div className="portfolio-page-loader">
      <LoadingScreen label="Loading" />
    </div>
  );
}
