<?php

function mysqlconnect(){
  mysql_connect("localhost", "***", "***!") or die(mysql_error());
  mysql_select_db("nftplayground") or die(mysql_error());
}



mysqlconnect();

?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Yohei Nakajima">
    <title>Playground</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>


    <style>
      main {
        font-size: 14px;
      }
    </style>


    <script>
      $('document').ready(function(){

        const ethereumButton = document.querySelector('.enableEthereumButton');
        const showAccount = document.querySelector('.showAccount');
        const showAssets = document.querySelector('.showAssets');
        const showCollections = document.querySelector('.showAssets');
        var assets;
        var nfts = {};

        ethereumButton.addEventListener('click', () => {
          getAccount();
        });


        /* This function connects to Metamask*/
        async function getAccount() {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          //showAccount.innerHTML = account;
          getassets(account);
        }

        function getassets(id){
          const options = {method: 'GET'};
          var collection_names = [];
          var collections = [];
          

          fetch('https://api.opensea.io/api/v1/assets?owner='+id+'&order_direction=desc&offset=0&limit=20', options)
            .then(function(response) {
              return response.json();
            }).then(function(data) {
              $("#button_container").hide();
              $("#welcome").show();
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

                
                //$(".showAssets").append(name+"<br>");


                //create arrays
                if(jQuery.inArray(collection_name, collection_names) != -1) {
                  collections[collection_name]["count"]++;
                } else {
                  collection_names.push(collection_name);
                  collections[collection_name]={};
                  collections[collection_name]["count"]=1;
                  collections[collection_name]["collection_name"]=collection_name;
                } 

              }
              $(".showCollections").empty();
              for (const collection_name of collection_names){
                $(".showCollections").append("<li class='list-group-item list-group-item-action collection' collection_name='"+collection_name+"'>"+collections[collection_name]["collection_name"]+"</li>");
                listHover();
              }
              clickCollections();
            }).catch(
              err => console.error(err)
            );
        }

        function clickCollections(){

          $(".collection").click(function(){
            var collection_name = $(this).attr("collection_name");
            $(".collection").removeClass("active");
            $(this).addClass("active");
            $("#submit").attr("collection",collection_name);


            $('#room_title').html("<h4><b>"+collection_name+" <span style='color:#999'>Room</span>:</b></h4>");
            $('#messagebox').show();
            $('#messages').show();
            $('#messages').load('messages.php',{'collection': collection_name});
            $("#submit").prop("disabled",true);


            //$(".choose_nft").html("<b>"+collection_name+"</b>");
            //$(".showNFTs").empty();
            //$(".image").empty();
            $("#pfp_options").empty();

            for (var i in nfts){
              if(collection_name == nfts[i]["collection"]){
                console.log(nfts[i]);
                console.log(i);
                $("#pfp_options").append("<option>"+nfts[i]["name"]+"</option>");
                //$(".showNFTs").append("<li class='list-group-item list-group-item-action nft' nft_id="+nfts[i]["id"]+" nft_name='"+nfts[i]["collection"]+"'>"+nfts[i]["name"]+"</li>");
                listHover()
              }
            }

            $("#message_form_box").val("");
            clickNFTs();
            
          });
        }

        function clickNFTs(){
          $(".nft").click(function(){
            var nft_id = $(this).attr("nft_id");
            var nft_name = $(this).attr("nft_name");
            $(".nft").removeClass("active");
            $(this).addClass("active");
            var image_url = nfts[nft_id]["image_url"];
            console.log(image_url);
            $(".image").html("<img src='"+image_url+"'>");

          });
        }

        function listHover(){
          $("li").hover(function(){
            $(this).css('cursor','pointer');
          });
        }

        //$('#messages').load('messages.php');
        $('#messages').hide();
        $('#messagebox').hide();
        $("#welcome").hide();
        $("#buggy").hide();

        $('#submit').on('click', function(e) {
          var collection = $(this).attr("collection");
          var pfp = $("#pfp_options").val();
          var message = $("#message_form_box").val();
          $("#buggy").css("display", "block");
          
          add_message(collection,pfp,message);
        });

        function add_message(collection,pfp,message){
          dataString = {
            'collection':collection,
            'pfp':pfp,
            'message':message
          };
          console.log("added data string");
          console.log(collection);
          console.log(pfp);
          console.log(message);
          $.ajax({
            'type':"POST",
            url: "add_message.php",
            'data': dataString,
            'success':function(data){
              $('#messages').load('messages.php',{'collection': collection});
              $("#message_form_box").val("");
            }
          });


        }

        $("#message_form_box").on("input", function(){
          if ($(this).val() == ""){
            $("#submit").prop("disabled",true);
          } else {
            $("#submit").prop("disabled",false);

          }
        });


      });
    </script>
</head>
<body>
  <main>
    <div class="container mt-4">
      <div class="row">
        <div class="col-3 mt-4">
          <span id="button_container">
            <h4><b>A private ephemeral message board for every NFT collection.</b></h4>
            <p>Log-in with Metmask to see which rooms you have access to.</p>
            <button type="button" class="btn btn-primary enableEthereumButton">Connect to Metamask</button>
          </span>

          <div class="row" id="welcome">
            <h4><b>Your Rooms:</b></h4>
            <small style="color:#999">You have access to rooms based on the NFTs you hold in your wallet.</small>
          </div>
          <div class="mt-4">
            <div class="list-group showCollections">
            </div>
          </div>
          <div class="mt-4">
            <p>A little side-project by <b><a href="https://twitter.com/pixelbeastsnft" target="_blank">PixelBeasts</a></b>. Let us know what you think in our <a href="https://discord.gg/YSqMfAnqzX">Discord</a>!<p>
            <p>Check out <a href="https://tangonft.com/draw/" target="_blank">Tango Draw: a drawing board for every NFT collection</a>!</p>
            <p><b>What is this?</b></p>
            <p>There's a private message board for every NFT collection, only displaying the last 100 messages. You can only read and write in the message boards for NFT collections in which you're an owner.</p>
            <p><i>Only works in Browser, with Metamask installed.</i></p>
            <div class="alert alert-info" role="alert" id="buggy">If the "submit" button doesn't work the first time, try again. It's sometimes buggy.</div>
          </div>
        </div>
        <div class="col-9 .d-none .d-md-block .d-xl-block">
          <div class="row" id="room_title">

          </div>
          <div class="row mt-4" id="messagebox">
            <div class="col-3">
              <select class="form-control" id="pfp_options" style="font-size:14px">
              </select>
            </div>
            <div class="col-7">
              <div class="form-group">
                <input class="form-control" id="message_form_box">
              </div>
            </div>
            <div class="col-2">
              <button class="btn btn-primary" id="submit" disabled>Send</button>
            </div>
          </div> <!-- end row -->
          <div class="row mt-4" id="messages">

          </div> <!-- end row -->
        </div>

        <!--
        <div class="col-3 assets">
          <div class="choose_nft mb-4">
            
          </div>
          <div class="showNFTs">
          </div>
        </div>
        <div class="col-3">
          <div class="image">
          </div>
        </div>
        <div class="col-3">
          
        </div>
        -->

      </div>
    </div>
  </main>
  <script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>