/** 
 * Graph for Dijkstra Algorithm using FastPriorityQueue
 * Assumption: Non-negative Edges
 * 
 * @author: Kevin Olomu
 * @Depends FastPriorityQueue
*/
const FastPriorityQueue = require('fastpriorityqueue');

class Graph {
    constructor() {
        this.nodes = [];
        this.adjList = {};
    }

    addNode(node) {
        this.nodes.push(node);
        this.adjList[node] = [];
    }

    addEdge(sourceNode, targetNode, weight) {
        this.adjList[sourceNode].push({ node: targetNode, weight: weight });
    }

    /** Returns the shortest path with the cost
     * @param {string} startNode - the source node label
     * @param {string} endNode - the target node label
     * @param {string[]} nodes - all nodes to visit
     * @returns [] if no shortest path else [shortestPath, cost]
    */
    shortestPath(startNode, endNode, nodes) {
        const times = {}; // hold record of shortest know times
        const trail = {}; // hold steps we took (for path later)
        const fpqueue = new FastPriorityQueue((a, b) => b[1] > a[1]); // comparator to tell that we are looking for the weights ;)

        for (let i = 0; i < nodes.length; i++) {
            times[nodes[i]] = Infinity;
        }
        times[startNode] = 0; // shortest time to get to start node is 0 (we start here -> no cost!)

        fpqueue.add([startNode, 0]);

        // start checking its neighbors
        while (!fpqueue.isEmpty()) {
            const shortestStep = fpqueue.poll();
            const currentNode = shortestStep[0];

            for (let i = 0; i < this.adjList[currentNode].length; i++) {
                const neighbor = this.adjList[currentNode][i];
                const time = times[currentNode] + neighbor.weight;
                // now check if time is less than the times we currently have stored
                if (time < times[neighbor.node]) {
                    times[neighbor.node] = time;
                    trail[neighbor.node] = currentNode;
                    fpqueue.add([neighbor.node, time]);
                }
            }
        }

        let path = [endNode];
        let previousStep = endNode;

        while (previousStep !== startNode) {
            path.unshift(trail[previousStep]);
            previousStep = trail[previousStep];

            if(previousStep === undefined) {
                path = []; 
                break;
            }
        }

        return [path, times[endNode]];
    }
}

module.exports = Graph;