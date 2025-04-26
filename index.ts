import { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";


async function main() {
  // 1. Configure Aptos (USE TESTNET FOR ASSIGNMENTS)
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);


  // 2. Load Your Wallet (REPLACE WITH YOUR PRIVATE KEY FROM PETRA WALLET)
  const PRIVATE_KEY = new Ed25519PrivateKey("ed25519-priv-0x803b6fde73247b35e9b6dc95c06cd1799442926802ac7d16adaed8360c16034c");
  const MY_ACCOUNT = Account.fromPrivateKey({ privateKey: PRIVATE_KEY });


  // 3. Check Balance (Get testnet APT from faucet if 0)
  const balance = await aptos.getAccountAPTAmount({
    accountAddress: MY_ACCOUNT.accountAddress
  });
  console.log(`Your balance: ${balance} APT`);


  // 4. Build Transaction (REPLACE PLACEHOLDERS WITH YOUR INFO)
  const transaction = await aptos.transaction.build.simple({
    sender: MY_ACCOUNT.accountAddress,
    data: {
      function:
        "0x777b93e13ff2a1bc872eb4d099ae15a52fb70f2f01dd18d7c809e217fb0e543e::tba_exam::add_participant",
      functionArguments: [
        "0x539f880b3da2bc33d98b5efbf611eb76b6a980b0fdb15badb537767e0767d6e3",
        "Ian Lemuel A. Vergara",
        "Niiflheim01",
        "iamvergsuu@gmail.com",
        "klein#5074",
      ],
    },
  });


  // 5. Sign & Submit Transaction
  const senderAuthenticator = aptos.transaction.sign({
    signer: MY_ACCOUNT,
    transaction
  });
 
  const pendingTxn = await aptos.transaction.submit.simple({
    transaction,
    senderAuthenticator
  });


  // 6. Wait for Confirmation
  const txnResult = await aptos.waitForTransaction({
    transactionHash: pendingTxn.hash
  });


  console.log(`Transaction status: ${txnResult.success ? "SUCCESS" : "FAILED"}`);
  console.log(`View on explorer: https://explorer.aptoslabs.com/txn/${pendingTxn.hash}?network=testnet`);
}


main().catch(console.error);

