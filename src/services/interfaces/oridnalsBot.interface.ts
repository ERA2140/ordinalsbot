export interface RequestInscribeBody {
    files: {
            name: string;
            size: number;
            url: string;
            type:string;
            metadataUrl?: string;
            metadataSize?: number;
            metaprotocol?: string;

    }[];
    delegates?: {
            delegateId: string;
            metadataUrl?: string;
            metadataSize?: number;
            metaprotocol?: string;
    }[];
    receiveAddress: string;
    parents: {
            inscriptionId: string;
            returnAddress: string;
            value: number;
    }[];
    fee: number;
    lowPostage: boolean;
    rareSats:string;
    allowedSatributes?: string[];
    referral: string;
    additionalFee?: number;
    inscriptionIdPrefix?: string;
    webhookUrl?: string;
    compress?:boolean;
}


interface InscriptionResponse {
    id: string;
    charge: {
        amount: number;
    };
    chainFee: number;
    serviceFee: number;
    fee: number;
    baseFee: number;
    postage: number;
    additionalFeeCharged: number;
    files: {
        url: string;
        size: number;
        name: string;
        type: string;
        metadataSize: null;
    }[];
    delegates: null;
    parents: {
        inscriptionId: string;
        returnAddress: string;
        value: number;
    }[];
    inscriptionIdPrefix: null;
    allowedSatributes: null;
    additionalFee: null;
    lowPostage: boolean;
    referral: null;
    receiveAddress: string;
    webhookUrl: null;
    projectTag: null;
    zeroConf: null;
    status: string;
    orderType: string;
    state: string;

}



export interface PaymentInfoBody {
    paymentAddress: string;
    orderId: string;
    paymentPublicKey: string;
    ordinalAddress: string;
    ordinalPublicKey: string;
    feeRate: number;
}


export interface PsbtInfoResponse {
    psbtBase64: string;
    ordinalInputIndices: number[];
    paymentInputIndices: number[];
    psbtHex: string;
}