import { useReviewItemOfToken } from "../../../hooks/reviews";
import EditReview from "../../../components/EditReview";
import CreateReview from "../../../components/CreateReview";

import type { RequestState } from "@self.id/framework";
import type { GetServerSideProps } from "next";

type Props = {
  did: string;
  tokenAddress: string;
  tokenId: string;
  state: RequestState;
};

export const getServerSideProps: GetServerSideProps<
  Props,
  { did: string; tokenAddress: string; tokenId: string }
> = async (ctx) => {
  const did = ctx.params?.did;
  const tokenAddress = ctx.params?.tokenAddress;
  const tokenId = ctx.params?.tokenId;

  if (!did || !tokenAddress || !tokenId) {
    return {
      redirect: { destination: "/", permanent: true },
    };
  }

  const { getRequestState } = await import("../../../server");
  return {
    props: {
      did,
      tokenAddress,
      tokenId,
      state: await getRequestState(ctx, did),
    },
  };
};

export default function ReviewNFTPage({ did, tokenId, tokenAddress }: Props) {
  const reviewItemOfToken = useReviewItemOfToken(
    did,
    Number(tokenId),
    tokenAddress
  );

  if (reviewItemOfToken) {
    return (
      <EditReview
        did={did}
        tokenId={tokenId}
        tokenAddress={tokenAddress}
        reviewDocId={reviewItemOfToken.id}
      />
    );
  }

  return (
    <CreateReview did={did} tokenAddress={tokenAddress} tokenId={tokenId} />
  );
}
