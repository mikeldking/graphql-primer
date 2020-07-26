import { Jobs, JobsVariables } from "./queries/types/Jobs";
import sendRequest from "./sendRequest";
import jobsQuery from "./queries/jobsQuery";
import { order_by } from "./types/gqlTypes";

const variables: JobsVariables = {
  limit: 10,
  offset: 0,
  orderBy: [{ created_at: order_by.asc }]
};
sendRequest<Jobs>(jobsQuery, variables).then(result => {
  console.log(`Total job count ${result.jobs.length}`);

  // Exercise 1: print out the engine_id and project it's associated with
  result.jobs.map(job => {
    console.log(job.project.name);
  });

  // Exercise 2: add a variable to add a projectId filter (e.g. 1 for integration tests)
});
