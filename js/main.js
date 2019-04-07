// var json = [
// { 'red': '#f00' },
// { 'green': '#0f0' },
// { 'blue': '#00f' }
// ];

// $.each(json, function () {
//   $.each(this, function (name, value) {
//     console.log(name + '=' + value);
//   });
// });


// A comma separated list of currencies to display.
var ticker_currencies = "USD,EUR,JPY,CNY"

ticker = function(currencies) {

  $.ajax({
    type: "GET",
    url: "https://slpdb.bitcoin.com/q/ewogICJ2IjogMywKICAicSI6IHsKICAgICJkYiI6IFsidCJdLAogICAgImZpbmQiOiB7fSwKICAgICJzb3J0IjogewogICAgICAidG9rZW5TdGF0cy5xdHlfdmFsaWRfdHhuc19zaW5jZV9nZW5lc2lzIjogLTEKICAgIH0sCiAgICAicHJvamVjdCI6IHsKICAgICAgInRva2VuRGV0YWlscy50b2tlbklkSGV4IjogMSwKICAgICAgInRva2VuU3RhdHMucXR5X3ZhbGlkX3R4bnNfc2luY2VfZ2VuZXNpcyI6IDEsCiAgICAgICJ0b2tlbkRldGFpbHMubmFtZSI6IDEsCiAgICAgICJ0b2tlbkRldGFpbHMuc3ltYm9sIjogMSwKICAgICAgInRva2VuRGV0YWlscy5kb2N1bWVudFVyaSI6IDEKICAgIH0sCiAgICAibGltaXQiOiAxMDAwCiAgfSwKICAiciI6IHsKICAgICJmIjogIlsuW10gfCB7dG9rZW5JZDogLnRva2VuRGV0YWlscy50b2tlbklkSGV4LCB0cmFuc2FjdGlvbkNvdW50OiAudG9rZW5TdGF0cy5xdHlfdmFsaWRfdHhuc19zaW5jZV9nZW5lc2lzLCAgbmFtZTogLnRva2VuRGV0YWlscy5uYW1lLCAgc3ltYm9sOiAudG9rZW5EZXRhaWxzLnN5bWJvbCwgdXJsOiAudG9rZW5EZXRhaWxzLmRvY3VtZW50VXJpfV0iCiAgfQp9",
    contentType: "application/json; charset=utf-8",
    timeout: 6000,
    error: function (x, t, m) {
      if ($('#podium').html() === 'Loading...') {
        $("#podium").html("<div class='currency'>SLP data not found</div>");
      }
    },
    success: function (slpTokens) {


      


      var output = [];
      var rankings = [];

      $.each(slpTokens, function () {
        $.each(this, function (index) {
            index = index+1;
          if (index > 100) {
              return false;
          }

          // console.log(this);

          // console.log(this.symbol);

          var symbol = this.symbol;
          var tokenId = this.tokenId;
          var name = this.name;
          var txCount = this.transactionCount;
          var url = this.url;



          // console.log('Rank: ' + index + ' / txCount: ' + txCount + ' / symbol: ' + symbol + ' / tokenID: ' + tokenId + ' / name: ' + name);
          if (index < 4) { 
            output.push("<div class='podium-rank position-" + index + "'><div class='rank-" + index + "'><div class='medal'><h3 class='position'>" + index + "</h3></div><h4>" + name + "</h4><h5>" + txCount + " transactions</h5><h3 class='symbol'>" + symbol + "</h3></div></div>");
          } else {
            rankings.push("<div class='rank rank-" + index + "'><h3 class='position'>" + index + "</h3><h4>" + name + "</h4><h3 class='symbol'>" + symbol + "</h3><h5>" + txCount + " transactions</h5></div>");
          }
          // $.each(this, function (name, value) {
          //   // console.log(name + '=' + value);
          //   // console.log(this);
          // });
        });
      });

      $('#podium').html(output);
      $('#rankings').html(rankings)


      // var i = 0;

      // for(var i=0; i<output.length; i++) {

      // }

      // $.each(slpTokens, function (k, v) {
      //   // console.log(k);
      //   // console.log(v);
      //   console.log(v[0]);
      //   console.log(k);
      //   output.push("<div class='token'>Test</div>");
      //   i++;
      // });

      // $('#podium').html(output);
    }
  }).done(function () {
    setTimeout(function(){ ticker(ticker_currencies); }, 20000);
  }).fail(function() {
    setTimeout(function(){ ticker(ticker_currencies); }, 20000);
  });
}

ticker(ticker_currencies);
