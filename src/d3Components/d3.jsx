import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import NetworkView from "./networkview";

const datafromserver = [
  {
    type: "CMTS",
    id: "CMTS1",
    somedata1: "cmts specific - foo",
    somedata2: "cmts specific - bar"
  },
  {
    type: "CMTS",
    id: "CMTS2"
  },
  {
    type: "CMTS",
    id: "CMTS3"
  },
  {
    type: "CMTS",
    id: "CMTS4"
  },
  {
    type: "CMTS",
    id: "CMTS5"
  },
  {
    type: "CMTS",
    id: "CMTS6"
  },
  {
    type: "macdomain",
    id: "md10",
    parent: "CMTS1",
    channelsets: [
      { id: "A", dir: "up", health: 0.1, usage: 0.05 },
      {
        id: "B",
        dir: "down",
        health: 0.1,
        usage: 0.05,
        channelspecificmetric: "50%"
      }
    ],
    somemacdomaindata: "md specific data - foo"
  },
  {
    type: "macdomain",
    id: "md11",
    parent: "CMTS1",
    channelsets: [
      { id: "A", dir: "up", health: 0.5, usage: 0.5 },
      { id: "B", dir: "down" }
    ]
  },
  {
    type: "macdomain",
    id: "md12",
    parent: "CMTS2",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md13",
    parent: "CMTS2",
    channelsets: [
      { id: "A", dir: "up", health: 0.5, usage: 0.5 },
      { id: "B", dir: "down" }
    ]
  },
  {
    type: "macdomain",
    id: "md14",
    parent: "CMTS2",
    channelsets: [
      { id: "A", dir: "up" },
      { id: "B", dir: "down", health: 0.5, usage: 0.5 }
    ]
  },
  {
    type: "macdomain",
    id: "md15",
    parent: "CMTS2",
    channelsets: [
      { id: "A", dir: "up" },
      { id: "B", dir: "down", health: 0.5, usage: 0.5 }
    ]
  },
  {
    type: "macdomain",
    id: "md16",
    parent: "CMTS2",
    channelsets: [
      { id: "A", dir: "up", health: 0.5, usage: 0.5 },
      { id: "B", dir: "down" }
    ]
  },
  {
    type: "macdomain",
    id: "md17",
    parent: "CMTS2",
    channelsets: [
      { id: "A", dir: "up", health: 1, usage: 1 },
      { id: "B", dir: "down" }
    ]
  },
  {
    type: "macdomain",
    id: "md18",
    parent: "CMTS2",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md19",
    parent: "CMTS2",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md20",
    parent: "CMTS2",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md21",
    parent: "CMTS2",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md22",
    parent: "CMTS2",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md23",
    parent: "CMTS3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md24",
    parent: "CMTS3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md25",
    parent: "CMTS3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md26",
    parent: "CMTS3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md27",
    parent: "CMTS3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md28",
    parent: "CMTS3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md29",
    parent: "CMTS3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md30",
    parent: "CMTS3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md31",
    parent: "CMTS3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md32",
    parent: "CMTS3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md33",
    parent: "CMTS3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md34",
    parent: "CMTS4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md35",
    parent: "CMTS4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md36",
    parent: "CMTS4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md37",
    parent: "CMTS4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md38",
    parent: "CMTS4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md39",
    parent: "CMTS4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md40",
    parent: "CMTS4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md41",
    parent: "CMTS4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md42",
    parent: "CMTS4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md43",
    parent: "CMTS4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md44",
    parent: "CMTS4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md45",
    parent: "CMTS5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md46",
    parent: "CMTS5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md47",
    parent: "CMTS5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md48",
    parent: "CMTS5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md49",
    parent: "CMTS5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md50",
    parent: "CMTS5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md51",
    parent: "CMTS5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md52",
    parent: "CMTS5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md53",
    parent: "CMTS5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md54",
    parent: "CMTS5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md55",
    parent: "CMTS5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md56",
    parent: "CMTS6",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md57",
    parent: "CMTS6",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md58",
    parent: "CMTS6",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md59",
    parent: "CMTS6",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "macdomain",
    id: "md60",
    parent: "CMTS6",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },

  {
    type: "fibernode",
    parent: "md10",
    id: "fn1",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }],
    somefndata: "fn specific data - bar"
  },
  {
    type: "fibernode",
    parent: "md11",
    id: "fn2",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md12",
    id: "fn3",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md13",
    id: "fn4",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md14",
    id: "fn5",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md15",
    id: "fn6",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md16",
    id: "fn7",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md17",
    id: "fn8",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md18",
    id: "fn91",
    channelsets: [
      { id: "A", dir: "up" },
      { id: "B", dir: "down" },
      { id: "A1", dir: "up" },
      { id: "A2", dir: "up" },
      { id: "A3", dir: "up" },
      { id: "A4", dir: "up" },
      { id: "A5", dir: "up" },
      { id: "A6", dir: "up" },
      { id: "A7", dir: "up" },
      { id: "A8", dir: "up" },
      { id: "A9", dir: "up" },
      { id: "A10", dir: "up" },
      { id: "A11", dir: "up" },
      { id: "A12", dir: "up" },
      { id: "A13", dir: "up" },
      { id: "A14", dir: "up" },
      { id: "A15", dir: "up" }
    ]
  },
  {
    type: "fibernode",
    parent: "md18",
    id: "fn92",
    channelsets: [
      { id: "A", dir: "up" },
      { id: "B", dir: "down" },
      { id: "A1", dir: "up" },
      { id: "A2", dir: "up" },
      { id: "A3", dir: "up" },
      { id: "A4", dir: "up" },
      { id: "A5", dir: "up" },
      { id: "A6", dir: "up" },
      { id: "A7", dir: "up" },
      { id: "A8", dir: "up" },
      { id: "A9", dir: "up" },
      { id: "A10", dir: "up" },
      { id: "A11", dir: "up" },
      { id: "A12", dir: "up" },
      { id: "A13", dir: "up" },
      { id: "A14", dir: "up" },
      { id: "A15", dir: "up" }
    ]
  },
  {
    type: "fibernode",
    parent: "md18",
    id: "fn93",
    channelsets: [
      { id: "A", dir: "up" },
      { id: "B", dir: "down" },
      { id: "A1", dir: "up" },
      { id: "A2", dir: "up" },
      { id: "A3", dir: "up" },
      { id: "A4", dir: "up" },
      { id: "A5", dir: "up" },
      { id: "A6", dir: "up" },
      { id: "A7", dir: "up" },
      { id: "A8", dir: "up" },
      { id: "A9", dir: "up" },
      { id: "A10", dir: "up" },
      { id: "A11", dir: "up" },
      { id: "A12", dir: "up" },
      { id: "A13", dir: "up" },
      { id: "A14", dir: "up" },
      { id: "A15", dir: "up" }
    ]
  },
  {
    type: "fibernode",
    parent: "md19",
    id: "fn10",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md20",
    id: "fn11",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md21",
    id: "fn12",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md22",
    id: "fn13",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md23",
    id: "fn14",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md24",
    id: "fn15",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md25",
    id: "fn16",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md26",
    id: "fn17",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md27",
    id: "fn18",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md28",
    id: "fn19",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md29",
    id: "fn20",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md30",
    id: "fn21",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md31",
    id: "fn22",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md32",
    id: "fn23",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md33",
    id: "fn24",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md34",
    id: "fn25",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md35",
    id: "fn26",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md36",
    id: "fn27",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md37",
    id: "fn28",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md38",
    id: "fn29",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md39",
    id: "fn30",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md40",
    id: "fn31",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md41",
    id: "fn32",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md42",
    id: "fn33",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md43",
    id: "fn34",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md44",
    id: "fn35",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md45",
    id: "fn36",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md46",
    id: "fn37",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md47",
    id: "fn38",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md48",
    id: "fn39",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md49",
    id: "fn40",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md50",
    id: "fn41",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md51",
    id: "fn42",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md52",
    id: "fn43",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md53",
    id: "fn44",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md54",
    id: "fn45",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md55",
    id: "fn46",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md56",
    id: "fn47",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md57",
    id: "fn48",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md58",
    id: "fn49",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md59",
    id: "fn50",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn511",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn512",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn513",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn514",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn515",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn516",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn517",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn518",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn519",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn5110",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn5111",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn5112",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  },
  {
    type: "fibernode",
    parent: "md60",
    id: "fn5113",
    channelsets: [{ id: "A", dir: "up" }, { id: "B", dir: "down" }]
  }
];

export default class D3 extends Component {
  componentDidMount() {
    this.graphic = new NetworkView({
      svgid: "#d3container",
      tableid: "#d3table",
      data: datafromserver
    });
  }
  render() {
    return (
      <div>
        <div id="header">
          <Container id="header_content">
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column style={{ position: "fixed" }}>
                  <h2 className="ui header">
                    Network View
                    <div className="sub header">
                      View the Network to your hearts extent
                    </div>
                  </h2>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
        <Grid>
          <Grid.Column width={10}>
            <svg
              id="d3container"
              style={{ position: "fixed", left: "0px", top: "100px" }}
              width="62.5%"
              height="100vh"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <div id="d3table" />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
