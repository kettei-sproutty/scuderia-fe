export const getOS = () => {
  let OS = "unknown";
  if (navigator.userAgent.indexOf("Win") != -1) OS = "Windows";
  if (navigator.userAgent.indexOf("Mac") != -1) OS = " Mac OS";
  if (navigator.userAgent.indexOf("X11") != -1) OS = "UNIX";
  if (navigator.userAgent.indexOf("Linux") != -1) OS = "Linux";

  return OS;
};
