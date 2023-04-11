const compareObjects = (objectA: {}, objectB: {}): boolean => {
  return JSON.stringify(objectA) === JSON.stringify(objectB);
};

export default compareObjects;
