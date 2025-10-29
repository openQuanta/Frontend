import { useWallet, useConnection } from "@solana/wallet-adapter-react";

import {
    useCallback,
    useEffect,
    useState,
    FC,
} from "react";

import React from "react";
import {
    Program,
    AnchorProvider,
    utils,
    web3,
    BN,
    setProvider
} from "@coral-xyz/anchor";

import {
    clusterApiUrl,
    Connection,
    Keypair,
    PublicKey,
    SystemProgram
} from "@solana/web3.js";

import { MPL_CORE_PROGRAM_ID, mplCore } from "@metaplex-foundation/mpl-core";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import {
    createGenericFile,
    createSignerFromKeypair,
    generateSigner,
    keypairIdentity,
    signerIdentity,
    sol,
} from "@metaplex-foundation/umi";
import {
    createUmi,
} from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { error } from "console";
import {
    TurboFactory, ArweaveSigner,
    SolanaToken,
    SOLToTokenAmount
} from "@ardrive/turbo-sdk";

import fs from "fs";
import path from "path";


import idl from "../open_quanta.json";

import { OpenQuanta } from "../open_quanta";
import { program } from "@coral-xyz/anchor/dist/cjs/native/system";
import { fileURLToPath } from "url";



export const openQuanta: FC = () => {

    const ourWallet: any = useWallet();

    const { connection } = useConnection();


    const getProvider = () => {

        const provider = new AnchorProvider(connection, ourWallet, AnchorProvider.defaultOptions());
        setProvider(provider);
        return provider;
    }

    const nftAssetKeypairFile = fs.readFileSync(
        path.resolve(__dirname, "./wallets/nftAsset-wallet.json"),
        "utf-8"
    );
    const nftAssetKeypair = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(nftAssetKeypairFile))
    );
    //const openQuantaProgramId = new PublicKey(idl.address);

    const openQuantaProgram = new Program<OpenQuanta>(idl, getProvider());

    // Local State For The Derived PDA
    const [authorPDA, setAuthorPDA] = useState<PublicKey | null>(null);
    // Local State For Author Inputs
    const [profileUri, setProfileUri] = useState<string>("");
    const [fieldOfStudy, setFieldOfStudy] = useState<string>("");

    // Local State For Paper Submission Inputs
    const [titleOfPaper, setTitleOfPaper] = useState<string>("");
    const [fieldOfResearch, setFieldOfResearch] = useState<string>("");
    const [paperVersion, setPaperVersion] = useState<string>("");
    const [paperArweaveHash, setPaperArweaveHash] = useState<string>("");
    const [researchPaperPDA, setResearchPaperPDA] = useState<PublicKey | null>(null);
    const [coAuthors, setCoAuthors] = useState<PublicKey[]>([]);
    // Other required PDAs
    const [collectionRegistryPDA, setCollectionRegistryPDA] = useState<PublicKey | null>(null);
    const [paperIdPDA, setPaperIdPDA] = useState<PublicKey | null>(null);
    const [oqNftMintAuthorityPDA, setOqNftMintAuthorityPDA] = useState<PublicKey | null>(null);

     // Saving current paper Id to be loaded for research paper PDA generation,
    const [currentPaperId, setCurrentPaperId] = useState(null);
    const [loading, setLoading] = useState(false);
    // Derive authorPDA
    useEffect(() => {
        let cancelled = false;
        async function deriveAuthorPDA() {
            if (!openQuantaProgram || !ourWallet?.publicKey) {
                setAuthorPDA(null);
                return;
            }
            try {
                const seed1 = Buffer.from("author_profile");
                const seed2 = ourWallet?.publicKey.toBuffer();
                const [authorpda] = PublicKey.findProgramAddressSync(
                    [seed1, seed2], openQuantaProgram.programId);
                
                if (!cancelled) setAuthorPDA(authorpda);

            } catch (err) {
                console.error("Deriving Author PDA Failed", err);
                if (!cancelled) setAuthorPDA(null);
            }
        }

        deriveAuthorPDA();

        return () => {
            cancelled = true;
        };
    }, [openQuantaProgram?.programId?.toBase58(), ourWallet?.publicKey?.toBase58()]);

    // Derive PaperIdPDA
    useEffect(() => {
        let cancelled = false;
        async function derivePaperIdPDA() {
            if (!openQuantaProgram || !ourWallet?.publicKey) {
                setPaperIdPDA(null);
                return;
            }
            try {
                const seed1 = Buffer.from("paper_id_counter");
                const seed2 = Buffer.from("openQuanta"); 
                const [paperIdPDA,] = PublicKey.findProgramAddressSync(
                    [seed1, seed2], openQuantaProgram.programId
                );
                if (!cancelled) setPaperIdPDA(paperIdPDA);
            } catch (err) {
                console.error("Deriving Paper ID PDA Failed", err);
                if (!cancelled) setPaperIdPDA(null);
            }
        }
        derivePaperIdPDA();

        return () => {
            cancelled = true;
        };
    }, [openQuantaProgram?.programId?.toBase58()]);

    // Derive Collection Registry PDA
    useEffect(() => {
        let cancelled = false;
        async function deriveCollectionRegistryPDA() {
            if (!openQuantaProgram || !ourWallet?.publicKey) {
                setCollectionRegistryPDA(null);
                return;
            }
            try {
                const seed1 = Buffer.from("collections_registry");
                const seed2 = Buffer.from("openQuanta"); 
                const [collectionRegistryPDA,] = PublicKey.findProgramAddressSync(
                    [seed1, seed2], openQuantaProgram.programId
                );
                if (!cancelled) setCollectionRegistryPDA(collectionRegistryPDA);
            } catch (err) {
                console.error("Deriving Collection Registry PDA Failed", err);
                if (!cancelled) setCollectionRegistryPDA(null);
            }
        }
        deriveCollectionRegistryPDA();

        return () => {
            cancelled = true;
        };
    }, [openQuantaProgram?.programId?.toBase58()]);

    // Derive oQ NFt Minting Authority PDA
    useEffect(() => {
        let cancelled = false;
        async function deriveNftMintAuthorityPDA() {
            if (!openQuantaProgram || !ourWallet?.publicKey) {
                setOqNftMintAuthorityPDA(null);
                return;
            }
            try {
                const [nftMintAuthorityPDA,] = PublicKey.findProgramAddressSync(
                    [Buffer.from("openQuanta_Nft_Mint_Authority")], openQuantaProgram.programId
                );
                if (!cancelled) setOqNftMintAuthorityPDA(nftMintAuthorityPDA);
            } catch (err) {
                console.error("Deriving NFT Mint Authority PDA Failed", err);
                if (!cancelled) setOqNftMintAuthorityPDA(null);
            }
        }
        deriveNftMintAuthorityPDA();

        return () => {
            cancelled = true;
        };
    }, [openQuantaProgram?.programId?.toBase58()]);

    // Derive Research Paper PDA
    useEffect(() => {

        let cancelled = false;
        setLoading(true);
        async function deriveResearchPaperPDA() {
            if (!openQuantaProgram || !ourWallet?.publicKey) {
                setResearchPaperPDA(null);
                setCurrentPaperId(null);
                setLoading(false);
                return;
            }
            try {
                // Fetch Counter PDA, and get the Current ID
                const [paperIdPDA,] = PublicKey.findProgramAddressSync(
                    [Buffer.from("paper_id_counter"), Buffer.from("openQuanta")], openQuantaProgram.programId
                );

                const counterAccount = await openQuantaProgram.account.paperIdCounter.fetch(paperIdPDA);
                const nextId = counterAccount.currentId + 1;

                if (cancelled) return;
                setCurrentPaperId(nextId);

                // Derive Research Paper PDA
                const formattedId = `OQ-${String(nextId).padStart(7, '0')}`;
                const [researchPaperPDA, ] = PublicKey.findProgramAddressSync(
                    [
                        Buffer.from("paper"),
                        ourWallet?.publicKey.toBuffer(),
                        Buffer.from(formattedId)
                    ],
                    openQuantaProgram.programId
                );

                if (!cancelled) setResearchPaperPDA(researchPaperPDA);
            } catch(err) {
                console.error("Deriving Research Paper PDA Failed: ", err);
                if (!cancelled) setResearchPaperPDA(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        deriveResearchPaperPDA();
        return () => {
            cancelled = true;
        };
    }, [openQuantaProgram?.programId?.toBase58(), ourWallet?.publicKey?.toBase58()]);

    // INITIALIZE AUTHOR PROFILE LOGIC //
    const InitializeAuthorProfile = async () => {

        try {
            if (!profileUri || !fieldOfStudy) {
                alert("All Fields Are Required For Author Profile Creation");
                return;
            }

            // Call On-chain instruction
            await openQuantaProgram.methods
                .initializeAuthorProfile(
                    profileUri,
                    fieldOfStudy
                )
                .accounts({
                    author: ourWallet?.publicKey,
                    //@ts-ignore
                    authorProfile: authorPDA,
                    systemProgram: web3.SystemProgram.programId
                })
                .signers([ourWallet])
                .rpc();
        } catch (err) {
            console.log("Error While Initializing Author Profile: ", err);
            //alert(`Failed To Initialize Author Profile: ${e}`)
        }
    }


    // PAPER SUBMISSION

    const submitResearchPaper = async () => {

        try {
            if (!titleOfPaper || !fieldOfResearch || !paperVersion) {
                alert("All Fields Are Required For Research Paper Submission");
                return;
            }

            const arweaveHashForPaper = uploadFileToArweave(fileURLToPath);
            // Call On-Chain instruction
            await openQuantaProgram.methods
                .submitPaper(
                    titleOfPaper,
                    arweaveHashForPaper,
                    fieldOfResearch,
                    paperVersion,
                    coAuthors
                )
                .accounts({
                    paperSubmitter: ourWallet?.publicKey,
                    //@ts-ignore
                    paperIdAssigner: paperIdPDA,
                    authorProfile: authorPDA,
                    researchPaper: researchPaperPDA,
                    collectionRegistry: collectionRegistryPDA,
                    collection: new PublicKey("HdNScTPv5FJy2pKKZjUMe4vGr4AM22XVYsWjx4z6ybJT"),
                    oqNftMintAuthority: oqNftMintAuthorityPDA,
                    nftAsset: new PublicKey("C9Vce9pRfZ3daVMGkdHEb5835FL5VkgoUPKMQEY5NZDb"),
                    mplCore: MPL_CORE_PROGRAM_ID,
                    systemProgram: SystemProgram.programId
                })
                .signers([ourWallet, nftAssetKeypair])
                .rpc();
        } catch (err) {
            console.error("There was an Error Submitting Paper,", err);
        }
    }


    // Arweave Interaction Via Their Turbo SDK
    const uploadFileToArweave = async(
        file: any,
        //uploadCost: any
    ): Promise<String> => {

        // Initialize Wallet For Signer
        const turboSigner = new ArweaveSigner(ourWallet);
        // Initialize Turbo
        const turbo = TurboFactory.authenticated({
            signer: turboSigner,
            token: "solana"
        });

        // Get SOL Price For File To Be Uploaded
        const tokenPriceForFile = await turbo.getTokenPriceForBytes(file);

        // Pay For Upload Cost
        //! @Note Gotta Read More For The Uploading Logic
        await turbo.topUpWithTokens({
            tokenAmount: SOLToTokenAmount(tokenPriceForFile.tokenPrice)
        });

        // Upload File
        const arweaveHash = await turbo.upload({
            data: file,
            dataItemOpts: {
                tags: [// @TODO miht add more tags, maybe or maybe not
                    { name: "Content-Type", value: file.type || "application/octet-stream" },
                    { name: "Title", value: titleOfPaper },
                    { name: "Owner of Paper", value: ourWallet?.publicKey}
                ],
            },
        });

        // Logs
        console.log("Upload ID is: ", arweaveHash.id);
        console.log("Owner of Hash is: ", arweaveHash.owner);
        return arweaveHash.id
    }
}