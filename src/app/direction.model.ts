// export default class Direction {
//   public Horizontal: number[] = [1, 0];
//   public Vertical: number[] = [0, 1];
//   public Diagonal: number[] = [1, 1];
// }

const DIRECTION = {
  get Horizontal() {
    return [1, 0];
  },
  get Vertical() {
    return [0, 1];
  },
  get Diagonal() {
    return [1, 1];
  },
};

export default DIRECTION;
