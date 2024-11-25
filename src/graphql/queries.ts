import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      continent {
        name
      }
      emoji
      languages {
        name
        code
      }
      states {
        name
      }
      currency
      phone
    }
  }
`;

export const SEARCH_COUNTRIES = gql`
  query SearchCountries($search: String!) {
    countries(filter: { name: { regex: $search } }) {
      code
      name
      capital
      continent {
        name
      }
      emoji
      languages {
        name
        code
      }
      states {
        name
      }
      currency
      phone
    }
  }
`;