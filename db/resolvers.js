const resolvers = {
  hello: () => { 'Welcome!'; },
  user: () => {
    return {
      name: 'test'
    };
  }
};

module.exports = resolvers;
