export const abs = (i) => {
  return i >= 0 ? i : -i;
};

export const sum = (i, j) => {
  return i + j;
};

export const factorial = (i) => {
  if (i == 0) {
    return 1;
  } else if (i == 1) {
    return i;
  }
  return i * factorial(i - 1);
};
