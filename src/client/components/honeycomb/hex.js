import HexProperties from "./hex_props";

export default class Hex {
  props;

  constructor(q, r, s) {
    this.q = q;
    this.r = r;
    this.s = s;
    this.props = new HexProperties();
    if (Math.round(q + r + s) !== 0) throw "q + r + s must be 0";
  }

  static offset_to_axial(row, col) {
    var q = col - (row - (row & 1)) / 2;
    var r = row;
    var s = -q - r;
    return { q, r, s };
  }

  static axial_to_offset(q, r) {
    var col = q + (r - (r & 1)) / 2;
    var row = r;
    return row, col;
  }

  add(b) {
    return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
  }

  subtract(b) {
    return new Hex(this.q - b.q, this.r - b.r, this.s - b.s);
  }

  scale(k) {
    return new Hex(this.q * k, this.r * k, this.s * k);
  }

  rotateLeft() {
    return new Hex(-this.s, -this.q, -this.r);
  }

  rotateRight() {
    return new Hex(-this.r, -this.s, -this.q);
  }

  static directions = [
    new Hex(1, 0, -1),
    new Hex(1, -1, 0),
    new Hex(0, -1, 1),
    new Hex(-1, 0, 1),
    new Hex(-1, 1, 0),
    new Hex(0, 1, -1),
  ];

  static direction(direction) {
    return Hex.directions[direction];
  }

  neighbor(direction) {
    return this.add(Hex.direction(direction));
  }

  isNeighbor(b) {
    return this.distance(b) === 1;
  }

  static diagonals = [
    new Hex(2, -1, -1),
    new Hex(1, -2, 1),
    new Hex(-1, -1, 2),
    new Hex(-2, 1, 1),
    new Hex(-1, 2, -1),
    new Hex(1, 1, -2),
  ];

  diagonalNeighbor(direction) {
    return this.add(Hex.diagonals[direction]);
  }

  length() {
    return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
  }

  distance(b) {
    return this.subtract(b).length();
  }

  round() {
    let qi = Math.round(this.q);
    let ri = Math.round(this.r);
    let si = Math.round(this.s);
    let q_diff = Math.abs(qi - this.q);
    let r_diff = Math.abs(ri - this.r);
    let s_diff = Math.abs(si - this.s);
    if (q_diff > r_diff && q_diff > s_diff) {
      qi = -ri - si;
    } else if (r_diff > s_diff) {
      ri = -qi - si;
    } else {
      si = -qi - ri;
    }
    return new Hex(qi, ri, si);
  }

  lerp(b, t) {
    return new Hex(
      this.q * (1.0 - t) + b.q * t,
      this.r * (1.0 - t) + b.r * t,
      this.s * (1.0 - t) + b.s * t
    );
  }

  linedraw(b) {
    let N = this.distance(b);
    let a_nudge = new Hex(
      this.q + 0.000001,
      this.r + 0.000001,
      this.s - 0.000002
    );
    let b_nudge = new Hex(b.q + 0.000001, b.r + 0.000001, b.s - 0.000002);
    let results = [];
    let step = 1.0 / Math.max(N, 1);
    for (let i = 0; i <= N; i++) {
      results.push(a_nudge.lerp(b_nudge, step * i).round());
    }
    return results;
  }
}