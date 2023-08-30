export const getURL = (path: string = "") => {
  if (path.charAt(0) === "/") path = path.slice(1);

  let url = process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000/";
  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return `${url}${path}`;
};
