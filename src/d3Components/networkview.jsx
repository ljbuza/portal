import * as d3 from "d3";
import LinkLayer from "./LinkLayer";
import NodeLayer from "./NodeLayer";

export default class NetworkView {
  constructor({ svgid, tableid, data }) {
    this.svgid = svgid;
    this.tableid = tableid;
    this.data = data;

    this.table = d3.select(tableid);

    var svg = d3.select(svgid);
    this.svg = svg;
    svg.append("g").attr("class", "mdLinks");
    svg.append("g").attr("class", "fnLinks");
    svg.append("g").attr("class", "cmtsLayer");
    svg.append("g").attr("class", "mdLayer");
    svg.append("g").attr("class", "fnLayer");

    var defs = svg.append("defs");

    defs
      .append("marker")
      .attr("id", "downarrow")
      .attr("refX", 0)
      .attr("refY", 4)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("orient", "auto")
      .attr("markerWidth", 13)
      .attr("markerHeight", 13)
      .append("path")
      .attr("d", "M0,0 L0,8 L13,4 L0,0");

    defs
      .append("marker")
      .attr("id", "uparrow")
      .attr("refX", 13)
      .attr("refY", 4)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("orient", "auto")
      .attr("markerWidth", 13)
      .attr("markerHeight", 13)
      .append("path")
      .attr("d", "M13,4 L13,8 L0,4 L13,0");

    this.cmtsSelect = this.cmtsSelect.bind(this);
    this.cmtsDeselect = this.cmtsDeselect.bind(this);
    this.mdSelect = this.mdSelect.bind(this);
    this.mdDeselect = this.mdDeselect.bind(this);
    this.fnSelect = this.fnSelect.bind(this);
    this.fnDeselect = this.fnDeselect.bind(this);

    this.onhover = this.onhover.bind(this);
    this.offhover = this.offhover.bind(this);

    this.fnLayer = new NodeLayer({
      name: "fn",
      svgid: this.svgid,
      data: [],
      onselect: this.fnSelect,
      ondeselect: this.fnDeselect,
      onhover: this.onhover,
      offhover: this.offhover
    });
    this.mdLayer = new NodeLayer({
      name: "md",
      svgid: this.svgid,
      data: [],
      onselect: this.mdSelect,
      ondeselect: this.mdDeselect,
      onhover: this.onhover,
      offhover: this.offhover
    });
    this.cmtsLayer = new NodeLayer({
      name: "cmts",
      svgid: this.svgid,
      data: this.data.filter(d => d.type === "CMTS"),
      onselect: this.cmtsSelect,
      ondeselect: this.cmtsDeselect,
      onhover: this.onhover,
      offhover: this.offhover
    });

    this.mdLinks = new LinkLayer({
      name: "md",
      upmarkerurl: "#uparrow",
      downmarkerurl: "#downarrow",
      parentLayer: this.cmtsLayer,
      childrenLayer: this.mdLayer,
      svgid: svgid,
      onhover: this.onhover,
      offhover: this.offhover
    });
    this.fnLinks = new LinkLayer({
      name: "fn",
      upmarkerurl: "#uparrow",
      downmarkerurl: "#downarrow",
      parentLayer: this.mdLayer,
      childrenLayer: this.fnLayer,
      svgid: svgid,
      onhover: this.onhover,
      offhover: this.offhover
    });

    this.updateYs();
    this.cmtsLayer.draw();
    addEventListener("resize", this.updateYs.bind(this));
  }
  updateYs() {
    var h = this.svg.node().clientHeight - 200, dh = h / 3;
    // console.log("updating y", h, dh);
    this.cmtsLayer.y = dh / 2;
    this.cmtsLayer.maxLayerH = dh * 0.4;
    this.mdLayer.y = dh + dh / 2;
    this.mdLayer.maxLayerH = dh * 0.4;
    this.fnLayer.y = 2 * dh + dh / 2;
    this.fnLayer.maxLayerH = dh * 0.4;
  }
  updateTable() {
    this.tabledata = this.cmtsLayer.data
      .filter(n => n.id === this.cmtsLayer.selected)
      .concat(this.mdLinks.controlNodes ? this.mdLinks.controlNodes : [])
      .concat(this.mdLayer.data.filter(n => n.id === this.mdLayer.selected))
      .concat(this.fnLinks.controlNodes ? this.fnLinks.controlNodes : [])
      .concat(this.fnLayer.data.filter(n => n.id === this.fnLayer.selected));
    // console.log(this.tabledata);
    this.tabledata = this.tabledata.map(l => {
      return {
        header: l.child ? `${l.id} - ${l.child.id}` : l.id,
        classname: l.child
          ? `link${l.child.id}`.replace(/ /g, "_") +
              ` link${l.id}_${l.child.type}`
          : l.id.replace(/ /g, "_"),
        keyvals: Object.keys(l)
          .filter(
            k =>
              ![
                "id",
                "x",
                "y",
                "r",
                "child",
                // "aggregate",
                "renderx",
                "rendery",
                "rendercor",
                "renderwidth",
                "renderheight",
                "channelsets",
                "parent",
                "nodes"
              ].includes(k)
          )
          .map(k => ({
            key: k,
            value: l[k]
          }))
      };
    });
    let layer = this.table
      .selectAll(".tableLayer")
      .data(this.tabledata, d => `${d.id}_${d.type}`);

    layer.exit().remove();
    let entry = layer
      .enter()
      .append("table")
      .attr("class", d => d.classname)
      .classed("tableLayer", true)
      .classed("ui", true)
      .classed("table", true)
      .classed("striped", true)
      .classed("fixed", true)
      .classed("celled", true);
    entry
      .append("thead")
      .append("tr")
      .append("th")
      .attr("colspan", 2)
      .text(d => d.header);

    let newkeyvals = entry
      .append("tbody")
      .selectAll(".tableLayerKeyVal")
      .data(d => d.keyvals.filter(d => d.value !== undefined));

    let newkeyval = newkeyvals.enter().append("tr");
    newkeyval.append("td").text(d => d.key);
    newkeyval.append("td").text(d => d.value);
    // this.table.selectAll('div');
  }
  cmtsSelect(entry, i, nodes) {
    this.mdLayer.data = this.data.filter(
      d => d.type === "macdomain" && d.parent === entry.id
    );
    this.mdLayer.draw();
    this.mdLinks.update(); //parentSelected();
    this.updateTable();
  }
  cmtsDeselect(entry, i, nodes) {
    this.mdLayer.delete();
    if (this.fnLayer) this.fnLayer.delete();
    this.fnLinks.update(); //parentDeselected();
    this.mdLinks.update(); //parentDeselected();
    this.updateTable();
  }
  mdSelect(entry, i, nodes) {
    this.fnLayer.data = this.data.filter(
      d => d.type === "fibernode" && d.parent === entry.id
    );
    this.fnLayer.draw();
    this.fnLinks.update(); //parentSelected();
    this.mdLinks.update(); //childSelected();
    this.updateTable();
  }
  mdDeselect(entry, i, nodes) {
    this.fnLayer.delete();
    this.fnLinks.update(); //parentDeselected();
    this.mdLinks.update(); //childDeselected();
    this.updateTable();
  }
  fnSelect(entry, i, nodes) {
    this.fnLinks.update(); //childSelected();
    this.updateTable();
  }
  fnDeselect(entry, i, nodes) {
    this.fnLinks.update(); //childDeselected();
    this.updateTable();
  }
  onhover(entry, i, nodes) {
    this.table
      .selectAll(
        entry.aggregate
          ? `.link${entry.child.id}`.replace(/ /g, "_")
          : entry.child
              ? `.link${entry.id}_${entry.child.type}`
              : `.${entry.id}`.replace(/ /g, "_")
      )
      .selectAll("tr")
      .classed("active", true);
    try {
      scrollTo(
        0,
        this.table
          .select(
            entry.aggregate
              ? `.link${entry.child.id}`.replace(/ /g, "_")
              : entry.child
                  ? `.link${entry.id}_${entry.child.type}`
                  : `.${entry.id}`.replace(/ /g, "_")
          )
          .node()
          .getBoundingClientRect().top -
          100 +
          window.scrollY
      );
    } catch (err) {}
  }
  offhover(entry, i, nodes) {
    this.table
      .selectAll(
        entry.aggregate
          ? `.link${entry.child.id}`.replace(/ /g, "_")
          : entry.child
              ? `.link${entry.id}_${entry.child.type}`
              : `.${entry.id}`.replace(/ /g, "_")
      )
      .selectAll("tr")
      .classed("active", false);
  }
}
