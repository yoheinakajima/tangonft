import * as Web3 from 'web3';
import {
    Box,
    Button,
    Container,
    Grid,
    Input,
    Link,
    MenuItem,
    Select,
    Toolbar,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [assets, setAssets] = useState(null);
  const [collections, setCollections] = useState(null);

  // Get accounts and set address in state
  async function handleOnClick(_web3) {
    try {
        const accounts = await _web3.eth.getAccounts();
        setAddress(accounts[0]);

        const assets = getAssets(accounts[0]);
        setAssets(assets);

        console.log(assets);
    } catch (err) {
        console.error('Something went wrong:', err);
    }
  }

  async function getAssets(accountId) {
      const url = `https://api.opensea.io/api/v1/assets?owner=${accountId}&order_direction=desc&offset=0&limit=20`;
      const nfts = [];

      fetch(url)
          .then(resp => (resp.json()))
          .then(data => {
              var assets = data["assets"];
              for (const asset of assets){
                  console.log(asset);
                  var id = (asset["id"]);
                  var name = (asset["name"]);
                  var permalink = (asset["permalink"]);
                  var image_url = (asset["image_preview_url"]);
                  var collection_name = (asset["collection"]["name"]);
                  var collection_external_link = (asset["collection"]["external_link"]);
                  var asset_contract_address = (asset["asset_contract"]["address"]);
                  nfts[id]={};
                  nfts[id]["id"]=id;
                  nfts[id]["name"]=name;
                  nfts[id]["collection"]=collection_name;
                  nfts[id]["image_url"]=image_url;
              }});
      return nfts;
  }

  // Connect to local blockchain
  function initializeWeb3() {
    if (window.ethereum) {
        const web3 = new Web3(Web3.givenProvider);
        setWeb3(web3);
    } else {
        console.log('Please install MetaMask');
    }
  }

  // Initialize web3 on component mount
  useEffect(() => {
      initializeWeb3();
  }, [])

  return (
    <>
    <Toolbar>TangoNFT 💃</Toolbar>
    <Container>
    <Grid container>
        <Grid item xs={4}>
            <Box m={4}>
                <Typography variant='h5'>
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
            {address ? (
              <>
              <div className="row" id="welcome">
                <Typography variant='h5'>Your Rooms:</Typography>
                <small>You have access to rooms based on the NFTs you hold in your wallet.</small>
              </div>

              <Select
                value=''
                onChange={val => selectCollection(val)}
                displayEmpty>
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              </>
            ) : ''}
            </Box>
            <Box>
            <p><b>What is this?</b></p>
            <p>A little side-project by <b><Link href="https://twitter.com/pixelbeastsnft" target="_blank">PixelBeasts</Link></b>. Let us know what you think in our <Link href="https://discord.gg/YSqMfAnqzX">Discord</Link>!</p>
            <p>There's a private message board for every NFT collection, only displaying the last 100 messages. You can only read and write in the message boards for NFT collections in which you're an owner.</p>
            <p><i>Only works in Browser, with Metamask installed.</i></p>
            <p>Check out <Link href="https://tangonft.com/draw/" target="_blank">Tango Draw: a drawing board for every NFT collection</Link>!</p>
            <div className="alert alert-info">If the "submit" Button doesn't work the first time, try again. It's sometimes buggy.</div>
            </Box>
        </Grid>

        {address && true ? (
        <Grid container item xs={8}>
            <Box m={4}>
                <Grid item xs={9}>
                    <div className="row" id="room_title"></div>
                    <div className="row mt-4" id="messagebox">
                    <div className="col-3">
                        <select className="form-control" id="pfp_options"></select>
                    </div>
                    <div className="col-7">
                        <div className="form-group">
                        <Input className="form-control" id="message_form_box"/>
                        </div>
                    </div>
                    <div className="col-2">
                        <Button className="btn btn-primary" id="submit" disabled>Send</Button>
                    </div>
                    </div>
                    <div className="row mt-4" id="messages"></div>
                </Grid>
            </Box>
        </Grid>
        ) : ''}
    </Grid>
  </Container>
  </>
  );
}
