/** Private class Edge.
 * @param {Node} nodeStart node which begins the edge.
 * @param {Node} nodeEnd node which terminates the edge.
 * @param {any} id edge's identifier (only string or number).
 * @param {Number} [weight=1] the edge's weight.
 */
class Edge{

  #id;
  #nodeStart;
  #nodeEnd;
  #weight;

  constructor(nodeStart, nodeEnd, id, weight=1){
    this.#id =  id;
    this.#nodeStart = nodeStart;
    this.#nodeEnd = nodeEnd;
    this.#weight = weight;
  }

  /** This method returns edge's identifier.
   * @returns {any} edge's identifier (only string or number).
   */
  getId(){
    return this.#id;
  }

  /** This method returns node which begins the edge.
   * @returns {Node} node which begins the edge.
   */
  getNodeStart(){
    return this.#nodeStart;
  }

  /** This method returns node which terminates the edge.
   * @returns {Node} node which terminates the edge.
   */
  getNodeEnd(){
    return this.#nodeEnd;
  }

  /** This method returns edge's weight.
   * @returns {Number} edge's weight.
   */
   getWeight(){
    return this.#weight;
  }

  /** This method modifies edge's weight.
   * @param {Number} weight new edge's weight.
   */
  setWeight(weight){
    this.#weight = weight;
  }
}

/** Private class Node.
 * @param {any} object the object contained in node.
 * @param {any} id node's identifier (only string or number).
 */
class Node{

  #id;
  #content;

  constructor(object, id){
    this.#content = object;
    this.#id  = id;
  }

  /** This method returns node's identifier.
   * @returns {any} node's identifier (only string or number).
   */
  getId(){
    return this.#id;
  }

  /** This method returns node's content.
   * @returns {any} node's content.
   */
  getContent(){
    return this.#content;
  }
}

/** this class Graph.
 */
module.exports = class Graph{

  #edges;
  #nodes;

  constructor(){
    this.#nodes = new Array();
    this.#edges = new Array();
  }

  static equal(str1, str2){
    str1 = str1.toString();
    str2 = str2.toString();
    return str1.localeCompare(str2) == 0;
  }

  /** This method checks if a node exists in graph.
   * @param {any} id node's identifier (only string or number).
   * @returns {boolean} true if node exists, else false.
   */
  isNode(id){

    let result = false;

    this.#nodes.forEach((node) => {
      if(Graph.equal(node.getId(), id)){
        result = true;
      }
    });

    return result;
  }

  /** This method checks if an edge exists in graph.
   * @param {any} id edge's identifier (only string or number).
   * @returns {boolean} true if edge exists, else false.
   */
  isEdge(id){

    let result = false;

    this.#edges.forEach((item) => {
      if(Graph.equal(item.getId(), id)){
        result = true;
      }
    });

    return result;
  }

  /** This method adds a node in graph.
   * @param {any} object the object contained in node.
   * @param {any} id node's identifier (only string or number).
   */
  addNode(object, id){

    if(object != null && id != null){

      if(!this.isNode(id)){
        this.#nodes.push(new Node(object, id));
      }
      else{
        console.error(`Error : The node's id (id=${id}) is already exists`);
      }
    }
    else{
      console.error("Error : The node is not correctly defined");
    }
  }

  /** This method adds an edge in graph.
   * @param {any} idNodeStart node's identifier which begins the edge.
   * @param {any} idNodeEnd node's identifier which terminates the edge.
   * @param {any} id edge's identifier (only string or number).
   * @param {Number} [weight=1] the edge's weight.
   */
  addEdge(idNodeStart, idNodeEnd, id, weight=1){

    if(idNodeStart != null && idNodeEnd != null && id != null){

      if(this.isNode(idNodeStart) && this.isNode(idNodeEnd)){

        if(!this.isEdge(id)){
          this.#edges.push(new Edge(this.getNode(idNodeStart), this.getNode(idNodeEnd), id, weight));
        }
        else{
          console.error(`Error : The edge's id (id=${id}) is already exists`);
        }
      }
      else{
        console.error("Error : The edge is not create because one of nodes doesn't exist.");
      }
    }
    else{
      console.error("Error : The edge is not correctly defined.");
    }
  }

  /** This method removes a node in graph.
   * @param {any} id node's identifier to be removed.
   */
  removeNode(id){

    let arrayIndex = new Array();

    this.#nodes.forEach((node, index) => {
      if(Graph.equal(node.getId(), id)){
        this.#nodes.splice(index, 1);
      }
    });

    this.#edges.forEach((edge, index) => {
      if(Graph.equal(edge.getNodeStart().getId(), id) || Graph.equal(edge.getNodeEnd().getId(), id)){
        arrayIndex.push(index);
      }
    });

    arrayIndex.forEach((item, index) => {
      this.#edges.splice(item - index, 1);
    });
  }

  /** This method removes an edge in graph.
   * @param {any} id edge's identifier to be removed.
   */
  removeEdge(id){

    this.#edges.forEach((edge, index) => {
      if(Graph.equal(edge.getId(), id)){
        this.#edges.splice(index, 1);
      }
    });
  }

  /** This method returns the list of node's predecessors.
   * @param {any} id node's identifier whose predecessors are sought.
   * @returns {Array} list of node's predecessors.
   */
  getPredecessors(id){

    let predecessors = new Array();

    this.#edges.forEach((edge) => {
      if(Graph.equal(edge.getNodeEnd().getId(), id)){
        predecessors.push(edge.getNodeStart());
      }
    });

    return predecessors;
  }

  /** This method returns the list of node's successors.
   * @param {any} id node's identifier whose predecessors are sought.
   * @returns {Array} list of node's successors.
   */
  getSuccessors(id){

    let successors = new Array();

    this.#edges.forEach((edge) => {
      if(Graph.equal(edge.getNodeStart().getId(), id)){
        successors.push(edge.getNodeEnd());
      }
    });

    return successors;
  }

  /** This method returns a node.
   * @param {any} id node's identifier searched.
   * @returns {Node} node searched.
   */
  getNode(id){

    let result = new Node();

    this.#nodes.forEach((node) => {
      if(Graph.equal(node.getId(), id)){
        result = node;
      }
    });

    return result;
  }

  /** This method returns the list of graph's nodes.
   * @returns {Array} list of graph's nodes.
   */
  getNodes(){
    return this.#nodes;
  }

  /** This method returns an edge.
   * @param {any} id edge's identifier searched.
   * @returns {Edge} edge searched.
   */
  getEdge(id){

    let result = new Edge();

    this.#edges.forEach((edge) => {
      if(Graph.equal(edge.getId(), id)){
        result = edge;
      }
    });

    return result;
  }

  /** This method returns the list of graph's edges.
   * @returns {Array} list of graph's edges.
   */
  getEdges(){
    return this.#edges;
  }
}
