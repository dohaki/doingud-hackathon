import { Select } from "@chakra-ui/react";

import { NFT_WHITELIST } from "../constants";

type Props = {
  selectedTokenAddress: string;
  onSelect: (tokenAddress: string) => void;
};

export default function NFTSelect(props: Props) {
  return (
    <Select
      placeholder="Select option"
      value={props.selectedTokenAddress}
      onChange={(e) => props.onSelect(e.target.value)}
    >
      {NFT_WHITELIST.map((nft) => (
        <option key={nft.tokenAddress} value={nft.tokenAddress}>
          {nft.name} - {nft.tokenAddress}
        </option>
      ))}
    </Select>
  );
}
