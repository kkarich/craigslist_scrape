var casper = require('casper').create();
//Check For new Listings
var listings;
var partialUrl = 'http://chicago.craigslist.org';
casper.start('http://chicago.craigslist.org/search/wcl/apa?min_price=500&max_price=1100&pets_cat=1&query=geneva', function() {
  this.echo(this.getTitle())
 // Get info on all elements matching this CSS selector
  listings = this.evaluate(function() {
    var results = ($("p.row a.i")).not('[href*="craigslist"]');
    return [].map.call(results, function(result) {
      return result.getAttribute('href') ;
    });


  });

  for(var i in listings){
    var listing = listings[i]
    this.echo(partialUrl + listing)
      this.thenOpen(partialUrl + listing, function() {
        this.echo(this.getTitle());
        this.then(function(){
          if(this.exists('.reply_button')){
            this.click('.reply_button');
            this.echo("I've clicked the reply button");
          }

        });

        this.then(function(){
          this.wait(1000, function() {
            this.echo("I've waited for a second.");
            if(!this.exists('.mailapp')){
              this.echo("Could not find")
              this.echo(this.fetchText('.mailapp'));
            }
            else{

              this.echo(this.fetchText('.mailapp'));
            }
            });
        });






      });
  }



});


casper.run();


    // casper.then(function() {
    //     // Click on 1st result link
    //     this.click('.reply_button');
    //
    //        this.echo("I've clicked the reply button");
    // });
    //
    // casper.then(function() {
    //     // Click on 1st result link
    //     this.click('.reply_button');
    //     this.wait(1000, function() {
    //        this.echo("I've waited for a second.");
    //    });
    //
    // });
    //
    // casper.then(function() {
    //     // Click on 1st result link
    //   this.echo(this.fetchText('.mailapp'));
    //
    //
    //
    // });
