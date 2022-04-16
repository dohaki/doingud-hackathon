import { StarIcon } from "@chakra-ui/icons";

import { useTileDoc } from "../hooks/tiles";
import { Review } from "../types";

type Props = {
  reviewDocId: string;
};

export function RatingFromReviewDoc(props: Props) {
  const reviewDoc = useTileDoc<Review>(props.reviewDocId);

  const rating = reviewDoc ? reviewDoc.content?.ratingValue || 0 : 0;

  return <Rating rating={rating} />;
}

export function EmptyRating() {
  return <Rating rating={0} />;
}

function Rating(props: { rating: number }) {
  return (
    <>
      {Array(5)
        .fill("")
        .map((_, i) => (
          <StarIcon
            key={i}
            color={i < props.rating ? "teal.500" : "gray.100"}
          />
        ))}
    </>
  );
}
