import * as d3 from "d3";

export default class Graphic2 {
  constructor(node, data) {
    this.cmtsh = 0;
    this.h = 0;

    console.log("updating this.h", this.h, " 1");
    this.svg = d3.select(node).append("svg").attr("width", "100%");
    this.w = this.svg.node().clientWidth;
    this.cmtsLayer = this.svg.append("g").attr("class", "cmtsLayer");
    this.mdLayer = this.svg.append("g").attr("class", "mdLayer");
    this.fnLayer = this.svg.append("g").attr("class", "fnLayer");
    this.data = data;

    this.getCMTS();
    this.displayCMTS();

    this.state = "CMTS_VIEW";
    window.onresize = this.onresize;
  }
  getCMTS(data) {
    var n = this.svg.node(), svgW = n.clientWidth;
    var dw = 30, dh = 40, r = 47, cols = Math.floor(svgW / (dw + 2 * r));

    this.cmtsList = this.data
      .filter(entry => entry.type === "CMTS")
      .map((entry, i) => {
        var col = i % cols,
          x = col * (dw + 2 * r) + dw + r,
          row = Math.floor(i / cols),
          y = row * (dh + 2 * r) + dh + r;
        return { x: x, y: y, r: 50, ...entry };
      });
    this.h = Math.max(...this.cmtsList.map(entry => entry.y)) + 2 * r;
    console.log("updating this.h", this.h, " 2");
    this.cmtsh = this.h;
  }
  displayCMTS() {
    console.log("displaying cmts", this.h);
    d3
      .select(".cmtsLayer")
      .selectAll(".CMTS")
      .data(this.cmtsList)
      .enter()
      .append("circle")
      .attr("class", "CMTS")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .on("click", (entry, i, cmtss) => {
        return togglecmtsview(entry, i, cmtss, this);
      })
      .call(
        d3
          .zoom()
          .on("zoom", (entry, i, cmtss) => zoomcmts(entry, i, cmtss, this))
      );
    this.svg.attr("height", this.h);
  }
  getMDs(cmtsid) {
    console.log("getting macdomains", this.state);
    var n = this.svg.node(), svgW = n.clientWidth;
    var dh = 0, dwfrac = 0.1; // margin in width / height

    this.mdList = this.data.filter(
      entry => entry.type === "macdomain" && entry.parent === cmtsid
    );

    var cols = this.mdList.length; // all macdomains will be on a line
    var dw = svgW / cols * dwfrac;
    var r = Math.min(50, svgW / cols * (1 - dwfrac) / 2);
    var y = this.h + dh + r; // where all the mds go
    console.log("md ys should be", y);
    this.cmtsh = this.h;
    this.h = y + 2 * r; // how big the svg needs to be
    console.log("updating this.h", this.h, " 3");

    this.mdList = this.mdList.map((entry, i) => {
      var x = i * (dw + 2 * r) + dw + r;
      return { x: x, y: y, r: r, ...entry };
    });
    console.log("found", this.mdList);
  }
  growMDs() {
    console.log("growwing mds", this.h);
    this.svg.attr("height", this.h);
    d3
      .select(".mdLayer")
      .selectAll(".MD")
      .data(this.mdList)
      .enter()
      .append("circle")
      .attr("class", "MD")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 0)
      .on("click", (entry, i, mds) => {
        return togglemdview(entry, i, mds, this);
      })
      .call(
        d3.zoom().on("zoom", (entry, i, mds) => zoommd(entry, i, mds, this))
      )
      .transition()
      .duration(1000)
      .attr("r", d => d.r);
  }
  shrinkMDs() {
    d3.selectAll(".MD").transition().duration(1000).attr("r", 0).remove();
    this.h = this.cmtsh;
    console.log("updating this.h", this.h, " 4");
    this.svg.attr("height", this.h);
  }
  getFNs(mdid) {
    console.log("getting fibernodes", this.state);
    var n = this.svg.node(), svgW = n.clientWidth;
    var dh = 0, dwfrac = 0.1; // margin in width / height

    this.fnList = this.data.filter(
      entry => entry.type === "fibernode" && entry.parent === mdid
    );

    var cols = this.fnList.length; // all nodes will be on a line
    var dw = svgW / cols * dwfrac;
    var r = Math.min(50, svgW / cols * (1 - dwfrac) / 2);
    var y = this.h + dh + r; // where all the mds go
    console.log("fn y should be at", y);
    this.mdh = this.h;
    this.h = y + 2 * r; // how big the svg needs to be
    console.log("updating this.h", this.h, " 5");

    this.fnList = this.fnList.map((entry, i) => {
      var x = i * (dw + 2 * r) + dw + r;
      return { x: x, y: y, r: r, ...entry };
    });
    console.log("found", this.fnList);
  }
  growFNs() {
    console.log("growwing fns", this.h);
    this.svg.attr("height", this.h);
    d3
      .select(".fnLayer")
      .selectAll(".FN")
      .data(this.fnList)
      .enter()
      .append("circle")
      .attr("class", "FN")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 0)
      .transition()
      .duration(1000)
      .attr("r", d => d.r);
  }
  shrinkFNs() {
    d3.selectAll(".FN").transition().duration(1000).attr("r", 0).remove();
    this.h = this.mdh;
    console.log("updating this.h", this.h, " 6");
    this.svg.attr("height", this.h);
  }
}
function togglecmtsview(entry, i, cmtss, graphic) {
  console.log("toggling", graphic.state);
  if (graphic.state === "CMTS_VIEW") {
    transitionToMD(entry, i, cmtss, graphic);
  } else {
    transitionFromMD(entry, i, cmtss, graphic);
  }
}
function transitionToMD(entry, i, cmtss, graphic) {
  console.log("transitionToMD", graphic.state);
  d3.selectAll(cmtss).each((obj, j) => {
    if (i === j) {
      // this flies to the center
      d3
        .select(cmtss[j])
        .transition()
        .duration(1000)
        .attr("cx", graphic.w / 2)
        .attr("cy", 50);
    } else {
      // everyone else flies off screen
      d3
        .select(cmtss[j])
        .transition()
        .duration(1000)
        .attr("cx", -100)
        .attr("cy", -100);
    }
  });
  graphic.state = "MD_VIEW";

  // grow the mac domains
  graphic.getMDs(entry.id);
  graphic.growMDs();
}

