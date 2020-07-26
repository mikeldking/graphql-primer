/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddRow
// ====================================================

export interface AddRow_insert_test_returning {
  __typename: "test";
  job_id: number;
}

export interface AddRow_insert_test {
  __typename: "test_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: AddRow_insert_test_returning[];
}

export interface AddRow {
  /**
   * insert data into the table: "test"
   */
  insert_test: AddRow_insert_test | null;
}

export interface AddRowVariables {
  job_id: number;
}
