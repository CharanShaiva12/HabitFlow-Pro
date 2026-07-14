import { Habit, DsaModule, ThemeType, ThemeColors } from './types';

export const DEFAULT_HABITS: Habit[] = [
  { id: 'h1', name: 'Wake up at 05:00', emoji: '⏰', category: 'routine', color: '#EF4444' }, // red
  { id: 'h2', name: 'Stretching', emoji: '🤸', category: 'health', color: '#F59E0B' }, // amber
  { id: 'h3', name: 'Gym', emoji: '💪', category: 'health', color: '#10B981' }, // emerald
  { id: 'h4', name: 'Reading / Learning', emoji: '📖', category: 'mind', color: '#3B82F6' }, // blue
  { id: 'h5', name: 'Day Planning', emoji: '🗓️', category: 'routine', color: '#8B5CF6' }, // violet
  { id: 'h6', name: 'No Gooning', emoji: '💦', category: 'mind', color: '#EC4899' }, // pink
  { id: 'h7', name: 'Project Work', emoji: '🎯', category: 'work', color: '#06B6D4' }, // cyan
  { id: 'h8', name: 'No Alcohol', emoji: '🍾', category: 'health', color: '#14B8A6' }, // teal
  { id: 'h9', name: 'Social Media Detox', emoji: '🌿', category: 'social', color: '#10B981' }, // green
  { id: 'h10', name: 'Goal Journaling', emoji: '📝', category: 'mind', color: '#EAB308' }, // yellow
  { id: 'h11', name: 'Cold Shower', emoji: '🚿', category: 'health', color: '#3B82F6' }, // blue
  { id: 'h12', name: 'Learn a skill', emoji: '📈', category: 'work', color: '#8B5CF6' }, // purple
  { id: 'h13', name: 'Meditate', emoji: '🧘', category: 'mind', color: '#EC4899' } // pink
];

