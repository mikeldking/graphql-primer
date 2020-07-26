import gql from "graphql-tag";

export default gql`
  mutation AddRow($job_id: String!) {
    insert_test(objects: [{ job_id: $job_id }]) {
      returning {
        job_id
      }
    }
  }
`;
