import React from 'react';
import RecommendedMatches from './RecommendedMatches.jsx';
import Challenges from './Challenges.jsx';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { CHECK_EMAIL_IS_UNIQUE } from '../apollo/localQueries.js';

class Matchmaking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // Uncomment to demo query from client, this will be gone in next update
    {/*     <Query query={gql` */}
    //       {
    //         getAllUsers{
    //           name
    //           userNumber
    //         }
    //       }
    //     `}>
    //       {( { loading, error, data } ) => {
    //         if ( loading ) {
    //           return <p>Loading...</p>;
    //         } else if ( error ) {
    //           return <p>Error</p>;
    //         }
    //         console.log(data.getAllUsers);

    //         return data.getAllUsers.map( ( { name, userNumber } ) => (
    //           <div key={userNumber}>
    //             <p>{name}</p>
    //           </div>
    //         ));
    //       }}
    //     </Query> */}
    return (
      <div>
        <div>
          <p>This is the 'Matchmaking' component</p>
          <RecommendedMatches />
          <Challenges />
        </div>
      </div>
    );
  }
}


export default Matchmaking;