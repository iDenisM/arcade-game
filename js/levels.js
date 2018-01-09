const getMapSprite = {
  1: 'images/water-block.png',
  2: 'images/stone-block.png',
  3: 'images/grass-block.png'
};

const levels = [
  {
    'id': 'l1',
    'rows': [1,2,1,1,3,3],  // This is the base of the map
    'columns': 5,
    'blocks':
    [             // This array will change the base map
      [0,2,3],  // First number is the row, second is the column and third is the sprite id
      [2,3,3]
    ],
    'enemies': 3
  },
  {
    'id': 'l2',
    'rows': [2,2,2,1,3,3],
    'columns': 5,
    'enemies': 3
  },
  {
    'id': 'l3',
    'rows': [1,1,1,1,3,3],
    'columns': 5,
    'blocks':
    [
      [1,1,3]
    ],
    'enemies': 3
  }
];
