import { Box, Image, LinkBox, LinkOverlay } from "@chakra-ui/react";

import { useReviewItemOfToken } from "../hooks/reviews";
import { EmptyRating, RatingFromReviewDoc } from "./Rating";

type Props = {
  did?: string;
  tokenId: number;
  tokenAddress: string;
  imageUrl: string;
};

export default function NFTCard({
  did,
  tokenId,
  tokenAddress,
  imageUrl,
}: Props) {
  const reviewItem = useReviewItemOfToken(did || "", tokenId, tokenAddress);

  return (
    <LinkBox maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={"http://" + imageUrl} alt={`boredape nft #${tokenId}`} />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          #{tokenId}
        </Box>

        <LinkOverlay href={did ? `/${did}/${tokenAddress}/${tokenId}` : "#"}>
          <Box>Bored Ape Yacht Club</Box>
        </LinkOverlay>

        <Box display="flex" mt="2" alignItems="center">
          {reviewItem ? (
            <RatingFromReviewDoc reviewDocId={reviewItem.id} />
          ) : (
            <EmptyRating />
          )}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {reviewItem ? "You reviewed" : "No review yet"}
          </Box>
        </Box>
      </Box>
    </LinkBox>
  );
}
