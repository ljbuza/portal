import React, { Component } from "react";
import { Segment, Button } from "semantic-ui-react";
import TemplateDataEntry from "./TemplateDataEntry";

export default class TemplateEditor extends Component {
  state = {};
  componentWillMount = () => {
    //fetch the document from the server
    var doc = {
      "doc-type": "template",
      _comment: "this template is used for reasons",
      "template-data": [
        {
          type: "include",
          label: "include",
          include: "EXAMPLE INCLUDE"
        },
        { type: "docsis", label: "MaxCPE", value: 1 },
        {
          type: "snmp",
          label: "SnmpMibObject",
          value: "<max cpe, 3>",
          id: "mib1",
          index: "5"
        },
        {
          type: "aggregate",
          label: "ClassOfService",
          value: [
            { type: "docsis", label: "classID", value: "1" },
            {
              type: "docsis",
              label: "MaxRateDown",
              value: "<down speed, 100>"
            },
            {
              type: "docsis",
              label: "MaxRateUp",
              value: "<up speed, 100>"
            },
            { type: "docsis", label: "PrivacyEnable", value: "0" }
          ]
        }
      ]
    };
    // manipulate the doc pre-rendering
    var templatedata = doc["template-data"];

    // fetch the list of docsis mapping
    var docsismapping = [
      { kw: "SnmpMibObject" }, // if kw is SnmpMibObject its snmp
      { kw: "MaxCPE" }, // else its a normal docsis kw
      // if it has children it's and aggregate
      {
        kw: "ClassOfService",
        children: [
          { kw: "classID" },
          { kw: "MaxRateUp" },
          { kw: "MaxRateDown" },
          { kw: "PriorityUp" },
          { kw: "GuaranteedUp" },
          { kw: "MaxBurstUp" },
          { kw: "PrivacyEnable" },
          {
            kw: "more subchildren!",
            children: [{ kw: "wut wut" }, { kw: "o were goin crzy naw bois" }]
          }
        ]
      }
    ];

    // fetch the list of mibs
    var mibs = [
      {
        id: "mib0",
        name: "Mib0",
        oid: "1.3.6.1.4.1.4491.2.1.6.1.4.1.3.1.6",
        type: "String"
      },
      {
        id: "mib1",
        name: "Mib1",
        oid: "Oid1",
        type: "Integer"
      },
      {
        id: "mib2",
        name: "Mib2",
        oid: "Oid2",
        type: "Integer"
      },
      {
        id: "mib3",
        name: "Mib3",
        oid: "Oid3",
        type: "Integer"
      }
    ];
    this.setState({
      doc: doc,
      docsiskeywords: [...docsismapping, { kw: "include" }],
      templatedata: templatedata,
      mibs: mibs
    });
  };
  getdocsiskws = (ilist, ancestry) => {
    var kws = this.state.docsiskeywords;
    for (var i = 0; i < ilist.length - 1; i++) {
      // var containerIndex = ilist[i];
      // var container = ancestry[i];
      // var entry = container[containerIndex];
      // kws = kws.filter(({ kw }) => kw === entry.label)[0].children;
    }
    // console.log("returning", kws);
    return kws;
  };
  getEntry = i => {
    // console.log("getting entry for ", i);
    var type = typeof i;
    if (type === "number") {
      return {
        entry: this.state.templatedata[i],
        ancestry: [this.state.templatedata],
        ilist: [i]
      };
    }
    var containers = [];
    var ilist = [];
    var container = this.state.templatedata;
    var entry = undefined;
    var indicies = i.split(".").map(ind => {
      return parseInt(ind, 10);
    });
    for (let index of indicies) {
      // console.log(index, entry, container, containers);
      containers.push(container); // save the current container
      ilist.push(index); // save the index for that container
      entry = container[index];
      // console.log("end", container);
      container = entry && entry.value ? entry.value : entry;
    }
    // console.log(entry, containers, ilist);
    return { entry: entry, ancestry: containers, ilist: ilist };
  };
  moveup = i => {
    var { ancestry, ilist } = this.getEntry(i);
    var templatedata = ancestry[0];
    var container = ancestry.pop();
    i = ilist.pop();

    var x = container.splice(i, 1)[0];
    container.splice(i - 1, 0, x);
    this.setState({
      templatedata: templatedata
    });
  };
  movedown = i => {
    var { ancestry, ilist } = this.getEntry(i);
    var templatedata = ancestry[0];
    var container = ancestry.pop();
    i = ilist.pop();

    var x = container.splice(i, 1)[0];
    container.splice(i + 1, 0, x);
    this.setState({
      templatedata: templatedata
    });
  };
  addTemplateDataEntry = i => {
    var { ancestry, ilist } = this.getEntry(i);
    var templatedata = ancestry[0];
    var container = ancestry.pop();
    i = ilist.pop();

    container.splice(i + 1, 0, { label: "", value: "" });
    this.setState({
      templatedata: templatedata
    });
  };
  remove = i => {
    var { ancestry, ilist } = this.getEntry(i);
    var templatedata = ancestry[0];
    var container = ancestry.pop();
    i = ilist.pop();

    container.splice(i, 1);
    this.setState({
      templatedata: templatedata
    });
  };
  updateType = (i, kw) => {
    // console.log("updating type for ", i, kw);
    var { ancestry, ilist } = this.getEntry(i);
    var templatedata = ancestry[0];
    var container = ancestry[ancestry.length - 1];
    i = ilist[ilist.length - 1];

    var docsiskeywords = this.getdocsiskws(ilist, ancestry);
    var docsiskw = docsiskeywords.filter(dkw => {
      return dkw.kw === kw;
    })[0];

    container[i] = {};
    container[i].label = docsiskw.kw;
    container[i].value = "";
    if (docsiskw.kw === "include") {
      container[i].type = "include";
      container[i].include = "";
      delete container[i].value;
    } else if (docsiskw.kw === "SnmpMibObject") {
      container[i].type = "snmp";
      container[i].id = "";
      container[i].index = "";
    } else if (docsiskw.children) {
      container[i].type = "aggregate";
      container[i].value = [];
    } else {
      container[i].type = "docsis";
    }
    this.setState({
      templatedata: templatedata
    });
  };
  updateInclude = (i, include) => {
    var { ancestry, ilist } = this.getEntry(i);
    var templatedata = ancestry[0];
    var container = ancestry.pop();
    i = ilist.pop();

    container[i].include = include;
    this.setState({
      templatedata: templatedata
    });
  };
  updateDocsis = (i, value) => {
    var { ancestry, ilist } = this.getEntry(i);
    var templatedata = ancestry[0];
    var container = ancestry.pop();
    i = ilist.pop();

    container[i].value = value;
    this.setState({
      templatedata: templatedata
    });
  };
  updateSnmp = (i, mib, value, index) => {
    var { ancestry, ilist } = this.getEntry(i);
    var templatedata = ancestry[0];
    var container = ancestry.pop();
    i = ilist.pop();

    container[i].id = mib;
    container[i].value = value;
    container[i].index = index;
    this.setState({
      templatedata: templatedata
    });
  };
  render = () => {
    return (
      <div>
        {this.state.templatedata.length === 0 &&
          <Segment basic>
            <Segment inverted>
              <Button
                fluid
                icon="plus"
                onClick={() => this.addTemplateDataEntry(-1)}
              />
            </Segment>
          </Segment>}
        {this.state.templatedata.map((entry, i) => {
          return (
            <Segment key={i}>

              <TemplateDataEntry
                docsiskeywords={this.state.docsiskeywords}
                mibs={this.state.mibs}
                updateLabel={this.updateType}
                updateSnmp={this.updateSnmp}
                updateInclude={this.updateInclude}
                updateDocsis={this.updateDocsis}
                addnew={this.addTemplateDataEntry}
                remove={this.remove}
                moveup={this.moveup}
                movedown={this.movedown}
                rows={this.state.templatedata.length}
                dataEntryID={i}
                {...entry}
              />
            </Segment>
          );
        })}
      </div>
    );
  };
}
