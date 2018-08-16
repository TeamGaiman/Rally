

module.exports.upcoming = [
  {
    participants: {a: 'John', b: 'Jay'},
    time: '7:00',
    loc: 'Park A'
  },
  {
    participants: {a: 'John', b: 'Sara'},
    time: '7:00',
    loc: 'Park A'
  },
  {
    participants: {a: 'John', b: 'Bill'},
    time: '7:00',
    loc: 'Park B'
  },
];


module.exports.history = [
  {
    participants: {a: 'John', b: 'Beth'},
    time: '7:00',
    loc: 'Park C',
    results: 'W 6-0, 6-1, 6-2'
  },
  {
    participants: {a: 'John', b: 'Kyle'},
    time: '7:00',
    loc: 'Park B',
    results: 'W 6-3, 4-6, 6-2'
  },
  {
    participants: {a: 'John', b: 'Joe'},
    time: '7:00',
    loc: 'Park A',
    results: 'L 3-6, 4-6, 0-6'
  },
];

module.exports.userStats = {
  wins: 2,
  losses: 1,
  elo: 4400,
  tier: 2
};

module.exports.users = [
  {
    name: 'bobby',
    fullName: 'Bobby Hill',
    email: 'bhill@tomlandrymiddleschool.edu',
    phoneNumber: '(409) 661 - 9768',
    elo: 2001
  },
  {
    name: 'Ed',
    fullName: 'Eduardo Vanderbilt',
    email: 'iameddyvan@gmail.com',
    phoneNumber: '(666) 723 - 1237',
    elo: 2973
  },
  {
    name: 'Jeff',
    fullName: 'Jefferiah Montenegro',
    email: 'wineinacan@alanon.org',
    phoneNumber: '(212) 937 - 6419',
    elo: 5434
  },
  {
    name: 'Kento',
    fullName: 'Kent Anderson',
    email: 'yuri@hungarianbeverageconsortium.com',
    phoneNumber: '(748) 252 - 1661',
    elo: 17
  }
];

module.exports.match = {
  participantA: 'Joseph',
  participantB: 'bobby',
  startTime: '2018-08-29 04:00:00',
  location: 'Central Park'
};