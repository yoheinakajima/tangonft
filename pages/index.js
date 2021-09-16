import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

export default function Home() {
  const [accountAddress, setAccountAddress] = useState(null)

  // Get ethereum account address
  async function requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      setAccountAddress(accounts[0])
    }
  }

  // Alert user if MetaMask isn't installed
  useEffect(() => {
    if (!window.ethereum) {
      alert('Please install MetaMask!')
    }
  }, [])

  return (
    <Box m={4}>
      <div>
        <span id='Button_container'>
          <Typography variant='h4'>
            A private ephemeral message board for every NFT collection.
          </Typography>
          <p>Log-in with Metmask to see which rooms you have access to.</p>
          {!accountAddress ? (
            <Button variant='contained' onClick={requestAccount}>
              Connect to Metamask
            </Button>
          ) : (
            <div>
              <Typography sx={{ display: 'flex' }}>
                <strong style={{ paddingRight: '.5em' }}>Welcome:</strong>{' '}
                {accountAddress}
              </Typography>
            </div>
          )}
        </span>
      </div>
    </Box>
  )
}
