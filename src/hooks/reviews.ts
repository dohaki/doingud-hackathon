import {
  useConnection,
  usePublicRecord,
  useViewerRecord,
} from "@self.id/framework";
import { useCallback, useState } from "react";
import { useToast } from "@chakra-ui/react";

import type { PublicRecord } from "@self.id/framework";
import type { ModelTypes, Reviews, ReviewForm, Review } from "../types";

export function useReviewsRecord(did: string): PublicRecord<Reviews | null> {
  return usePublicRecord<ModelTypes, "reviews">("reviews", did);
}

export function useReviewItemOfToken(
  did: string,
  tokenId: number,
  tokenAddress: string
) {
  const reviewsRecord = useReviewsRecord(did);

  if (!reviewsRecord.content) {
    return null;
  }

  const reviewItem = reviewsRecord.content?.reviews.find((reviewItem) => {
    return (
      reviewItem.reviewedTokenAddress.toLowerCase() ===
        tokenAddress.toLowerCase() &&
      reviewItem.reviewedTokenId === Number(tokenId)
    );
  });

  return reviewItem;
}

export function usePublishReview() {
  const [, connect] = useConnection<ModelTypes>();
  const reviewsRecord = useViewerRecord<ModelTypes, "reviews">("reviews");
  const [publishState, setPublishState] = useState("idle");
  const [error, setError] = useState<unknown>();

  const toast = useToast();

  const publish = useCallback(
    async (reviewForm: ReviewForm) => {
      setPublishState("pending");

      try {
        const selfID = await connect();

        if (selfID === null || !reviewsRecord.isLoadable) {
          throw new Error("Could not load reviews record");
        }

        const reviewDoc = await selfID.client.dataModel.createTile("Review", {
          date: new Date().toISOString(),
          bestRating: 5,
          worstRating: 0,
          ...reviewForm,
        });
        const reviews = reviewsRecord.content?.reviews ?? [];
        await reviewsRecord.set({
          reviews: [
            ...reviews,
            {
              id: reviewDoc.id.toUrl(),
              title: reviewForm.title,
              reviewedTokenAddress: reviewForm.reviewedTokenAddress,
              reviewedTokenId: reviewForm.reviewedTokenId,
            },
          ],
        });
        setPublishState("success");
        toast({
          title: "Review published",
          description: "Successfully published review on Ceramic!",
        });
      } catch (error) {
        setError(error);
        setPublishState("error");
        toast({
          title: "Failed to publish review",
          description: "Whoops something went wrong!",
          status: "error",
        });
      }
    },
    [connect, reviewsRecord]
  );

  return { publish, publishState, error };
}
