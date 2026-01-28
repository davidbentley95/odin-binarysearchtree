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
    if(this.root === null) {
      return false;
    }

    let current = this.root;
    let parent = null;

    //find node in tree
    while(current !== null && current.value !== value) {
      parent = current;
      current = value < current.value ? current.leftChild : current.rightChild;
    }
    
    //if we have a null node, we did not find the value
    if(current === null) {
      return null;
    }

    const hasLeft = current.leftChild !== null;
    const hasRight = current.rightChild !== null;

    //has no children
    if(!hasLeft && !hasRight) {
      if(parent === null){
        this.root = null; 
      } else if(parent.leftChild === current) {
        parent.leftChild = null;
      } else {
        parent.rightChild = null;
      }
      return true;
    }

    //has 1 left child
    if(hasLeft && !hasRight) {
      if(parent === null) {
        this.root = current.leftChild;
      } else if(parent.leftChild === current) {
        parent.leftChild = current.leftChild;
      } else {
        parent.rightChild = current.leftChild;
      }
    }

    //has 1 right child
    if(!hasLeft && hasRight) {
      if(parent === null) {
        this.root = current.rightChild;
      } else if(parent.leftChild === current) {
        parent.leftChild = current.rightChild;
      } else {
        parent.rightChild = current.rightChild;
      }
      return true;
    }

    // Two children — inorder successor
    let successorParent = current;
    let successor = current.rightChild;

    while (successor.leftChild !== null) {
      successorParent = successor;
      successor = successor.leftChild;
    }

    // Detach successor from its old position
    if (successorParent !== current) {
      successorParent.leftChild = successor.rightChild;
      successor.rightChild = current.rightChild;
    }

    successor.leftChild = current.leftChild;

    // Replace current with successor
    if (parent === null) {
      this.root = successor;
    } else if (parent.leftChild === current) {
      parent.leftChild = successor;
    } else {
      parent.rightChild = successor;
    }
    return true;
    }

    find(value) {

      let currentNode = this.root;

      while(currentNode !== null && currentNode.value !== value) {
        currentNode = value < currentNode.value ? currentNode.leftChild : currentNode.rightChild;
      }

      return currentNode;
    }

    levelOrderForEach(callback) {

      if(typeof callback !== "function") throw new Error("A callback function is required");
      
      if(this.root === null) return null;

      const queue = [];

      queue.push(this.root);

      while(queue.length > 0) {
        callback(queue[0]);

        const leftChild = queue[0].leftChild;
        const rightChild = queue[0].rightChild;

        if(leftChild) queue.push(leftChild);

        if(rightChild) queue.push(rightChild);

        queue.shift();
      }

    }

    preOrderForEach(callback, node = this.root) {
      if(typeof callback !== "function") throw new Error("A callback function is required");
      
      if(node === null) return;

      callback(node);
      this.preOrderForEach(callback, node.leftChild);
      this.preOrderForEach(callback, node.rightChild);

    }
}
