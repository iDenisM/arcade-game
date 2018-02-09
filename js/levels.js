const getMapSprite = {
  1: 'images/water-block.png',
  2: 'images/stone-block.png',
  3: 'images/grass-block.png'
};

const levels = [
  {
    'id': 'l1',
    // This is the base layer of the map
    // Also the length is the rows number
    'rows': [3,2,2,2,3,3],
    // The columns number
    'columns': 5,
    // The enemies number
    'enemies': 3
  },
  {
    'id': 'l2',
    'rows': [2,2,2,1,3,3],
    'columns': 5,
    'enemies': 3,
    // Rocks position
    'rocks': [
      [2,4]
    ]
  },
  {
    'id': 'l3',
    'rows': [2,2,2,1,3,3],
    'columns': 5,
    'blocks': [
      [1,1,1],
      [1,3,1]
    ],
    'enemies': 3,
    'rocks': [
      [0,5]
    ]
  },
  {
    'id': 'l4',
    'rows': [1,1,1,1,3,3],
    'columns': 5,
    // Blocks used to overlay the base layer of the map
    // This way you can create different map pattern
    'blocks':
    [
      [1,1,3],
      [1,3,3],
      [2,4,3]
    ],
    'enemies': 4,
    'rocks': [
      [2,4],
      [4,2],
      [3,1]
    ],
    // If the key is set then it uses the strict coordinates
    // If not then it's been set randomly
    'key': [1,1]
  }
];
