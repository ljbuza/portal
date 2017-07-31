import * as d3 from "d3";

export default class NodeLayer {
  constructor({
    name = "nodelayer",
    svgid,
    data,
    y = 50,
    onselect = () => undefined,
    ondeselect = () => undefined,
    maxLayerH = 100,
    onhover = () => undefined,
    offhover = () => undefined
  }) {
    // draws a layer of nodes ready for selection
    this.name = name;
    this.svg = d3.select(svgid);
    this.y = y;
    this.maxLayerH = maxLayerH;
    this.data = data;
    this.onselect = onselect;
    this.ondeselect = ondeselect;
    this.selected = null;
    this.onhover = onhover;
    this.offhover = offhover;
    window.addEventListener("resize", this.draw.bind(this));
  }
  draw() {
    if (!this.data) return; // if this has no data defined. don't do anything

    var w = this.svg.node().clientWidth,
      dx = w / this.data.length,
      r = Math.min(this.maxLayerH / 2, dx * 0.9 / 2);
    this.h = 2 * r;

    this.data = this.data.map((entry, i) => {
      let x = dx * i + dx / 2, y = this.y + 30;

      let renderx = entry.id === this.selected ? w * 0.5 : x,
        rendery = entry.id === this.selected || this.selected === null
          ? y
          : -200,
        rendercor = entry.id === this.selected ? 10 : r,
        renderwidth = entry.id === this.selected ? w * 0.5 : 2 * r,
        renderheight = entry.id === this.selected ? this.maxLayerH : 2 * r;

      let ret = {
        ...entry,
        x: x,
        y: y,
        r: r,
        renderx: renderx,
        rendery: rendery,
        rendercor: rendercor,
        renderwidth: renderwidth,
        renderheight: renderheight
      };
      return ret;
    });

    // console.log("after processing", this.name, this.data);
    // do the drawing
    var nodes = d3
      .select(`.${this.name}Layer`)
      .selectAll(`.${this.name}Node`)
      .data(this.data, d => d.id);

    // if deleting elements
    var exit = nodes.exit();
    exit.transition().delay(1000).remove();
    exit
      .selectAll("rect")
      .transition()
      .duration(1000)
      .attr("x", d => 0)
      .attr("y", 0)
      .attr("width", 0)
      .attr("height", 0);
    exit.selectAll("text").transition().duration(800).attr("font-size", 0);

    var entry = nodes
      .enter()
      .append("g")
      .attr("class", `${this.name}Node`)
      .attr("transform", (d, i) => `translate(${d.renderx},${d.rendery})`)
      .on("click", (entry, i, nodes) =>
        layertoggleselect(entry, i, nodes, this)
      )
      .on("mouseover", (entry, i, nodes) => this.onhover(entry, i, nodes))
      .on("mouseout", (entry, i, nodes) => this.offhover(entry, i, nodes));

    // if creating new elements
    entry
      .append("rect")
      .attr("class", `${this.name}NodeRect`)
      .style("fill", "gray")
      .style("stroke", "black")
      .attr("x", 0)
      .attr("y", 0)
      .attr("rx", d => d.rendercor)
      .attr("ry", d => d.rendercor)
      .attr("width", 0)
      .attr("height", 0);

    entry
      .append("text")
      .attr("class", `${this.name}NodeID`)
      .text(d => d.id.substr(0, 4))
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("fill", "white")
      .attr("x", 0)
      .attr("y", 0)
      .attr("font-size", 1);

    // entry
    //   .append("text")
    //   .attr("class", `${this.name}Nodetooltip`)
    //   .text(
    //     d => "foobar is a a sorta long string. but not as long as shakespeare"
    //   )
    //   .style("background", "lightsteelblue")
    //   .style("opacity", 0);

    // entry
    //   .on("mouseover", (d, i, nodes) => {
    //     d3
    //       .select(nodes[i])
    //       .select(`.${this.name}Nodetooltip`)
    //       .transition()
    //       .duration(500)
    //       .style("opacity", 1);
    //   })
    //   .on("mouseout", (d, i, nodes) => {
    //     d3
    //       .select(nodes[i])
    //       .select(`.${this.name}Nodetooltip`)
    //       .transition()
    //       .duration(500)
    //       .style("opacity", 0);
    //   });
    nodes = entry.merge(nodes);
    // nodes.on('mouseover', )
    nodes
      .transition()
      .duration(1000)
      .attr("transform", d => `translate(${d.renderx},${d.rendery})`);

    nodes
      .select("rect")
      .transition()
      .duration(1000)
      .attr("x", d => (d.id === this.selected ? w * -0.25 : -d.r))
      .attr("y", d => (d.id === this.selected ? -this.maxLayerH / 2 : -d.r))
      .attr("rx", d => d.rendercor)
      .attr("ry", d => d.rendercor)
      .attr("width", d => d.renderwidth)
      .attr("height", d => d.renderheight);

    nodes
      .select(`.${this.name}NodeID`)
      .transition()
      .duration(1000)
      .attr(
        "font-size",
        (d, i, nodes) =>
          d.id === this.selected ? 20 : Math.min(20, d.r * 2 / 4) //d.id.length)
      )
      .text(d => (d.id === this.selected ? d.id : d.id.substr(0, 4)));
  }
  delete() {
    // console.log("deleting nodes", this.name);
    // causes all nodes to shrink away
    this.selected = null;
    this.data = [];
    this.draw();
  }
}
function layertoggleselect(entry, i, nodes, layer) {
  // swap the status of the selected and call the appropriate handler
  var onsel;
  if (layer.selected === null) {
    onsel = true;
    layer.selected = entry.id;
  } else {
    onsel = false;
    layer.selected = null;
  }
  layer.draw();
  if (onsel) layer.onselect(entry, i, nodes);
  else layer.ondeselect(entry, i, nodes);
}
