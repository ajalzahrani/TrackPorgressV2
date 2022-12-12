const routines = [
  {
    id: 1,
    title: 'Big bie',
    startdate: '24-11-2022',
    endate: '24-12-2022',
    level: 'beginner',
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
    id: 2,
    title: 'Olembya',
    startdate: '24-11-2022',
    endate: '24-12-2022',
    level: 'Profisonal',
    description: 'This routine is be more advanceed in this game',
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
];

export default routines;
