import { Flex, Image, Text, Skeleton } from "@chakra-ui/react";

import { useBoredApeQuery } from "../hooks/bored-apes";

type Props = {
  tokenId: number;
};

export default function ReviewInfoBox({ tokenId }: Props) {
  const boredApe = useBoredApeQuery(tokenId);
  return (
    <Flex direction="row" gap={4} my={4}>
      {boredApe.isLoading ? (
        <Skeleton height="3xs" width="3xs" />
      ) : (
        <Image
          height="3xs"
          width="3xs"
          src={`https://${boredApe.data.imageURI}`}
          alt=""
        />
      )}
      <Flex direction="column" gap={4}>
        <Text fontWeight="semibold">Bored Ape Yacht Club</Text>
        <Text>Token ID: #{tokenId}</Text>
      </Flex>
    </Flex>
  );
}
