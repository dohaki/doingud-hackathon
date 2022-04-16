import { useQuery, useInfiniteQuery } from "react-query";
import { request, gql } from "graphql-request";

const SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/dabit3/boredapeyachtclub";

const PER_PAGE = 6;

export function useBoredApesQuery() {
  return useInfiniteQuery("boredApes", async ({ pageParam = 0 }) => {
    const response = await request(
      SUBGRAPH_URL,
      gql`
          query {
            tokens(first: ${PER_PAGE} skip: ${pageParam * PER_PAGE}) {
              id
              tokenID
              contentURI
              imageURI
            }
          }
        `
    );
    return response.tokens;
  });
}

export function useBoredApeQuery(tokenId: number) {
  return useQuery(["boredApe", tokenId], async () => {
    const response = await request(
      SUBGRAPH_URL,
      gql`
          query {
            token(id: ${tokenId}) {
              id
              tokenID
              contentURI
              imageURI
            }
          }
        `
    );
    return response.token;
  });
}
