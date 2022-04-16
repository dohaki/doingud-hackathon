import React, { useState } from "react";
import { Flex, SimpleGrid, Heading, Center, Button } from "@chakra-ui/react";
import { useViewerID } from "@self.id/framework";

import NFTCard from "../components/NFTCard";
import { useBoredApesQuery } from "../hooks/bored-apes";
import NFTSelect from "../components/NFTSelect";
import { NFT_WHITELIST } from "../constants";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(
    NFT_WHITELIST[0].tokenAddress
  );

  const boredApesQuery = useBoredApesQuery();
  const viewerID = useViewerID();

  return (
    <Flex direction="column">
      <Center paddingY="10">
        <Heading>Rate and review NFTs!</Heading>
      </Center>

      <Flex marginBottom="10">
        <NFTSelect
          selectedTokenAddress={selectedTokenAddress}
          onSelect={(selectedTokenAddress) =>
            setSelectedTokenAddress(selectedTokenAddress)
          }
        />
      </Flex>

      <SimpleGrid columns={3} gap={6}>
        {boredApesQuery.data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((boredApe: { tokenID: number; imageURI: string }) => (
              <NFTCard
                key={boredApe.tokenID}
                tokenAddress={selectedTokenAddress}
                tokenId={boredApe.tokenID}
                imageUrl={boredApe.imageURI}
                did={viewerID ? viewerID.id : ""}
              />
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>

      <Flex justifyContent="center" mt={12}>
        <Button
          onClick={() => {
            setPage(page + 1);
            boredApesQuery.fetchNextPage({ pageParam: page });
          }}
          isLoading={boredApesQuery.isFetchingNextPage}
          loadingText="Loading..."
        >
          Load more
        </Button>
      </Flex>
    </Flex>
  );
}
