"use client";
import { useEffect } from "react";

const NotFoundPage = () => {
  useEffect(() => {
    window.location.replace("https://www.scuderia-fe.com/coming-soon");
  }, []);

  return <></>;
};

export default NotFoundPage;
