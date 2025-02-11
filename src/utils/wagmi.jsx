import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Reservoir NFT Explorer",
  projectId: "PROJECT_TEST",
  chains: [
    arbitrum,
    
  ],
  ssr: true,
});
