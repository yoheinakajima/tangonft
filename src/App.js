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
}));

const ethEnabled = async () => {
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
        return true;
    }
    return false;
}

function App() {
  const styles = useStyles();

  return (
      <Container classes={{ root: styles.main }}>
          <Grid container>
              <Grid item xs={4}>
                  <Box m={4}>
                      <div>
                          <span id="Button_container">
                              <Typography variant='h4'>A private ephemeral message board for every NFT collection.</Typography>
                              <p>Log-in with Metmask to see which rooms you have access to.</p>
                              <Button color='primary' onClick={ethEnabled}>Connect to Metamask</Button>
                          </span>
                      </div>
                      <div className="row" id="welcome">
                          <Typography variant='h5'>Your Rooms:</Typography>
                          <small>You have access to rooms based on the NFTs you hold in your wallet.</small>
                      </div>

                      <Select
                          value=''
                          onChange={() => {}}
                          displayEmpty>
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
          </Grid>
      </Container>
  );
}

export default App;
