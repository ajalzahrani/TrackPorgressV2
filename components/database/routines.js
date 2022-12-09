const routines = [
  {
    id: 1,
    title: 'Big bie',
    startdate: '24-11-2022',
    endate: '24-12-2022',
    level: 'beginner',
    description:
      'This routine fouces on bieceps training and concentrating on.',
    workouts: [],
    weekdays: [
      {
        id: 0,
        workday: true,
        workout: [1],
      },
      {
        id: 1,
        workday: true,
        workout: [2],
      },
      {
        id: 2,
        workday: false,
        workout: [-1],
      },
      {
        id: 3,
        workday: true,
        workout: [3],
      },
      {
        id: 4,
        workday: true,
        workout: [3],
      },
      {
        id: 5,
        workday: false,
        workout: [-1],
      },
      {
        id: 6,
        workday: false,
        workout: [-1],
      },
    ],
  },
];

export default routines;
