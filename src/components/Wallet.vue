<script setup lang="ts">
import type {ProviderType} from "@omnisat/lasereyes-core";
import {useWalletService} from "@/services/wallet.service";
import {ref} from "vue";
import {useOrdinalsBotService} from "@/services/ordinals.service";

const props = defineProps<{ provider: ProviderType; }>();

const {connectWallet, client} = useWalletService()
const {inscribe, createParentChildPsbt} = useOrdinalsBotService()


const walletInfo = ref()
const isConnected = ref(false)
const order = ref()
const output = ref()


const connect = async () => {
  const response = await connectWallet(props.provider)
  if (response.success) {
    const {address, paymentAddress, paymentPublicKey, publicKey} = client.$store.value as any
    walletInfo.value = {address, paymentAddress, paymentPublicKey, publicKey}
    output.value = walletInfo.value
    isConnected.value = true
  }
}

const inscribeBtn = async () => {
  console.log("inscribe")
  order.value = await inscribe({
    "lowPostage": true,
    "receiveAddress": walletInfo.value.address,
    "rareSats": "random",
    "compress": false,
    "fee": 2,
    "referral": "",
    "parents": [
      {
        "inscriptionId": "7d2ff963d49a4564f5562a33e2121b2bfce87e9c8363c83a0afcc7dead857853i0",
        "returnAddress": "tb1pjc7vzhtk59yr7l53mpleld9klf8z0nwluu8w3z36h2dqrk42063qx627a0",
        "value": 546
      }

    ],
    "files": [
      {
        "url": "https://ordinalsbot-prod.s3.amazonaws.com/cd3a3b97-e9b7-4511-804e-49c3d6c5973b",
        "size": 9,
        "name": "era.txt",
        "type": "text/plain"
      }
    ]
  })
  output.value = order.value
}

const signPSBT = async () => {
  console.log("Sign PSBT")
  const {address, paymentAddress, paymentPublicKey, publicKey} = walletInfo.value
  const {psbtHex} = await createParentChildPsbt({
    "paymentAddress": paymentAddress,
    "orderId": order.value.id,
    "paymentPublicKey": paymentPublicKey,
    "ordinalAddress": address,
    "ordinalPublicKey": publicKey,
    "feeRate": 0
  })
  await client.signPsbt(psbtHex, true, true);
}


</script>
<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-4 gap-9">
        <h2 class="text-lg font-bold">{{ props.provider }}</h2>
        <button class="bg-blue-800 hover:bg-gray-700 px-4 py-2 rounded-md" @click="connect">
          Connect
        </button>
      </div>
      <div class="flex flex-col gap-3">
        <button class="bg-red-800 hover:bg-gray-700 px-4 py-2 rounded-md" @click="inscribeBtn"
                :disabled="!isConnected">
          Inscribe
        </button>
        <button class="bg-green-800 hover:bg-gray-700 px-4 py-2 rounded-md" @click="signPSBT"
                :disabled="!isConnected">
          Sign PSBT
        </button>
      </div>

    </div>
    <div class="bg-gray-900 text-white p-4 rounded-lg overflow-auto max-h-96">
            <pre class="whitespace-pre-wrap">
      {{ output }}
    </pre>
    </div>
  </div>
</template>
