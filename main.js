class Node {
  constructor(value = null, leftChild = null, rightChild = null) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree {
  constructor(arr) {
    const cleanArr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(cleanArr);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    const midPoint = Math.floor(array.length / 2);
    const root = new Node(array[midPoint]);

    const leftHalf = array.slice(0, midPoint);
    const rightHalf = array.slice(midPoint + 1);

    root.leftChild = this.buildTree(leftHalf);
    root.rightChild = this.buildTree(rightHalf);

    return root;
  }

  pretty() {
    const prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.rightChild !== null) {
        prettyPrint(
          node.rightChild,
          `${prefix}${isLeft ? "│   " : "    "}`,
          false,
        );
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
      if (node.leftChild !== null) {
        prettyPrint(
          node.leftChild,
          `${prefix}${isLeft ? "    " : "│   "}`,
          true,
        );
      }
    };
  }

  insert(value) {
    
    if(this.root === null) {
      this.root = new Node (value);
      return this.root;
    }
    
    let currentNode = this.root;

    while (true) {
      if (currentNode.value === value) {
        return;
      }

      const goLeft = value < currentNode.value;
      const next = goLeft ? currentNode.leftChild : currentNode.rightChild;

      if(next === null) {
        const newNode = new Node(value);
        if(goLeft) {
          currentNode.leftChild = newNode;
        } else {
          currentNode.rightChild = newNode;
        }
        return newNode;
      }

      currentNode = next;
    }
  }

  deleteItem(value) {

  }
}
