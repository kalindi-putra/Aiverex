const ProblemsData = {
  "Sum Of Two Integers": {
    title: "Sum of Two Integers",
    duration: "60",
    description: [
      "You are given two integers, a and b. Your task is to implement a function called add(a, b) that returns the sum of these two numbers.",
      "This is a fundamental problem to help you get comfortable with function writing, basic input/output operations, and arithmetic operators."
    ],
    inputFormat: "Two Integers - a and b",
    outputFormat: "Single integer (sum of a and b)",
    examples: [
      { input: "a = 5, b = 3", output: "8" },
      { input: "a = -2, b = 7", output: "5" },
      { input: "a = 0, b = 0", output: "0" },
      { input: "a = -1000000000, b = 1000000000", output: "0" }
    ],
    explanation: "Adding the integers 5 and 3 involves summing their values directly, which results in 8 as the total because 5 units combined with 3 more units equals 8.",
    exampleInput: {
      'a' : '5',
      'b' : '3'
    },
    exampleOutput: '8',
    timeLimit: 1,
    memoryLimit: 262144,
  },

  "Sort Array": {
    title: "Sort Array",
    duration: "60",
    description: [
      "You are given an integer array of length n. Your task is to implement a function that returns the sorted version of the array in ascending order.",
      "You must not use any built-in sorting functions like sort(). Instead, implement your own sorting logic such as bubble sort, selection sort, or insertion sort."
    ],
    inputFormat: "An integer n and array of length n where each element is seperated by space",
    outputFormat: "An integer array sorted in ascending order",
    examples: [
      { input: "[5, 2, 9, 1]", output: "[1, 2, 5, 9]" },
      { input: "[0, -3, 8, 4, 4]", output: "[-3, 0, 4, 4, 8]" },
      { input: "[7]", output: "[7]" },
      { input: "[3, 2, 1, 0, -1]", output: "[-1, 0, 1, 2, 3]" }
    ],
    explanation: "The input array is sorted in ascending order using a custom sorting algorithm like bubble sort without using built-in methods.",
    exampleInput: {
      'n' : '4',
      'array': "5 2 9 1",
    },
    exampleOutput: ["1 2 5 9"],
    timeLimit: 1,
    memoryLimit: 262144,
  },

  "Trapping Rain Water": {
    title: "Trapping Rain Water",
    duration: "90",
    description: [
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      "You must not use any built-in methods that directly solve the problem. Instead, write a custom algorithm using two pointers, stacks, or pre-computed arrays."
    ],
    inputFormat: "An integer n and array of length n representing elevation heights where each element is separated by space",
    outputFormat: "A single integer representing the total amount of trapped rain water",
    examples: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "[4,2,0,3,2,5]", output: "9" },
      { input: "[2,0,2]", output: "2" },
      { input: "[5,4,1,2]", output: "1" }
    ],
    explanation: "Using elevation bars as boundaries, trapped water is calculated by comparing the heights from both sides. The total trapped units are summed based on the minimum height between left and right bounds at every index.",
    exampleInput: {
      'n': '12',
      'height': "0 1 0 2 1 0 1 3 2 1 2 1"
    },
    exampleOutput: "6",
    timeLimit: 1,
    memoryLimit: 262144,
  },
  
};

export default ProblemsData ;