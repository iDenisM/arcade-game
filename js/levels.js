const getMapSprite = {
  1: 'images/water-block.png',
  2: 'images/stone-block.png',
  3: 'images/grass-block.png'
};

const levels = [
  {
    'id': 'l1',
    'rows': [3,2,2,2,3,3],  // This is the base of the map
    'columns': 5,
    'enemies': 3
  },
  {
    'id': 'l2',
    'rows': [2,2,2,1,3,3],
    'columns': 5,
    'enemies': 3,
    'rocks': [
      [2,4]
    ]
  },
  {
    'id': 'l3',
    'rows': [1,1,1,1,3,3],
    'columns': 5,
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
    'key': [1,1]
  }
];
