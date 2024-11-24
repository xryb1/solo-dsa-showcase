// Array Operations
class ArrayOperations {
    constructor() {
        this.arr = [];
        this.output = document.getElementById('array-output');
        this.updateDisplay(); // Show empty array initially
    }

    generateRandomArray() {
        const length = Math.floor(Math.random() * 8) + 3; // Generate 3-10 elements
        this.arr = Array.from({length}, () => Math.floor(Math.random() * 100));
        this.updateDisplay();
    }

    insertAt(index, value) {
        index = parseInt(index);
        value = parseInt(value);
        if (0 <= index && index <= this.arr.length) {
            this.arr.splice(index, 0, value);
            this.updateDisplay();
            return true;
        }
        return false;
    }

    deleteAt(index) {
        index = parseInt(index);
        if (0 <= index && index < this.arr.length) {
            const deleted = this.arr.splice(index, 1)[0];
            this.updateDisplay();
            return deleted;
        }
        return null;
    }

    linearSearch(value) {
        value = parseInt(value);
        if (isNaN(value)) {
            this.updateDisplay('Please enter a valid number to search');
            return -1;
        }
        
        const index = this.arr.indexOf(value);
        if (index !== -1) {
            // Highlight the found element
            this.output.innerHTML = this.arr.map((num, idx) => 
                `<span class="${idx === index ? 'found' : ''}">${num}</span>`
            ).join('') + `<br>Found ${value} at index: ${index}`;
        } else {
            this.updateDisplay(`Value ${value} not found in the array`);
        }
        return index;
    }

    updateAt(index, value) {
        index = parseInt(index);
        value = parseInt(value);
        if (0 <= index && index < this.arr.length) {
            this.arr[index] = value;
            this.updateDisplay();
            return true;
        }
        return false;
    }

    updateDisplay(message = '') {
        this.output.innerHTML = this.arr.map(num => 
            `<span>${num}</span>`
        ).join('') + (message ? `<br>${message}` : '');
    }
}

// Sorting Algorithms
class SortingAlgorithms {
    constructor() {
        this.output = document.getElementById('sorting-output');
        this.input = document.getElementById('sort-input');
    }

    generateRandomArray() {
        const length = Math.floor(Math.random() * 8) + 3; // Generates 3-10 elements
        const randomArray = Array.from({length}, () => Math.floor(Math.random() * 100));
        this.input.value = randomArray.join(',');
        this.output.innerHTML = `Generated Array: [${randomArray.join(', ')}]`;
    }

    async bubbleSort(arr) {
        let array = [...arr];
        const n = array.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    await this.updateDisplay(array, j);
                }
            }
        }
        return array;
    }

    async selectionSort(arr) {
        let array = [...arr];
        for (let i = 0; i < array.length; i++) {
            let minIdx = i;
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[minIdx]) {
                    minIdx = j;
                }
            }
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            await this.updateDisplay(array, i);
        }
        return array;
    }

    async updateDisplay(array, currentIndex) {
        this.output.innerHTML = array.map((val, idx) => 
            `<span ${idx === currentIndex ? 'class="active"' : ''}>${val}</span>`
        ).join(' ');
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

// Single Linked List
class SingleLinkedList {
    constructor() {
        this.head = null;
        this.output = document.getElementById('sll-output');
    }

    generateRandomList() {
        // Clear existing list
        this.head = null;
        
        // Generate 3-8 random nodes
        const length = Math.floor(Math.random() * 6) + 3;
        for(let i = 0; i < length; i++) {
            const value = Math.floor(Math.random() * 100);
            this.insertFront(value);
        }
        this.display();
    }

    insertFront(data) {
        const newNode = {
            data: parseInt(data),
            next: this.head
        };
        this.head = newNode;
        this.display();
    }

    deleteFront() {
        if (this.head) {
            this.head = this.head.next;
            this.display();
        }
    }

    display() {
        let current = this.head;
        let listHTML = '';
        
        while (current) {
            listHTML += `<span class="node">${current.data}</span>`;
            if (current.next) {
                listHTML += '<span class="arrow">→</span>';
            }
            current = current.next;
        }
        
        this.output.innerHTML = listHTML || 'Empty List';
    }
}

// Initialize all objects when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.arrayOps = new ArrayOperations();
    window.sortingAlgs = new SortingAlgorithms();
    window.singleLinkedList = new SingleLinkedList();
});