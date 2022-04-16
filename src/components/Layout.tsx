import { Text, Container, Flex, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Link from "next/link";

import type { ReactNode } from "react";

const AccountMenu = dynamic(() => import("./AccountMenu"), {
  ssr: false,
});

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Box width="full">
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        paddingY="2"
        paddingX="4"
        boxShadow="md"
        position="sticky"
      >
        <Link href={"/"} passHref>
          <Text fontSize="2xl" fontWeight="semibold">
            ⭐ NFT Review
          </Text>
        </Link>
        <AccountMenu />
      </Flex>
      <Container maxWidth="5xl">{children}</Container>
      <Flex padding="20" justifyContent="center">
        Made with ❤️ by DH.Kim
      </Flex>
    </Box>
  );
}
