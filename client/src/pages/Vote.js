import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMatchup, createVote } from '../utils/api';

import { useQuery, useMutation } from '@apollo/client'
import { QUERY_MATCHUPS } from '../utils/queries'
import { CREATE_VOTE } from '../utils/mutations';
const Vote = () => {
  
  let { id } = useParams();

  const [createVote] = useMutation(CREATE_VOTE)

  const {data, loading, error} = useQuery(QUERY_MATCHUPS, {
    variables: {_id: id}
  })
  
  const matchup = data && data.matchups.length > 0 ? data.matchups[0] : {}

  const handleVote = async (techNum) => {
    try {
      const result = await createVote({
        variables: {
          techNum,
          _id: id
        }
      })
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Here is the matchup!</h1>
      </div>
      <div className="card-body text-center mt-3">
        <h2>
          {matchup.tech1} vs. {matchup.tech2}
        </h2>
        <h3>
          {matchup.tech1_votes} : {matchup.tech2_votes}
        </h3>
        <button className="btn btn-info" onClick={() => handleVote(1)}>
          Vote for {matchup.tech1}
        </button>{' '}
        <button className="btn btn-info" onClick={() => handleVote(2)}>
          Vote for {matchup.tech2}
        </button>
        <div className="card-footer text-center m-3">
          <br></br>
          <Link to="/">
            <button className="btn btn-lg btn-danger">View all matchups</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Vote;
