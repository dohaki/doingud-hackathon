import { Provider as SelfIDProvider } from "@self.id/framework";
import closeIcon from "@self.id/multiauth/assets/icon-close.svg";
import selectedIcon from "@self.id/multiauth/assets/icon-selected.svg";
import ethereumLogo from "@self.id/multiauth/assets/ethereum.png";
import metaMaskLogo from "@self.id/multiauth/assets/metamask.png";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "../components/Layout";
import { CERAMIC_NETWORK } from "../constants";
import theme from "../theme";
import publishedModel from "../model.json";

import type { AppProps } from "next/app";
import type { ModelTypesToAliases } from "@glazed/types";
import type { ModelTypes } from "../types";

const model: ModelTypesToAliases<ModelTypes> = publishedModel;

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { state, ...props } = pageProps;

  return (
    <SelfIDProvider
      auth={{
        modal: { closeIcon: closeIcon.src, selectedIcon: selectedIcon.src },
        networks: [
          {
            key: "ethereum",
            logo: ethereumLogo.src,
            connectors: [{ key: "injected", logo: metaMaskLogo.src }],
          },
        ],
      }}
      client={{ ceramic: CERAMIC_NETWORK, model }}
      state={state}
      ui={{ full: true, style: { display: "flex" } }}
    >
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...props} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </SelfIDProvider>
  );
}
