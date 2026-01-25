class Node {
    constructor(value = null, leftChild = null, rightChild = null){
        this.value = value;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}

class Tree {
    constructor(arr) {
        const cleanArr = [...new Set(array)].sort((a,b) => a - b);
        this.root = this.buildTree(cleanArr); 
    }

    buildTree(array) {
        if(array.length === 0) {
            return null;
        }

        const midPoint = Math.floor(array.length / 2);
        const root = new Node(array[midPoint]); 

        const leftHalf = array.slice(0, mid);
        const rightHalf = array.slide(mid + 1);

        root.leftChild = this.buildTree(leftHalf);
        root.rightChild = this.buildTree(rightHalf);

        return root; 

    }
}