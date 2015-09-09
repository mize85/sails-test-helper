/*
 * Sails application launcher.
 * Using node-test-helper's beforeAll/afterAll extended functions.
 *
 */

//==============================================================================

beforeAll(function(done) {
  
  // add delay for slow server
  setTimeout(function(){
    console.log("wait sails shut down...");
    require("sails").lift({
    //-- turn down the log level so we can view the test results
    log: {
      level: "silent"
    }
    }, function(err, sails) {
      done && done(err, sails);
    });
    
  }, 1000);
});

//------------------------------------------------------------------------------

afterAll(function(done) {
  //-- NOTE: This is a workaround for sails.lower multiple callback calls...
  var _shutting_down = false;
  function _shutdown(err) {
    if (!_shutting_down) {
      _shutting_down = true;
      done && done(err);
    }
  }

  (typeof sails != "undefined") ? sails.lower(_shutdown) : _shutdown();
});
