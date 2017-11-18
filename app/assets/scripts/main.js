// This allows us to specify jQuery as a dependancy in one of our modules
// You'll notice all paths are relative to Assets/Scripts/
require.config({
    paths : {
        'jquery' : 'utils/jquery-3.2.1'
    }
});

/*
 When we're defining a module we use the define() method.
 We'll see this used shortly.
 But as this is our main 'bootstrapping' script we're using the require() function instead.

 The require() function is similar to define() in that you pass it an optional array of dependencies,
 and a function which will be executed when those dependencies are resolved.
 However this code is not stored as a named module, as its purpose is to be run immediately.
 */

require(["guiControll/navigation", "guiControll/imageCarousel"], function() {
    // The argument passed through is the returned value from the function definition we defined inside App/people.js
    // In this case it was an object literal with two properties: 'list' & 'scripts'
    // If we had specified two dependencies then we'd pass through a second argument
    // which again would be the return'ed value from that module

    console.log('frt: I called main.js');
});