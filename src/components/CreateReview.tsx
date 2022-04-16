import {
  Input,
  Heading,
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

import { usePublishReview } from "../hooks/reviews";
import RatingBar from "./RatingBar";
import ReviewInfoBox from "./ReviewInfoBox";

type Props = {
  did: string;
  tokenAddress: string;
  tokenId: string;
};

export default function CreateReview({ tokenId, tokenAddress }: Props) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { publish, publishState, error } = usePublishReview();

  return (
    <Flex direction="column" alignItems="center">
      <Heading marginTop={4} padding={4}>
        Create Review
      </Heading>
      <ReviewInfoBox tokenId={Number(tokenId)} />
      <Text fontWeight="semibold" padding={4}>
        Overall rating
      </Text>
      <RatingBar selectedRating={rating} onSelectRating={setRating} />
      <FormControl marginY={4}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={publishState === "pending"}
        />
        <FormHelperText>Add a short description of your review.</FormHelperText>
      </FormControl>
      <FormControl marginY={4}>
        <FormLabel htmlFor="review">Written review</FormLabel>
        <Textarea
          id="review"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={publishState === "pending"}
        />
        <FormHelperText>
          What do you like or dislike about the NFT?
        </FormHelperText>
      </FormControl>

      <Box>
        <Button
          colorScheme="teal"
          isLoading={publishState === "pending"}
          loadingText="Publishing..."
          onClick={() =>
            publish({
              title,
              text,
              reviewedTokenAddress: tokenAddress,
              reviewedTokenId: Number(tokenId),
              ratingValue: rating,
            })
          }
        >
          Publish review
        </Button>
      </Box>
    </Flex>
  );
}
