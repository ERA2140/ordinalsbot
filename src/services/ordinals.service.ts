import axios from "axios";
import type {PaymentInfoBody, PsbtInfoResponse, RequestInscribeBody} from "@/services/interfaces/oridnalsBot.interface";


export function useOrdinalsBotService() {
  /* ==== Main Services ==== */
  const http = axios.create({
    baseURL: 'https://signet-api.ordinalsbot.com',
  })

  const inscribe = async (body: RequestInscribeBody):Promise<RequestInscribeBody| null>=>{
    try{
      const { data }= await http.post('/inscribe', body);
      return data as RequestInscribeBody
    }catch(error){
      console.error(error)
      return null
    }

  }


  const createParentChildPsbt=  async (body: PaymentInfoBody):Promise<PsbtInfoResponse| null>=>{
    try{
      const { data }= await http.post('/create-parent-child-psbt', body);
      return data as PsbtInfoResponse
    }catch(error){
      console.error(error)
      return null
    }
  }
  return {
    inscribe,
    createParentChildPsbt
  };
}
