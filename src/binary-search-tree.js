const { NotImplementedError } = require('../extensions/index.js');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addWithin(this._root, data);
    function addWithin(node, data) {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      if (data < node.data) node.left = addWithin(node.left, data);
      else node.right = addWithin(node.right, data);
      return node;
    }
  }

  has(data) {
    return searchWithin(this._root, data);
    function searchWithin(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      return data < node.data ? searchWithin(node.left, data) : searchWithin(node.right, data);
    }
  }

  find(data) {
    return findHelp(this._root, data);
    function findHelp(node, data) {
      if (!node) return null;
      if (node.data === data) return node;
      return data < node.data ? findHelp(node.left, data) : findHelp(node.right, data);
    }
  }

  remove(data) {
    this._root = removeNode(this._root, data);
    function removeNode(node, data) {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } 
      else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } 
      else {
        if (!node.left && !node.right) return null;
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minFromRight = node.right;
        while (minFromRight.left) minFromRight = minFromRight.left;
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
      }
    }
  }

  min() {
    if (!this._root) return null;
    let node = this._root;
    while (node.left) node = node.left;
    return node.data;
  }


  max() {
    if (!this._root) return null;
    let node = this._root;
    while (node.right) node = node.right;
    return node.data;
  }
}



module.exports = {
  BinarySearchTree
};