export const DEFAULT_DSA_MODULES: DsaModule[] = [
  // === Arrays & Hashing ===
  {
    id: 'dsa1',
    category: 'Arrays & Hashing',
    topic: 'Contains Duplicate',
    difficulty: 'Easy',
    details: 'Understand HashSets. Study how tracking seen elements allows O(N) time and O(N) space checking.',
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    completed: false
  },
  {
    id: 'dsa2',
    category: 'Arrays & Hashing',
    topic: 'Valid Anagram',
    difficulty: 'Easy',
    details: 'Use character count maps. Compare character frequencies of both strings in O(N) time and O(1) extra space.',
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    completed: false
  },
  {
    id: 'dsa3',
    category: 'Arrays & Hashing',
    topic: 'Two Sum',
    difficulty: 'Easy',
    details: 'Master HashMap complements. Cache the index of (target - current_val) to resolve pairs in a single pass.',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    completed: false
  },
  {
    id: 'dsa4',
    category: 'Arrays & Hashing',
    topic: 'Group Anagrams',
    difficulty: 'Medium',
    details: 'Learn sorting or character count arrays as unique keys to group words with identical letter inventories.',
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
    completed: false
  },
  {
    id: 'dsa5',
    category: 'Arrays & Hashing',
    topic: 'Top K Frequent Elements',
    difficulty: 'Medium',
    details: 'Use bucket sort or a Min-Heap. Count frequencies with a map, then extract the top K elements in O(N) time.',
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
    completed: false
  },
  {
    id: 'dsa6',
    category: 'Arrays & Hashing',
    topic: 'Product of Array Except Self',
    difficulty: 'Medium',
    details: 'Track prefix and suffix products. Compute running product before and after each element to avoid using division.',
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
    completed: false
  },
  {
    id: 'dsa7',
    category: 'Arrays & Hashing',
    topic: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    details: 'Use a HashSet for O(1) lookups. Only start counting sequences from values that have no left neighbor (num - 1).',
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',
    completed: false
  },

  // === Two Pointers ===
  {
    id: 'dsa8',
    category: 'Two Pointers',
    topic: 'Valid Palindrome',
    difficulty: 'Easy',
    details: 'Use left and right pointers. Skip non-alphanumeric characters and compare lowercase characters.',
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
    completed: false
  },
  {
    id: 'dsa9',
    category: 'Two Pointers',
    topic: 'Two Sum II (Sorted)',
    difficulty: 'Medium',
    details: 'Utilize sorted array properties. Increment left pointer if sum is too small; decrement right if too large.',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    completed: false
  },
  {
    id: 'dsa10',
    category: 'Two Pointers',
    topic: '3Sum',
    difficulty: 'Medium',
    details: 'Sort the array, then iterate and use Two Pointers. Skip duplicates to find all unique triplets summing to zero.',
    leetcodeUrl: 'https://leetcode.com/problems/3sum/',
    completed: false
  },
  {
    id: 'dsa11',
    category: 'Two Pointers',
    topic: 'Container With Most Water',
    difficulty: 'Medium',
    details: 'Squeeze pointers from outer edges. At each step, calculate the area and shift the pointer pointing to the shorter line.',
    leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
    completed: false
  },
  {
    id: 'dsa12',
    category: 'Two Pointers',
    topic: 'Trapping Rain Water',
    difficulty: 'Hard',
    details: 'Keep running max heights from left/right. Use two pointers to compute water trapped at the current position in O(1) space.',
    leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/',
    completed: false
  },

  // === Sliding Window ===
  {
    id: 'dsa13',
    category: 'Sliding Window',
    topic: 'Best Time to Buy/Sell Stock',
    difficulty: 'Easy',
    details: 'Track running minimum price. Calculate daily max profit. Fast single-pointer dynamic window.',
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    completed: false
  },
  {
    id: 'dsa14',
    category: 'Sliding Window',
    topic: 'Longest Substring Without Repeats',
    difficulty: 'Medium',
    details: 'Maintain sliding window with a HashSet. Shrink left boundary when duplicate character enters from right.',
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    completed: false
  },
  {
    id: 'dsa15',
    category: 'Sliding Window',
    topic: 'Longest Repeating Character Replacement',
    difficulty: 'Medium',
    details: 'Maintain sliding window and frequency count. Count substitutions: (window_length - max_freq) must be <= K.',
    leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
    completed: false
  },
  {
    id: 'dsa16',
    category: 'Sliding Window',
    topic: 'Permutation in String',
    difficulty: 'Medium',
    details: 'Use fixed sliding window of size s1. Compare character count frequencies of current window to s1 counts.',
    leetcodeUrl: 'https://leetcode.com/problems/permutation-in-string/',
    completed: false
  },
  {
    id: 'dsa17',
    category: 'Sliding Window',
    topic: 'Minimum Window Substring',
    difficulty: 'Hard',
    details: 'Expand window until desirable, then contract from left. Track matched unique chars count to find shortest substring.',
    leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',
    completed: false
  },

  // === Stack ===
  {
    id: 'dsa18',
    category: 'Stack',
    topic: 'Valid Parentheses',
    difficulty: 'Easy',
    details: 'Use LIFO stack. Push matching closing braces or pop and check mismatch upon finding right brackets.',
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    completed: false
  },
  {
    id: 'dsa19',
    category: 'Stack',
    topic: 'Min Stack',
    difficulty: 'Medium',
    details: 'Design stack supporting getMin() in O(1). Maintain an auxiliary stack that records minimum element at each level.',
    leetcodeUrl: 'https://leetcode.com/problems/min-stack/',
    completed: false
  },
  {
    id: 'dsa20',
    category: 'Stack',
    topic: 'Evaluate Reverse Polish Notation',
    difficulty: 'Medium',
    details: 'Process RPN tokens. Push numbers to a stack, and on operators, pop twice, perform arithmetic, and push result.',
    leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
    completed: false
  },
  {
    id: 'dsa21',
    category: 'Stack',
    topic: 'Generate Parentheses',
    difficulty: 'Medium',
    details: 'Backtracking with a stack. Only add "(" if open < N, and only add ")" if close < open to guarantee valid shapes.',
    leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/',
    completed: false
  },
  {
    id: 'dsa22',
    category: 'Stack',
    topic: 'Daily Temperatures',
    difficulty: 'Medium',
    details: 'Monotonic decreasing stack. Push indices onto stack; pop and calculate differences when a warmer day is found.',
    leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/',
    completed: false
  },

  // === Binary Search ===
  {
    id: 'dsa23',
    category: 'Binary Search',
    topic: 'Binary Search',
    difficulty: 'Easy',
    details: 'Master standard split logic. Adjust mid pointers carefully: low = mid + 1 or high = mid - 1 to prevent infinite loops.',
    leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
    completed: false
  },
  {
    id: 'dsa24',
    category: 'Binary Search',
    topic: 'Search a 2D Matrix',
    difficulty: 'Medium',
    details: 'Treat 2D grid as a flattened 1D array. Map midpoint indices back using row = mid / cols and col = mid % cols.',
    leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix/',
    completed: false
  },
  {
    id: 'dsa25',
    category: 'Binary Search',
    topic: 'Koko Eating Bananas',
    difficulty: 'Medium',
    details: 'Binary search on answer space [1, max_banana]. For each rate, compute total hours and adjust boundaries accordingly.',
    leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/',
    completed: false
  },
  {
    id: 'dsa26',
    category: 'Binary Search',
    topic: 'Find Minimum in Rotated Array',
    difficulty: 'Medium',
    details: 'Binary search in rotated array. Look at sorted halves; the pivot min must lie in the unsorted half of the subarray.',
    leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    completed: false
  },
  {
    id: 'dsa27',
    category: 'Binary Search',
    topic: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    details: 'Find which half of search space is normally ordered. Query target inclusion in ordered half to shrink search window.',
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    completed: false
  },

  // === Linked List ===
  {
    id: 'dsa28',
    category: 'Linked List',
    topic: 'Reverse Linked List',
    difficulty: 'Easy',
    details: 'Practice pointer swaps. Keep track of previous, current, and next nodes in iterative three-way re-routing.',
    leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    completed: false
  },
  {
    id: 'dsa29',
    category: 'Linked List',
    topic: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    details: 'Create a dummy head node. Compare list values, link to smaller node, and traverse until one list empties.',
    leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    completed: false
  },
  {
    id: 'dsa30',
    category: 'Linked List',
    topic: 'Linked List Cycle',
    difficulty: 'Easy',
    details: 'Floyd\'s Tortoise and Hare. Run fast (2x speed) and slow (1x speed) pointers; if they collide, a cycle exists.',
    leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
    completed: false
  },
  {
    id: 'dsa31',
    category: 'Linked List',
    topic: 'Reorder List',
    difficulty: 'Medium',
    details: 'Find middle node, reverse the second half of the list, and then zip merge both halves together.',
    leetcodeUrl: 'https://leetcode.com/problems/reorder-list/',
    completed: false
  },
  {
    id: 'dsa32',
    category: 'Linked List',
    topic: 'Remove Nth Node From End',
    difficulty: 'Medium',
    details: 'Use two pointers separated by N steps. Move both until fast reaches end; then skip the target node next to slow.',
    leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    completed: false
  },
  {
    id: 'dsa33',
    category: 'Linked List',
    topic: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    details: 'Use a Min-Heap or divide-and-conquer merge. Systematically merge list pairs to build a fully sorted list.',
    leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    completed: false
  },

  // === Trees ===
  {
    id: 'dsa34',
    category: 'Trees',
    topic: 'Invert Binary Tree',
    difficulty: 'Easy',
    details: 'Use depth-first traversal (DFS). Swap left and right children recursively for all nodes in the binary tree.',
    leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
    completed: false
  },
  {
    id: 'dsa35',
    category: 'Trees',
    topic: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    details: 'Recursive bottom-up calculation: return 1 + Math.max(leftDepth, rightDepth) with base case root === null.',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    completed: false
  },
  {
    id: 'dsa36',
    category: 'Trees',
    topic: 'Same Tree',
    difficulty: 'Easy',
    details: 'Check structure equivalence recursively. Ensure left and right subtrees are identical and node values match.',
    leetcodeUrl: 'https://leetcode.com/problems/same-tree/',
    completed: false
  },
  {
    id: 'dsa37',
    category: 'Trees',
    topic: 'Subtree of Another Tree',
    difficulty: 'Easy',
    details: 'Recursive match logic. Check if subtree matches from current node, or recursively search in left/right children.',
    leetcodeUrl: 'https://leetcode.com/problems/subtree-of-another-tree/',
    completed: false
  },
  {
    id: 'dsa38',
    category: 'Trees',
    topic: 'Lowest Common Ancestor of BST',
    difficulty: 'Easy',
    details: 'Exploit BST properties. Traverse down tree; if both targets are larger, go right; if smaller, go left; else split.',
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    completed: false
  },
  {
    id: 'dsa39',
    category: 'Trees',
    topic: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    details: 'Queue-based BFS. Iterate level-by-level, recording node values and queuing their left/right children.',
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    completed: false
  },
  {
    id: 'dsa40',
    category: 'Trees',
    topic: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    details: 'Carry tracking ranges (min, max) down recursively. Ensure current node.val is strictly between min and max bounds.',
    leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
    completed: false
  },
  {
    id: 'dsa41',
    category: 'Trees',
    topic: 'Kth Smallest Element in a BST',
    difficulty: 'Medium',
    details: 'Perform iterative in-order DFS traversal (left, root, right). Count visited nodes until reaching target K.',
    leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
    completed: false
  },

  // === Heap / Priority Queue ===
  {
    id: 'dsa42',
    category: 'Heap / Priority Queue',
    topic: 'Kth Largest Element in Stream',
    difficulty: 'Easy',
    details: 'Maintain Min-Heap of size K. Push new numbers; if size exceeds K, pop the smallest. Top is kth largest.',
    leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
    completed: false
  },
  {
    id: 'dsa43',
    category: 'Heap / Priority Queue',
    topic: 'Last Stone Weight',
    difficulty: 'Easy',
    details: 'Use Max-Heap. Pop two heaviest stones, calculate difference, push remainder back until 1 or 0 stones left.',
    leetcodeUrl: 'https://leetcode.com/problems/last-stone-weight/',
    completed: false
  },
  {
    id: 'dsa44',
    category: 'Heap / Priority Queue',
    topic: 'K Closest Points to Origin',
    difficulty: 'Medium',
    details: 'Use Max-Heap of size K or quickselect. Maintain closest coordinates by euclidean distance values.',
    leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/',
    completed: false
  },
  {
    id: 'dsa45',
    category: 'Heap / Priority Queue',
    topic: 'Find Median from Data Stream',
    difficulty: 'Hard',
    details: 'Two-heaps strategy: Max-Heap for lower half, Min-Heap for upper half. Balance sizes and compute running median.',
    leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/',
    completed: false
  },

  // === Backtracking ===
  {
    id: 'dsa46',
    category: 'Backtracking',
    topic: 'Subsets',
    difficulty: 'Medium',
    details: 'Use state-space decision tree DFS. At each index, decide whether to include current element or exclude it.',
    leetcodeUrl: 'https://leetcode.com/problems/subsets/',
    completed: false
  },
  {
    id: 'dsa47',
    category: 'Backtracking',
    topic: 'Combination Sum',
    difficulty: 'Medium',
    details: 'DFS backtracking with recursion. Re-use elements by allowing same index selection, branching on total sum boundary.',
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum/',
    completed: false
  },
  {
    id: 'dsa48',
    category: 'Backtracking',
    topic: 'Permutations',
    difficulty: 'Medium',
    details: 'Recursively swap elements or maintain a "visited" array. Backtrack once branch hits array length limits.',
    leetcodeUrl: 'https://leetcode.com/problems/permutations/',
    completed: false
  },
  {
    id: 'dsa49',
    category: 'Backtracking',
    topic: 'Word Search',
    difficulty: 'Medium',
    details: 'Four-way grid search DFS. Temporarily modify board cell as visited, and restore it upon backtracking failures.',
    leetcodeUrl: 'https://leetcode.com/problems/word-search/',
    completed: false
  },
  {
    id: 'dsa50',
    category: 'Backtracking',
    topic: 'N-Queens',
    difficulty: 'Hard',
    details: 'Place queens row-by-row. Maintain column, positive diagonal, and negative diagonal HashSets to prune board conflicts.',
    leetcodeUrl: 'https://leetcode.com/problems/n-queens/',
    completed: false
  },

  // === Graphs ===
  {
    id: 'dsa51',
    category: 'Graphs',
    topic: 'Number of Islands',
    difficulty: 'Medium',
    details: 'Use DFS or BFS to traverse adjacent grid cells. Mark land as visited to avoid redundant scans and identify individual island components.',
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    completed: false
  },
  {
    id: 'dsa52',
    category: 'Graphs',
    topic: 'Clone Graph',
    difficulty: 'Medium',
    details: 'BFS/DFS node replication. Maintain HashMap mapping original nodes to cloned counterparts to handle cyclic references.',
    leetcodeUrl: 'https://leetcode.com/problems/clone-graph/',
    completed: false
  },
  {
    id: 'dsa53',
    category: 'Graphs',
    topic: 'Course Schedule',
    difficulty: 'Medium',
    details: 'Topological sort cycle detection. Represent prerequisites as graph; use recursion stack sets to spot cycle loops.',
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
    completed: false
  },
  {
    id: 'dsa54',
    category: 'Graphs',
    topic: 'Redundant Connection',
    difficulty: 'Medium',
    details: 'Union-Find / Disjoint Set. Merge edges; if parent components of nodes are already identical, cycle identified.',
    leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/',
    completed: false
  },

  // === 1-D Dynamic Programming ===
  {
    id: 'dsa55',
    category: '1-D Dynamic Programming',
    topic: 'Climbing Stairs',
    difficulty: 'Easy',
    details: 'Recognize the Fibonacci transition recurrence. Bottom-up iteration with simple rolling storage yields optimal space.',
    leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    completed: false
  },
  {
    id: 'dsa56',
    category: '1-D Dynamic Programming',
    topic: 'Min Cost Climbing Stairs',
    difficulty: 'Easy',
    details: 'Identify recurrence: cost[i] += min(cost[i-1], cost[i-2]). Build bottom-up in O(N) time and O(1) space.',
    leetcodeUrl: 'https://leetcode.com/problems/min-cost-climbing-stairs/',
    completed: false
  },
  {
    id: 'dsa57',
    category: '1-D Dynamic Programming',
    topic: 'House Robber',
    difficulty: 'Medium',
    details: 'Select max of: rob current house + skip previous, or skip current house and retain previous robbery amount.',
    leetcodeUrl: 'https://leetcode.com/problems/house-robber/',
    completed: false
  },
  {
    id: 'dsa58',
    category: '1-D Dynamic Programming',
    topic: 'House Robber II',
    difficulty: 'Medium',
    details: 'Robbery on a circular layout. Run standard House Robber twice: once on indices 0 to N-2, and once on 1 to N-1.',
    leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/',
    completed: false
  },
  {
    id: 'dsa59',
    category: '1-D Dynamic Programming',
    topic: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    details: 'Expand around possible centers. Try both odd and even length centers for each index to identify matching boundaries.',
    leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/',
    completed: false
  },
  {
    id: 'dsa60',
    category: '1-D Dynamic Programming',
    topic: 'Coin Change',
    difficulty: 'Medium',
    details: 'Solve subproblems using tabular O(N * C) array. Initialize cells with Infinity, take minimum of coin choices.',
    leetcodeUrl: 'https://leetcode.com/problems/coin-change/',
    completed: false
  },

  // === 2-D Dynamic Programming ===
  {
    id: 'dsa61',
    category: '2-D Dynamic Programming',
    topic: 'Unique Paths',
    difficulty: 'Medium',
    details: 'Grid progression O(M * N) table. A cell\'s path count is sum of paths from cell to its left and cell above it.',
    leetcodeUrl: 'https://leetcode.com/problems/unique-paths/',
    completed: false
  },
  {
    id: 'dsa62',
    category: '2-D Dynamic Programming',
    topic: 'Longest Common Subsequence',
    difficulty: 'Medium',
    details: 'Build 2D table comparing string prefixes. If characters match, add 1; otherwise carry maximum of horizontal/vertical neighbors.',
    leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/',
    completed: false
  },

  // === Bit Manipulation ===
  {
    id: 'dsa63',
    category: 'Bit Manipulation',
    topic: 'Single Number',
    difficulty: 'Easy',
    details: 'XOR all numbers in the array. Since duplicates cancel out (X ^ X = 0), only the single number remains.',
    leetcodeUrl: 'https://leetcode.com/problems/single-number/',
    completed: false
  },
  {
    id: 'dsa64',
    category: 'Number of 1 Bits',
    topic: 'Number of 1 Bits',
    difficulty: 'Easy',
    details: 'Use bitwise AND (N & N - 1) which clears the lowest set bit at each step until N becomes zero.',
    leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/',
    completed: false
  },
  {
    id: 'dsa65',
    category: 'Bit Manipulation',
    topic: 'Counting Bits',
    difficulty: 'Easy',
    details: '1D DP with bits. A number\'s bit count is equal to: ans[i >> 1] + (i & 1). Compute in linear O(N) time.',
    leetcodeUrl: 'https://leetcode.com/problems/counting-bits/',
    completed: false
  },
  {
    id: 'dsa66',
    category: 'Bit Manipulation',
    topic: 'Reverse Bits',
    difficulty: 'Easy',
    details: 'Extract least significant bit of input, shift result left, and OR with the bit, iterating over all 32 positions.',
    leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/',
    completed: false
  }
];

