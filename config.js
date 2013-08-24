var pkg = require('./package.json');

module.exports = function( confg ){

    confg.configuration({
    	NAME: pkg.name,
    	VERSION: pkg.version,
        APPSTARTUP: ( +new Date() ) + '',
        DEBUG: 'app'
    });
};