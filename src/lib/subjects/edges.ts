import { Edge, MarkerType } from "reactflow";

export const initEdges: Edge[] = [
  {
    id: "l1-2",
    source: "layer-1",
    target: "layer-2",
    style: {
      stroke: "rgb(172,204,234)",
      strokeWidth: 4,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "rgb(172,204,234))",
    },
  },
  {
    id: "l2-3",
    source: "layer-2",
    target: "layer-3",
    style: {
      stroke: "rgb(172,204,234)",
      strokeWidth: 4,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "rgb(172,204,234))",
    },
  },
  {
    id: "l3-4",
    source: "layer-3",
    target: "layer-4",
    style: {
      stroke: "rgb(126,171,215)",
      strokeWidth: 4,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "rgb(126,171,215)",
    },
  },
  {
    id: "l4-5",
    source: "layer-4",
    target: "layer-5",
    style: {
      stroke: "rgb(126,171,215)",
      strokeWidth: 4,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "rgb(126,171,215)",
    },
  },
  {
    id: "l5-6",
    source: "layer-5",
    target: "layer-6",
    style: {
      stroke: "rgb(42,78,111)",
      strokeWidth: 4,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "rgb(42,78,111)",
    },
  },
  {
    id: "l6-7",
    source: "layer-6",
    target: "layer-7",
    style: {
      stroke: "rgb(42,78,111)",
      strokeWidth: 4,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "rgb(42,78,111)",
    },
  },
  {
    id: "l7-8",
    source: "layer-7",
    target: "layer-8",
    style: {
      stroke: "rgb(42,78,111)",
      strokeWidth: 4,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "rgb(42,78,111)",
    },
  },
  {
    id: "e0-3",
    source: "0",
    target: "3",
    style: {
      stroke: "#fef445",
      strokeWidth: 4,
    },
  },
  {
    id: "e0-4",
    source: "0",
    target: "4",
    style: {
      stroke: "#fef445",
      strokeWidth: 4,
    },
  },
  {
    id: "e0-5",
    source: "0",
    target: "5",
    style: {
      stroke: "#fef445",
      strokeWidth: 4,
    },
  },
  {
    id: "e1-5",
    source: "1",
    target: "5",
    style: {
      stroke: "#b8df86",
      strokeWidth: 4,
    },
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
    style: {
      stroke: "#e6a6bf",
      strokeWidth: 4,
    },
  },
  {
    id: "e0-7",
    source: "0",
    target: "7",
    style: {
      stroke: "#fef445",
      strokeWidth: 4,
    },
  },
  {
    id: "e3-8",
    source: "3",
    target: "8",
    style: {
      stroke: "#fac710",
      strokeWidth: 4,
    },
  },
  {
    id: "e2-6",
    source: "2",
    target: "6",
    style: {
      stroke: "#e6a6bf",
      strokeWidth: 4,
    },
  },
  {
    id: "e7-10",
    source: "7",
    target: "10",
    style: {
      stroke: "#8cd5be",
      strokeWidth: 4,
    },
  },
  {
    id: "e4-10",
    source: "4",
    target: "10",
    style: {
      stroke: "#cee741",
      strokeWidth: 4,
    },
  },
  {
    id: "e4-9",
    source: "4",
    target: "9",
    style: {
      stroke: "#cee741",
      strokeWidth: 4,
    },
  },
  {
    id: "e3-10",
    source: "3",
    target: "10",
    style: {
      stroke: "#fac710",
      strokeWidth: 4,
    },
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    style: {
      stroke: "#bbb2a2",
      strokeWidth: 4,
    },
  },
  {
    id: "e2-13",
    source: "2",
    target: "13",
    style: {
      stroke: "#e6a6bf",
      strokeWidth: 4,
    },
  },
  {
    id: "e9-12",
    source: "9",
    target: "12",
    style: {
      stroke: "#ecdbbc",
      strokeWidth: 4,
    },
  },
  {
    id: "e10-13",
    source: "10",
    target: "13",
    style: {
      stroke: "#e35295",
      strokeWidth: 4,
    },
  },
  {
    id: "e12-15",
    source: "12",
    target: "15",
    style: {
      stroke: "#999abb",
      strokeWidth: 4,
    },
  },
  {
    id: "e13-15",
    source: "13",
    target: "15",
    style: {
      stroke: "#f48e3a",
      strokeWidth: 4,
    },
  },
  {
    id: "e10-16",
    source: "10",
    target: "16",
    style: {
      stroke: "#e35295",
      strokeWidth: 4,
    },
  },
  {
    id: "e10-17",
    source: "10",
    target: "17",
    style: {
      stroke: "#e35295",
      strokeWidth: 4,
    },
  },
  {
    id: "e13-17",
    source: "13",
    target: "17",
    style: {
      stroke: "#f48e3a",
      strokeWidth: 4,
    },
  },
  {
    id: "e12-18",
    source: "12",
    target: "18",
    style: {
      stroke: "#999abb",
      strokeWidth: 4,
    },
  },
  {
    id: "e13-18",
    source: "13",
    target: "18",
    style: {
      stroke: "#f48e3a",
      strokeWidth: 4,
    },
  },
  {
    id: "e15-19",
    source: "15",
    target: "19",
    style: {
      stroke: "#8fd14f",
      strokeWidth: 4,
    },
  },
  {
    id: "e17-19",
    source: "17",
    target: "19",
    style: {
      stroke: "#771333",
      strokeWidth: 4,
    },
  },
  {
    id: "e18-21",
    source: "18",
    target: "21",
    style: {
      stroke: "#66ccb2",
      strokeWidth: 4,
    },
  },
  {
    id: "e21-23",
    source: "21",
    target: "23",
    style: {
      stroke: "#03fbfd",
      strokeWidth: 4,
    },
  },
];
