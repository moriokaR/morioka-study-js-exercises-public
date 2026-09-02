// 複素数オブジェクトの形 { re: 実部, im: 虚部 } とする

export function add(a, b) {
  return { re: a.re + b.re, im: a.im + b.im };
}

export function sub(a, b) {
  return { re: a.re - b.re, im: a.im - b.im };
}

export function mul(a, b) {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}

export function div(a, b) {
  return {
    re: (a.re * b.re + a.im * b.im) / (b.re * b.re + b.im * b.im),
    im: (-a.re * b.im + a.im * b.re) / (b.re * b.re + b.im * b.im),
  };
}
