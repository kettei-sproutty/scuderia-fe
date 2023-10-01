export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomPeriod = () => {
  const periods: string[] = [
    "seconds",
    "minutes",
    "days",
    "weeks",
    "months",
    "years",
    "decades",
    "centuries",
    "millennia",
  ];

  const indexOfPeriod: number = getRandomInt(0, periods.length - 1);

  return periods[indexOfPeriod];
};
