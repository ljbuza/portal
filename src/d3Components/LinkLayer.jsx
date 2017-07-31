import * as d3 from "d3";

export default class LinkLayer {
  constructor({
    name = "linklayer",
    parentLayer,
    childrenLayer,
    svgid,
    upmarkerurl,
    downmarkerurl,
    onhover = () => undefined,
    offhover = () => undefined
  }) {
    this.name = name;
    this.upmarkerurl = `url(${upmarkerurl})`;
    this.downmarkerurl = `url(${downmarkerurl})`;
    this.svg = d3.select(svgid);
    this.parentLayer = parentLayer;
    this.childrenLayer = childrenLayer;

    this.link = d3.line().x(d => d.x).y(d => d.y).curve(d3.curveBundle);
    this.linkdefs = [];

    this.onhover = onhover;
    this.offhover = offhover;
    window.addEventListener("resize", this.update.bind(this));
  }
  update() {
    if (
      this.parentLayer.data &&
      this.parentLayer.data.length > 0 &&
      this.childrenLayer.data &&
      this.childrenLayer.data.length > 0
    ) {
      this.updateParentNode();
      this.updateChildNodes();
      this.updateControlNodes();
      this.updateLinkDefs();
    } else {
      this.parentNode = undefined;
      this.childNodes = undefined;
      this.controlNodes = undefined;
      this.linkdefs = [];
    }
    this.draw();
  }
  draw(delay = 0) {
    // console.log("drawing links for ", this.name, this.linkdefs);
    var paths = d3
      .select(`.${this.name}Links`)
      .selectAll(`.${this.name}Link`)
      .data(this.linkdefs, d => d.childid);
    var entry = paths
      .enter()
      .append("g")
      .attr("class", `${this.name}Link`)
      .on("mouseover", (entry, i, nodes) => this.onhover(entry, i, nodes))
      .on("mouseout", (entry, i, nodes) => this.offhover(entry, i, nodes));
    entry
      .append("path")
      .attr("class", "invisiblepath")
      .style("fill", "none")
      .style("stroke", "blue")
      .style("opacity", 0)
      .style("stroke-width", "30px")
      .attr("d", d => this.link(d.nodes));
    entry
      .append("path")
      .attr("class", "visiblepath")
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", "0px")
      .attr("d", d => this.link(d.nodes));

    var exit = paths.exit();
    exit.transition().delay(500).remove();
    exit
      .selectAll("path")
      .attr("marker-mid", "")
      .transition()
      .duration(500)
      .style("stroke-width", "0px");

    var g = d3
      .selectAll(`.${this.name}Link`)
      .data(this.linkdefs, d => d.childid);
    g
      .select(".visiblepath")
      .transition()
      .delay(delay)
      .duration(1000 - delay)
      .attr(
        "marker-mid",
        d =>
          d.dir ? (d.dir === "up" ? this.upmarkerurl : this.downmarkerurl) : ""
      )
      .attr("d", d => this.link(d.nodes))
      // .attr("stroke-dasharray", d => `20,${d.usage < 0.1 ? 5 : 0}`)
      .style(
        "stroke",
        d => (d.health < 0.3 ? "red" : d.health > 0.7 ? "green" : "orange")
      )
      .style("stroke-width", d => `${d.usage * 15 + 2}px`);

    g
      .select(".invisiblepath")
      .transition()
      .delay(delay)
      .duration(1000 - delay)
      .attr("d", d => this.link(d.nodes));
  }
  updateChildNodes() {
    this.childNodes = this.childrenLayer.data.filter(
      d => !this.childrenLayer.selected || d.id === this.childrenLayer.selected
    );
  }
  updateParentNode() {
    this.parentNode = this.parentLayer.data.filter(
      d => d.id === this.parentLayer.selected
    )[0];
  }
  updateLinkDefs() {
    this.linkdefs = this.controlNodes.map(d => {
      var siblingNodes = this.controlNodes.filter(
        cn => d.child.id === cn.child.id
      );
      return {
        health: d.aggregate
          ? siblingNodes
              .map(cn => (cn.health ? cn.health : 0))
              .reduce((a, b) => a + b) / siblingNodes.length
          : d.health ? d.health : 0,
        usage: d.aggregate
          ? siblingNodes
              .map(cn => (cn.usage ? cn.usage : 0))
              .reduce((a, b) => a + b) / siblingNodes.length
          : d.usage ? d.usage : 0,
        type: "link",
        aggregate: d.aggregate,
        childid: `${d.child.id}_${d.id}`,
        id: d.id,
        child: d.child,
        dir: d.aggregate ? null : d.dir,
        nodes: [
          { x: this.parentNode.renderx, y: this.parentNode.rendery },
          { x: d.renderx, y: d.rendery },
          { x: d.child.renderx, y: d.child.rendery }
        ]
      };
    });
  }
  updateControlNodes() {
    this.controlNodes = [];
    var w = this.svg.node().clientWidth,
      dx = w / this.childNodes[0].channelsets.length;

    this.childNodes.map(c => {
      let aggregate = !this.childrenLayer.selected;

      c.channelsets.map((ch, i) => {
        var x = aggregate ? c.renderx : i * dx + dx / 2;
        this.controlNodes = this.controlNodes.concat({
          ...ch,
          id: ch.id,
          aggregate: aggregate,
          dir: ch.dir,
          usage: ch.usage ? ch.usage : 0,
          health: ch.health ? ch.health : 0,
          child: c,
          renderx: x,
          rendery: (c.rendery + this.parentNode.rendery) / 2
        });
        return undefined;
      });
      return undefined;
    });
  }
}