function transitionFromMD(entry, i, cmtss, graphic) {
  console.log("transitionFromMD");
  d3.selectAll(cmtss).each((obj, j) => {
    d3
      .select(cmtss[j])
      .transition()
      .duration(1000)
      .attr("cx", obj.x)
      .attr("cy", obj.y);
  });
  graphic.state = "CMTS_VIEW";
  graphic.shrinkFNs();
  graphic.shrinkMDs();
}
function zoomcmts(entry, i, cmtss, graphic) {
  if (d3.event.transform.k > 1.3) {
    graphic.state = "MD_VIEW";
    transitionToMD(entry, i, cmtss, graphic);
  } else {
    graphic.state = "CMTS_VIEW";
    transitionFromMD(entry, i, cmtss, graphic);
  }
}
function togglemdview(entry, i, mds, graphic) {
  console.log("togglemdview->", entry, i, mds);
  if (graphic.state === "MD_VIEW") {
    transitionToFN(entry, i, mds, graphic);
  } else {
    transitionFromFN(entry, i, mds, graphic);
  }
}
function transitionToFN(entry, i, mds, graphic) {
  console.log("transitionToFN", graphic.state);
  d3.selectAll(mds).each((obj, j) => {
    if (i === j) {
      // this flies to the center
      d3
        .select(mds[j])
        .transition()
        .duration(1000)
        .attr("cx", graphic.w / 2)
        .attr("cy", obj.y);
    } else {
      // everyone else flies off screen
      d3
        .select(mds[j])
        .transition()
        .duration(1000)
        .attr("cx", -100)
        .attr("cy", -100);
    }
  });
  graphic.state = "FN_VIEW";

  // grow the mac domains
  graphic.getFNs(entry.id);
  graphic.growFNs();
}
function transitionFromFN(entry, i, mds, graphic) {
  console.log("transitionFromFN");
  d3.selectAll(mds).each((obj, j) => {
    d3
      .select(mds[j])
      .transition()
      .duration(1000)
      .attr("cx", obj.x)
      .attr("cy", obj.y);
  });
  graphic.state = "MD_VIEW";
  graphic.shrinkFNs();
}
function zoommd(entry, i, mds, graphic) {
  console.log("zoommd->", entry, i, mds);
}
