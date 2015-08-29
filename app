var
  craigslist = require('node-craigslist');
  client = craigslist({
    city : 'seattle'
  }),
  options = {
    category : '', // defaults to sss (all)
    city : 'boston',
    maxAsk : '200',
    minAsk : '100'
  };

client.search(options, 'xbox one', function (err, listings) {
  // listings (from Boston instead of Seattle)
});
