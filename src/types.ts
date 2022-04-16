import type { ModelTypeAliases } from "@glazed/types";
import type { BasicProfile } from "@datamodels/identity-profile-basic";

export type ReviewForm = {
  text: string;
  title: string;
  ratingValue: number;
  reviewedTokenAddress: string;
  reviewedTokenId: number;
};

export type Review = {
  date: string;
  text: string;
  reviewedTokenAddress: string;
  reviewedTokenId: number;
  worstRating: number;
  bestRating: number;
  ratingValue: number;
};

export type ReviewItem = {
  id: string;
  title: string;
  reviewedTokenAddress: string;
  reviewedTokenId: number;
};

export type Reviews = {
  reviews: Array<ReviewItem>;
};

export type ModelTypes = ModelTypeAliases<
  {
    BasicProfile: BasicProfile;
    Review: Review;
    Reviews: Reviews;
  },
  {
    basicProfile: "BasicProfile";
    reviews: "Reviews";
  }
>;
