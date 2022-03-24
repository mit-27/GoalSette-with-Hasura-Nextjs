import { gql } from '@apollo/client'

export const GET_GOALS_QUERY = gql`
            query MyQuery {
                goals{
                goalName,
                id,
                timeStamp
                }
            }
`;

export const CREATE_GOAL_MUTATION = gql`
mutation createGoal($newGoalName:String!){
    insert_goals(objects:[{goalName:$newGoalName}]){
      returning{
        goalName
      }
    }
  }
`;

export const UPDATE_GOAL_MUTATION = gql`
mutation updateGoalMutation($currentID:uuid!,$newGoal:String!) {
    update_goals(where: {id: {_eq: $currentID}}, _set: {goalName: $newGoal}) {
      returning {
        goalName
      }
    }
  }
`;

export const DELETE_GOAL_MUTATION = gql`
mutation DeleteGoalMutation($currentID:uuid!) {
    delete_goals_by_pk(id: $currentID) {
      goalName
    }
  }
`;

export const GOAL_SUBSCRIPTION = gql`
subscription MySubscription {
    goals {
        goalName,
        id,
        timeStamp
    }
  }
`;



