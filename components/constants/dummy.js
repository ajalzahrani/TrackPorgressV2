export const workoutData = [
  {
    id: 1,
    title: 'Pushup workout',
  },
  {
    id: 2,
    title: 'Pull workout',
  },
  {
    id: 3,
    title: 'Pushday work',
  },
  {
    id: 4,
    title: 'Pullday workout',
  },
  {
    id: 5,
    title: 'Legs workout',
  },
  {
    id: 6,
    title: 'ABS',
  },
];

export const exerciseData = [
  {
    id: 1,
    title: 'Diamond pushup',
  },
  {
    id: 2,
    title: 'Wide grip pushup',
  },
  {
    id: 3,
    title: 'Split Squat',
  },
  {
    id: 4,
    title: 'Close grip pullup',
  },
  {
    id: 5,
    title: 'Natural grip pullup',
  },
  {
    id: 6,
    title: 'Crunches',
  },
  {
    id: 7,
    title: 'Deadlift',
  },
  {
    id: 8,
    title: 'T-Bar Row',
  },
  {
    id: 9,
    title: 'One-Leg Plank',
  },
  {
    id: 10,
    title: 'Lat Pulldown',
  },
  {
    id: 11,
    title: 'Farmer’s Walk & Trap Bar Carry',
  },
  {
    id: 12,
    title: 'Seated Incline Dumbbell Curl',
  },
  {
    id: 13,
    title: 'Standing Barbell Curl',
  },
  {
    id: 14,
    title: 'Dips',
  },
  {
    id: 12,
    title: 'Shrugs',
  },
  {
    id: 13,
    title: 'Dumbbell Lateral Raises',
  },
  {
    id: 14,
    title: 'Presses',
  },
  {
    id: 12,
    title: 'Rear Delt Raises',
  },
  {
    id: 13,
    title: 'Barbell Bench Press',
  },
  {
    id: 14,
    title: 'DCable Crossover',
  },
];

export const scheduleData = [
  {
    day: 'Sunday',
    workout: {
      id: 1,
      title: 'pushup workout',
      exercises: [
        {
          id: 1,
          title: 'pushups',
          freq: [15, 12, 12, 10],
        },
        {
          id: 2,
          title: 'wide grip pushup',
          freq: [10, 10, 10],
        },
        {
          id: 3,
          title: 'Diamond pushup',
          freq: [10, 10, 10, 10, 10],
        },
        {
          id: 2,
          title: 'Reverse pushup',
          freq: [20, 20],
        },
      ],
    },
  },
  {day: 'Monday'},
  {
    day: 'Tuesday',
    workout: {
      id: 1,
      title: 'Pullup workout',
      exercises: [
        {
          id: 1,
          title: 'PullUps',
          freq: [15, 12, 12, 10],
        },
        {
          id: 2,
          title: 'wide grip pullups',
          freq: [10, 10, 10],
        },
        {
          id: 3,
          title: 'Close grip pullup',
          freq: [10, 10, 10, 10, 10],
        },
        {
          id: 2,
          title: 'Chine up',
          freq: [20, 20],
        },
      ],
    },
  },
  {day: 'Windesday'},
  {day: 'Thuresday'},
  {day: 'Friday'},
  {day: 'Saturday'},
];

// export default workoutData; --> Error "it should be like export {workoutData} and delete export above"
