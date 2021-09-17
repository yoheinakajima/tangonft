import * as Web3 from 'web3';
import {
    AppBar,
    Box,
    Button,
    Chip,
    Container,
    Grid,
    Input,
    InputLabel,
    Link,
    MenuItem,
    Select,
    Toolbar,
    Typography,
} from '@mui/material';
import { alpha, makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    accountButton: {
        position: 'relative',
        marginLeft: 0,
        width: '100%',
    },
    accountChip: {
        width: '100px',
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        flexGrow: 1,
    },
}));

export default function Home() {
  const classes = useStyles();

  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [activeCollection, setActiveCollection] = useState();
  const [assets, setAssets] = useState(null);
  const [collections, setCollections] = useState([]);

  // Get accounts and set address in state
  async function handleOnClick(_web3) {
    try {
        const accounts = await _web3.eth.getAccounts();
        setAddress(accounts[0]);

        const assets = getAssets(accounts[0]);
        setAssets(assets);
    } catch (err) {
        console.error('Something went wrong:', err);
    }
  }

  async function getAssets(accountId) {
      const url = `https://api.opensea.io/api/v1/assets?owner=${accountId}&order_direction=desc&offset=0&limit=50`;
      const nfts = [];
      const existingCollections = {};

      fetch(url)
          .then(resp => (resp.json()))
          .then(data => {
              var assets = data["assets"];
              assets.map(asset => {
                  console.log(asset);
                  var id = (asset["id"]);
                  var name = (asset["name"]);
                  var permalink = (asset["permalink"]);
                  var imageUrl = (asset["image_preview_url"]);
                  var collectionName = (asset["collection"]["name"]);
                  var collectionExternalLink = (asset["collection"]["external_link"]);
                  var assetContractAddress = (asset["asset_contract"]["address"]);

                  if (Object.keys(existingCollections).includes(collectionName)) {
                      existingCollections[collectionName]['items'].push({
                          id: id,
                          name: name,
                          permalink: permalink,
                          imageUrl: imageUrl,
                      });
                  } else {
                      existingCollections[collectionName] = {
                          externalLink: collectionExternalLink,
                          contractAddress: assetContractAddress,
                          items: [{
                              id: id,
                              name: name,
                              permalink: permalink,
                              imageUrl: imageUrl,
                          }],
                      };
                  }
              });

              Object.keys(existingCollections).sort().map(collection => {
                  collections.push(
                      <MenuItem value={collection} id={collection}>{collection}</MenuItem>
                  );

              });
          });

      return existingCollections;
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
        <div className={classes.toolbar}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h5'>TangoNFT 💃</Typography>
                    <div className={classes.accountButton}>
                        {address ? (
                            <Chip className={classes.accountChip} color='secondary' label={address}/>
                        ) : (
                            <Button color='secondary' variant='contained' onClick={() => handleOnClick(web3)}>
                                Connect to Metamask
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>

    <Container className={classes.toolbar}>
        <Grid container>
            <Grid item xs={6}>
                <Box m={4}>
                    <Typography variant='h4'>
                        A private ephemeral message board for every NFT collection.
                    </Typography>
                </Box>
                <Box m={4} mt={2}>
                    <div className="row" id="welcome">
                        <Typography variant='h5'>Your Rooms:</Typography>
                        {address ? (
                        <>
                            <small>You have access to rooms based on the NFTs you hold in your wallet.</small>

                            <InputLabel id="collectionLabel">Collections</InputLabel>
                            <Select
                                value={activeCollection}
                                onChange={event => setActiveCollection(event.target.value)}>
                                {collections}
                            </Select>
                        </>
                        ) :
                        <small>Please connect your wallet</small>
                        }
                    </div>
                </Box>

                <Box m={4}>
                    <p><b>What is this?</b></p>
                    <p>A little side-project by <b><Link href="https://twitter.com/pixelbeastsnft" target="_blank">PixelBeasts</Link></b>. Let us know what you think in our <Link href="https://discord.gg/YSqMfAnqzX">Discord</Link>!</p>
                    <p>There's a private message board for every NFT collection, only displaying the last 100 messages. You can only read and write in the message boards for NFT collections in which you're an owner.</p>
                    <p><i>Only works in Browser, with Metamask installed.</i></p>
                    <p>Check out <Link href="https://tangonft.com/draw/" target="_blank">Tango Draw: a drawing board for every NFT collection</Link>!</p>
                    <div className="alert alert-info">If the "submit" Button doesn't work the first time, try again. It's sometimes buggy.</div>
                </Box>
            </Grid>

            {address && activeCollection ? (
            <Grid container item xs={6}>
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
