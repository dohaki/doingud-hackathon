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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useConnection } from "@self.id/framework";

import { useReviewItemOfToken } from "../hooks/reviews";
import { useTileDoc } from "../hooks/tiles";
import RatingBar from "./RatingBar";
import ReviewInfoBox from "./ReviewInfoBox";

import type { Review, ModelTypes } from "../types";

type Props = {
  did: string;
  tokenAddress: string;
  tokenId: string;
  reviewDocId: string;
};

export default function EditReview({
  tokenId,
  tokenAddress,
  did,
  reviewDocId,
}: Props) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [didLoad, setDidLoad] = useState(false);

  const [, connect] = useConnection<ModelTypes>();
  const reviewDoc = useTileDoc<Review>(reviewDocId);
  const reviewItemOfToken = useReviewItemOfToken(
    did,
    Number(tokenId),
    tokenAddress
  );

  const toast = useToast();

  useEffect(() => {
    if (reviewItemOfToken) {
      setTitle(reviewItemOfToken.title);
    }
  }, [reviewItemOfToken]);

  useEffect(() => {
    if (reviewDoc.content && !didLoad) {
      setRating(reviewDoc.content.ratingValue);
      setText(reviewDoc.content.text);
      setDidLoad(true);
    }
  }, [reviewDoc.content, didLoad]);

  async function handleUpdateReview() {
    try {
      await connect();
      await reviewDoc.update({
        text,
        reviewedTokenAddress: tokenAddress,
        reviewedTokenId: Number(tokenId),
        ratingValue: rating,
        worstRating: 0,
        bestRating: 5,
        date: new Date().toISOString(),
      });
      toast({
        title: "Review updated",
        description: "Your review was successfully updated.",
        status: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Update failed",
        description: "Whoops something went wrong!",
        status: "error",
      });
    }
  }

  return (
    <Flex direction="column" alignItems="center">
      <Heading marginTop={4} padding={4}>
        Edit Review
      </Heading>
      <ReviewInfoBox tokenId={Number(tokenId)} />
      <Text fontWeight="semibold" padding={4}>
        Overall rating
      </Text>
      <RatingBar selectedRating={rating} onSelectRating={setRating} />
      <FormControl marginY={4}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input id="title" value={title} disabled />
        <FormHelperText>Add a short description of your review.</FormHelperText>
      </FormControl>
      <FormControl marginY={4}>
        <FormLabel htmlFor="review">Written review</FormLabel>
        <Textarea
          id="review"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={reviewDoc.isMutating}
        />
        <FormHelperText>
          What do you like or dislike about the NFT?
        </FormHelperText>
      </FormControl>

      <Box>
        <Button
          colorScheme="teal"
          isLoading={reviewDoc.isMutating}
          loadingText="Updating..."
          onClick={() => handleUpdateReview()}
        >
          Update review
        </Button>
      </Box>
    </Flex>
  );
}
