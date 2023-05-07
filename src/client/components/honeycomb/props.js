export default class HexProperties {
  constructor(props) {
    this.visible = props?.visible || false;
    this.kind = props?.kind     
    this.color = this.tileKindToColor(this.kind);
    
    if (props && props.ontop && props.ontop.color) {
      const hexColor = props.ontop.color.replace("#", "") || "fcba03";
      var bigint = parseInt(hexColor, 16);
      var cr = (bigint >> 16) & 255;
      var cg = (bigint >> 8) & 255;
      var cb = bigint & 255;
      this.color = window.p5.color(cr, cg, cb)
    }
  }

  setColor(color) {
    this.color = color;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  isBlocking() {
    return this.kind === "mountain" || this.kind === "rock";
  }

  tileKindToColor(kind) {
    switch (kind) {
      case 0:
        return window?.p5?.color(220, 237, 74);
      case 3:
        return window?.p5?.color(74, 150, 237);
      case 2:
        return window?.p5?.color(194, 178, 128);
      case "rock":
        return window?.p5?.color(138, 138, 138);
      case 5:
        return window?.p5?.color(88, 88, 88);
      case 4:
        return window?.p5?.color(10, 158, 10);
      case 1:
        return window?.p5?.color(63, 158, 69);
      default:
        return window?.p5?.color(250, 250, 249);
    }
  }
}
