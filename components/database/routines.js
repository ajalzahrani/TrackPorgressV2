const routines = [
  {
    id: '1',
    title: 'Big bie',
    startDate: '2023-01-01',
    endDate: '2023-01-18',
    level: 0,
    description:
      'This routine fouces on bieceps training and concentrating on.',
    workouts: [
      {
        id: 1,
        title: 'pushup workout',
        exercises: [
          {
            id: 1,
            freq: [15, 12, 12, 10],
          },
          {
            id: 2,
            freq: [10, 10, 10],
          },
          {
            id: 3,
            freq: [10, 10, 10, 10, 10],
          },
          {
            id: 4,
            freq: [20, 20],
          },
        ],
        resttime: [5, 10],
      },
      {
        id: 2,
        title: 'pullup workout',
        exercises: [
          {
            id: 1,
            freq: [15, 12, 12, 10],
          },
          {
            id: 2,
            freq: [10, 10, 10],
          },
          {
            id: 3,
            freq: [10, 10, 10, 10, 10],
          },
          {
            id: 4,
            freq: [20, 20],
          },
        ],
        resttime: [7, 7],
      },
      {
        id: 3,
        title: 'Legs workout',
        exercises: [],
        resttime: [0, 0],
      },
    ],
    weekdays: [
      {
        id: 0,
        symbol: 'S',
        workday: true,
        workout: 1,
      },
      {
        id: 1,
        symbol: 'M',
        workday: true,
        workout: 2,
      },
      {
        id: 2,
        symbol: 'T',
        workday: false,
        workout: -1,
      },
      {
        id: 3,
        symbol: 'W',
        workday: true,
        workout: 3,
      },
      {
        id: 4,
        symbol: 'T',
        workday: true,
        workout: 3,
      },
      {
        id: 5,
        symbol: 'F',
        workday: false,
        workout: -1,
      },
      {
        id: 6,
        symbol: 'S',
        workday: false,
        workout: -1,
      },
    ],
  },
  {
    id: '2',
    title: 'Olembya',
    startDate: '2023-01-18',
    endDate: '2023-01-20',
    level: 2,
    description: 'This routine is for heros',
    workouts: [
      {
        id: 1,
        title: 'Game is on',
        exercises: [
          {
            id: 1,
            freq: [15, 12, 12, 10],
          },
          {
            id: 2,
            freq: [10, 10, 10],
          },
          {
            id: 3,
            freq: [10, 10, 10, 10, 10],
          },
          {
            id: 4,
            freq: [20, 20],
          },
        ],
        resttime: [5, 10],
      },
      {
        id: 2,
        title: 'Take a challage',
        exercises: [
          {
            id: 1,
            freq: [15, 12, 12, 10],
          },
          {
            id: 2,
            freq: [10, 10, 10],
          },
          {
            id: 3,
            freq: [10, 10, 10, 10, 10],
          },
          {
            id: 4,
            freq: [20, 20],
          },
        ],
        resttime: [7, 7],
      },
      {
        id: 3,
        title: 'Rekoo',
        exercises: [],
        resttime: [0, 0],
      },
    ],
    weekdays: [
      {
        id: 0,
        symbol: 'S',
        workday: false,
        workout: -1,
      },
      {
        id: 1,
        symbol: 'M',
        workday: false,
        workout: -1,
      },
      {
        id: 2,
        symbol: 'T',
        workday: true,
        workout: 2,
      },
      {
        id: 3,
        symbol: 'W',
        workday: false,
        workout: -1,
      },
      {
        id: 4,
        symbol: 'T',
        workday: false,
        workout: -1,
      },
      {
        id: 5,
        symbol: 'F',
        workday: true,
        workout: 3,
      },
      {
        id: 6,
        symbol: 'S',
        workday: true,
        workout: 2,
      },
    ],
  },
  {
    id: '3',
    title: 'Routine B',
    startDate: '2023-01-09',
    endDate: '2023-01-18',
    level: 1,
    description: 'Some desc',
    workouts: [
      {
        id: '9f135c6a-31c0-4f7b-9081-1cb5b8e7c2c9',
        title: '3',
        exercises: [
          {
            id: 1,
            freq: [],
          },
        ],
        resttime: [0, 0],
      },
    ],
    weekdays: [
      {
        id: 0,
        symbol: 'S',
        workday: false,
        workout: -1,
      },
      {
        id: 1,
        symbol: 'M',
        workday: false,
        workout: -1,
      },
      {
        id: 2,
        symbol: 'T',
        workday: true,
        workout: '9f135c6a-31c0-4f7b-9081-1cb5b8e7c2c9',
      },
      {
        id: 3,
        symbol: 'W',
        workday: false,
        workout: -1,
      },
      {
        id: 4,
        symbol: 'T',
        workday: false,
        workout: -1,
      },
      {
        id: 5,
        symbol: 'F',
        workday: false,
        workout: -1,
      },
      {
        id: 6,
        symbol: 'S',
        workday: false,
        workout: -1,
      },
    ],
  },
  {
    id: '635d7338-df3d-43bb-9114-02e4e2a905dd',
    title: '144',
    startDate: '2023-01-08',
    endDate: '2023-01-12',
    level: 0,
    description: '5',
    workouts: [],
    weekdays: [
      {
        id: 0,
        symbol: 'S',
        workday: false,
        workout: -1,
      },
      {
        id: 1,
        symbol: 'M',
        workday: false,
        workout: -1,
      },
      {
        id: 2,
        symbol: 'T',
        workday: false,
        workout: -1,
      },
      {
        id: 3,
        symbol: 'W',
        workday: false,
        workout: -1,
      },
      {
        id: 4,
        symbol: 'T',
        workday: false,
        workout: -1,
      },
      {
        id: 5,
        symbol: 'F',
        workday: false,
        workout: -1,
      },
      {
        id: 6,
        symbol: 'S',
        workday: false,
        workout: -1,
      },
    ],
  },
];

export default routines;
