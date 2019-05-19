/**
 * Find shortest path for Coding Challenge 
 * 
 * @author: Kevin Olomu
 * @depends graph.js, generatedGraph.json
 */
const data = require('./generatedGraph.json')
const Graph = require('./graph');

const graph = new Graph();
const nodes = data.nodes.map(node => node.label);

for (let i = 0; i < nodes.length; i++) {
    graph.addNode(nodes[i]);
}

for (let i = 0; i < data.edges.length; i++) {
    const edge = data.edges[i];
    const sourceNode = nodes[edge.source];
    const targetNode = nodes[edge.target];
    const weight = edge.cost;
    graph.addEdge(sourceNode, targetNode, weight);
    graph.addEdge(targetNode, sourceNode, weight); // ungerichteter Graph...
}

const shortestPath = graph.shortestPath(nodes[18], nodes[246], nodes);
if(shortestPath.length) {
    /* Anmerkung zum Ergebnis: die 14 am Ende sind weg geflogen wegen Ungenauigkeit von JS. 
     Da hier habe hauptsächlich der Weg und nicht die exakte Zeit gefragt war, 
    denke ich, dass diese Implementierung ausreicht. */
    console.log(`Kürzeste Pfad von der Erde zu b3-r7-r4nd7: \n${shortestPath[0].join('->')} in: ${shortestPath[1]}`);
} else {
    console.log('Leider kein Pfad gefunden!');
}

