import { IconButton, Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

type Props = {
  onSelectRating: (rating: number) => void;
  selectedRating: number;
};

export default function RatingBar(props: Props) {
  return (
    <Box>
      {Array(5)
        .fill("")
        .map((_, i) => (
          <IconButton
            key={i}
            aria-label="rating-button"
            onClick={() => props.onSelectRating(i + 1)}
            icon={
              <StarIcon
                color={i < props.selectedRating ? "teal.500" : "gray.500"}
              />
            }
          />
        ))}
    </Box>
  );
}
