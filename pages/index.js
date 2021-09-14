import * as Web3 from 'web3'
import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Home() {
  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)

  // Get accounts and set address in state
  async function handleOnClick(_web3) {
    try {
      const accounts = await _web3.eth.getAccounts()
      setAddress(accounts[0])
      console.log('accounts', accounts)
    } catch (err) {
      console.error('Something went wrong:', err)
    }
  }

  // Connect to local blockchain
  function initializeWeb3() {
    if (window.ethereum) {
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')
      setWeb3(web3)
    } else {
      console.log('Please install MetaMask')
    }
  }

  // Initialize web3 on component mount
  useEffect(() => {
    initializeWeb3()
  }, [])

  return (
    <Box m={4}>
      <div>
        <span id='Button_container'>
          <Typography variant='h4'>
            A private ephemeral message board for every NFT collection.
          </Typography>
          <p>Log-in with Metmask to see which rooms you have access to.</p>
          {!address ? (
            <Button variant='contained' onClick={() => handleOnClick(web3)}>
              Connect to Metamask
            </Button>
          ) : (
            <div>
              <Typography sx={{ display: 'flex' }}>
                <strong style={{ paddingRight: '.5em' }}>Welcome:</strong>{' '}
                {address}
              </Typography>
            </div>
          )}
        </span>
      </div>
    </Box>
  )
}
