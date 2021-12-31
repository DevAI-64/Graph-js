# Graph-js

Graph-js is a module to create and manipulate graphs. Nodes can be all objects who you want and edges are oriented and valued at 1 by default. If you wish one graph not oriented, edges must be declared in one direction and then in the other. The documentation is located in the folder graph-js_doc. Future improvements, such as the browse of the graph, should be implemented soon.

## Installation

### Package

Via npm:

```bash
$ npm install graph-js
```

## Getting started

```js
// add module
const Graph = require('graph-js');

// Create function for display graph
function displayGraph(graph){
    // retrieve the list graph's nodes and edges
    let nodes = graph.getNodes();
    let edges = graph.getEdges();

    // display the graph's nodes
    nodes.forEach((node) => {
        // display the id of nodes: content of node
        console.log(`${node.getId()}: ${node.getContent()}`);
    });

    // display the graph's edges
    edges.forEach((edge) => {
        let message = `${edge.getNodeStart().getId()} --- ${edge.getId()} = ${edge.getWeight()} ---> ${edge.getNodeEnd().getId()}`;
        console.log(message);
    });
}

// create a new graph
let graph = new Graph();

// create n1, n2 and n3, three nodes of graph
graph.addNode("I'm n1", "n1");
graph.addNode("I'm n2", "n2");
graph.addNode("I'm n3", "n3");

// create edge e1 such as n1->n2 with weight = 1.5,
// edge e2 such as n3->n2 with weight by default = 1
// and edge e3 such as n1->n3 with weight by default = 1
graph.addEdge("n1", "n2", "e1", 1.5);
graph.addEdge("n3", "n2", "e2");
graph.addEdge("n1", "n3", "e3");

// Display graph
displayGraph(graph);
console.log();

// remove the node n2 and all edges binded to node n2
graph.removeNode("n2");

// Display graph
displayGraph(graph);
console.log();

// remove the edge e3
graph.removeEdge("e3");

// Display graph
displayGraph(graph);
```

## Author

If you have any questions or suggestions, please don't hesitate to contact me : <belaich.david@outlook.fr> .
