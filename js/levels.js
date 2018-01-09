const getMapSprite = {
  1: 'images/water-block.png',
  2: 'images/stone-block.png',
  3: 'images/grass-block.png'
};

const levels = [
  {
    'id': 'l1',
    'columns': 5,
    'rows': [1,2,1,1,3,3],  // This is the base of the map
    'blocks':
    [             // This array will change the base map
      [0,2,3],  // First number is the row, second is the column and third is the sprite id
      [2,3,1]
    ],
    'enemies': 3
  },
  {
    'id': 'l2',
    'columns': 5,
    'rows': [2,2,2,1,3,3],
    'enemies': 3
  },
  {
    'id': 'l3',
    'columns': 5,
    'rows': [1,1,1,1,3,3],
    'blocks':
    [
      [1,1,3]
    ],
    'enemies': 3
  }
];
