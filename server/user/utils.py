# utils.py

from web3 import Web3

def get_eth_balance(wallet_address):
    # Connect to the Ethereum node
    infura_url = 'https://mainnet.infura.io/v3/6a42c9daef7342afb26e063d4c7dc947'  # Replace with your Infura Project ID
    # infura_url = 'https://eth-sepolia.g.alchemy.com/v2/ncNFUhxWebh948cDzap817_JzyEPD3kw'  # Replace with your Test Net API Key
    web3 = Web3(Web3.HTTPProvider(infura_url))

    # Check if the connection is successful
    if not web3.is_connected():
        raise ConnectionError("Failed to connect to Ethereum node")

    # Get the balance in Wei
    balance_wei = web3.eth.get_balance(wallet_address)

    # Convert balance from Wei to Ether
    balance_eth = web3.from_wei(balance_wei, 'ether')

    return balance_eth
