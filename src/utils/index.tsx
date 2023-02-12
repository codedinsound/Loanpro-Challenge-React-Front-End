import AsyncTimer from './AsyncTimer';

// MARK: Get A Random Number from the random generated Values
const getRandomIntegerFromSet = (dataPoints: number[]): number => {
  const randomIndex = Math.floor(Math.random() * dataPoints.length - 1);

  return dataPoints[randomIndex];
};

export { AsyncTimer, getRandomIntegerFromSet };
