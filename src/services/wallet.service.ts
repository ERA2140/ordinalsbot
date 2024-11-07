import {
  createStores,
  LaserEyesClient,
  SIGNET,
  type ProviderType,
} from "@omnisat/lasereyes-core";

const client = new LaserEyesClient(createStores(), { network: SIGNET });

export function useWalletService() {
  /* ==== Main Services ==== */

  const disconnectWallet = async () => {
    client.disconnect();
  };

  const signMessageWithWallet = async (
    address: string,
    message: string
  ): Promise<{ success: boolean; hash: string | null; message: string }> => {
    try {
      const response = await client.signMessage(message, address);
      if (response === undefined) {
        return {
          success: false,
          hash: null,
          message: "You have canceled the sign request",
        };
      }
      return {
        success: true,
        hash: response,
        message: "connected successfully",
      };
    } catch (e) {
      return {
        success: false,
        hash: null,
        message: "You have canceled the sign request",
      };
    }
  };

  const connectWallet = async (
    provider: ProviderType
  ): Promise<{ success: boolean; address: string | null; message: string }> => {
    try {
      await client.connect(provider);
      const accounts = await client.requestAccounts();
      const addresses = accounts?.filter((e) => isValidBRCAddress(e)) ?? [];
      if (addresses.length === 0) {
        return {
          success: false,
          address: null,
          message:
            "Address not a P2WPKH or Taproot address. we only supports address of type P2WPKH/Taproot",
        };
      }
      return {
        success: true,
        address: addresses[0],
        message: "connected successfully",
      };
    } catch (error) {
      return {
        success: false,
        address: null,
        message: "You have canceled the connection request",
      };
    }
  };

  /* ==== Helpers Private Functions ==== */
  const isValidBRCAddress = function isValidBRCAddress(address: string) {
    return address.startsWith("tb");
  };
  return {
    client,
    connectWallet,
    disconnectWallet,
    signMessageWithWallet,
  };
}