export const THEME_PALETTES: Record<ThemeType, ThemeColors> = {
  'excel-dark': {
    primaryBg: 'bg-[#121212]',
    secondaryBg: 'bg-[#1c1c1e]',
    accentColor: 'border-[#10b981] text-[#10b981]',
    accentText: 'text-[#10b981]',
    border: 'border-[#2d2d30]',
    gridHeaderBg: 'bg-[#252526]',
    gridBg: 'bg-[#1e1e1e]',
    gridActiveBg: 'bg-[#2d2d30]',
    textPrimary: 'text-[#e1e1e6]',
    textSecondary: 'text-[#8e8e93]',
    progressColor: 'bg-[#10b981]',
    cardBg: 'bg-[#1e1e1e]'
  },
  'excel-green': {
    primaryBg: 'bg-[#0b211a]',
    secondaryBg: 'bg-[#0f2e24]',
    accentColor: 'border-[#22c55e] text-[#22c55e]',
    accentText: 'text-[#22c55e]',
    border: 'border-[#154636]',
    gridHeaderBg: 'bg-[#143e30]',
    gridBg: 'bg-[#0d271e]',
    gridActiveBg: 'bg-[#184637]',
    textPrimary: 'text-[#f0fdf4]',
    textSecondary: 'text-[#a7f3d0]',
    progressColor: 'bg-[#22c55e]',
    cardBg: 'bg-[#0d271e]'
  },
  'ocean-blue': {
    primaryBg: 'bg-[#0f172a]',
    secondaryBg: 'bg-[#1e293b]',
    accentColor: 'border-[#3b82f6] text-[#3b82f6]',
    accentText: 'text-[#60a5fa]',
    border: 'border-[#334155]',
    gridHeaderBg: 'bg-[#1e293b]',
    gridBg: 'bg-[#0f172a]',
    gridActiveBg: 'bg-[#1e293b]',
    textPrimary: 'text-[#f8fafc]',
    textSecondary: 'text-[#94a3b8]',
    progressColor: 'bg-[#3b82f6]',
    cardBg: 'bg-[#1e293b]'
  },
  'coral-sunset': {
    primaryBg: 'bg-[#1c1917]',
    secondaryBg: 'bg-[#292524]',
    accentColor: 'border-[#f97316] text-[#f97316]',
    accentText: 'text-[#fdba74]',
    border: 'border-[#44403c]',
    gridHeaderBg: 'bg-[#292524]',
    gridBg: 'bg-[#1c1917]',
    gridActiveBg: 'bg-[#3730a3]',
    textPrimary: 'text-[#fafaf9]',
    textSecondary: 'text-[#a8a29e]',
    progressColor: 'bg-[#f97316]',
    cardBg: 'bg-[#292524]'
  },
  'sakura-pink': {
    primaryBg: 'bg-[#1f1719]',
    secondaryBg: 'bg-[#2d1b20]',
    accentColor: 'border-[#ec4899] text-[#ec4899]',
    accentText: 'text-[#f472b6]',
    border: 'border-[#4c2a32]',
    gridHeaderBg: 'bg-[#3a2027]',
    gridBg: 'bg-[#1f1719]',
    gridActiveBg: 'bg-[#43232c]',
    textPrimary: 'text-[#fff1f2]',
    textSecondary: 'text-[#fda4af]',
    progressColor: 'bg-[#ec4899]',
    cardBg: 'bg-[#2d1b20]'
  },
  'classic-light': {
    primaryBg: 'bg-[#f4f5f7]',
    secondaryBg: 'bg-[#ffffff]',
    accentColor: 'border-[#107c41] text-[#107c41]', // Excel Green
    accentText: 'text-[#107c41]',
    border: 'border-[#d1d5db]',
    gridHeaderBg: 'bg-[#eaeaea]',
    gridBg: 'bg-[#ffffff]',
    gridActiveBg: 'bg-[#e2f0d9]',
    textPrimary: 'text-[#1f2937]',
    textSecondary: 'text-[#4b5563]',
    progressColor: 'bg-[#107c41]',
    cardBg: 'bg-[#ffffff]'
  },
  'geometric-balance': {
    primaryBg: 'bg-slate-50',
    secondaryBg: 'bg-white',
    accentColor: 'border-indigo-600 text-indigo-600',
    accentText: 'text-indigo-600',
    border: 'border-slate-200',
    gridHeaderBg: 'bg-slate-50',
    gridBg: 'bg-white',
    gridActiveBg: 'bg-emerald-50/30',
    textPrimary: 'text-slate-800',
    textSecondary: 'text-slate-500',
    progressColor: 'bg-indigo-600',
    cardBg: 'bg-white'
  }
};
