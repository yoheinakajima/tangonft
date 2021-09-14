import './App.css';
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
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    main: {
        width: "80vw",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "left",
        "& > *": {
            textAlign: "left",
        },
    },
    builtByText: {
        position: "absolute",
        bottom: "1rem",
        margin: "0 auto",
    },
}));

const ethEnabled = async () => {
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
        return true;
    }
    return false;
}

const getAccount = () => {
    // const accounts = ethereum.request({ method: 'eth_requestAccounts' });
    // const account = accounts[0];
    // //showAccount.innerHTML = account;
    // getassets(account);
}

// function getassets(id){
//     const options = {method: 'GET'};
//     var collection_names = [];
//     var collections = [];

//     fetch('https://api.opensea.io/api/v1/assets?owner='+id+'&order_direction=desc&offset=0&limit=20', options)
//     .then(function(response) {
//         return response.json();
//     }).then(function(data) {
//         // $("#Button_container").hide();
//         // $("#welcome").show();
//         var assets = data["assets"];
//         for (const asset of assets){
//         console.log(asset);
//         var id = (asset["id"]);
//         var name = (asset["name"]);
//         var permalink = (asset["permalink"]);
//         var image_url = (asset["image_preview_url"]);
//         var collection_name = (asset["collection"]["name"]);
//         var collection_external_link = (asset["collection"]["external_link"]);
//         var asset_contract_address = (asset["asset_contract"]["address"]);
//         nfts[id]={};
//         nfts[id]["id"]=id;
//         nfts[id]["name"]=name;
//         nfts[id]["collection"]=collection_name;
//         nfts[id]["image_url"]=image_url;

//         //create arrays
//         // if(jQuery.inArray(collection_name, collection_names) != -1) {
//         //     collections[collection_name]["count"]++;
//         // } else {
//         //     collection_names.push(collection_name);
//         //     collections[collection_name]={};
//         //     collections[collection_name]["count"]=1;
//         //     collections[collection_name]["collection_name"]=collection_name;
//         // } 

//         // }
//         // $(".showCollections").empty();
//         // for (const collection_name of collection_names){
//         // $(".showCollections").append("<li class='list-group-item list-group-item-action collection' collection_name='"+collection_name+"'>"+collections[collection_name]["collection_name"]+"</li>");
//         // listHover();
//         }
//         // clickCollections();
//     }).catch(
//         err => console.error(err)
//     );
// }

function App() {
  const styles = useStyles();
  const connected = true;

  // const nfts = [];
  // ethEnabled();

  return (
      <Container classes={{ root: styles.main }}>
          <Grid container>
          <Grid item xs={4}>
          <Box m={4}>
                  <div>
                      <span id="Button_container">
                          <Typography variant='h4'>A private ephemeral message board for every NFT collection.</Typography>
                          <p>Log-in with Metmask to see which rooms you have access to.</p>
          <Button color='primary' onClick={() => {console.log('hi')}}>Connect to Metamask</Button>
                      </span>
                  </div>
                  <div className="row" id="welcome">
                      <Typography variant='h5'>Your Rooms:</Typography>
                      <small>You have access to rooms based on the NFTs you hold in your wallet.</small>
                  </div>

          <Select
            value=''
            onChange={() => {}}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
          </Select>

          <div>
            <p><b>What is this?</b></p>
            <p>A little side-project by <b><Link href="https://twitter.com/pixelbeastsnft" target="_blank">PixelBeasts</Link></b>. Let us know what you think in our <Link href="https://discord.gg/YSqMfAnqzX">Discord</Link>!</p>
            <p>There's a private message board for every NFT collection, only displaying the last 100 messages. You can only read and write in the message boards for NFT collections in which you're an owner.</p>
            <p><i>Only works in Browser, with Metamask installed.</i></p>
            <p>Check out <a href="https://tangonft.com/draw/" target="_blank">Tango Draw: a drawing board for every NFT collection</a>!</p>
            <div className="alert alert-info">If the "submit" Button doesn't work the first time, try again. It's sometimes buggy.</div>
          </div>
          </Box>
          </Grid>
          <Grid container item xs={8}>
          <>
          {connected == true &&
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
          }</>
          </Grid>
          </Grid>
        </Container>
  );
}

export default App;
