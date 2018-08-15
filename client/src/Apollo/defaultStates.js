const defaultStates = {
  
  currentUser: {
    __typename: 'CurrentUser',
    id: 0,
    name: 'youCannotBeSerious',
    fullName: 'John McEnroe',
    email: 'johnMcEnroe@youcannotbeserious.com',
    phoneNumber: '(123) 456-7890',
    wins: 0,
    losses: 0,
    elo: 2000,
    tier: 1,
    joinDate: '1/1/01',
    userNumber: 1
  },
  //can have mulitple objects/default states
};


export default defaultStates;