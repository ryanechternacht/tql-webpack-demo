module.exports = (env) => {

    if(env === 'local') {
        return buildLocal();
    } else if(env === 'dev') {
        return buildDev();
    } else if(env === 'test') {
        return buildTest();
    } else if(env === 'uat') {
        return buildUat();
    } else if(env === 'prod') {
        return buildProd();
    } else {
        console.log("no environment set. falling back to local");
        return buildLocal();
    }

    function buildLocal() {
        return {
            basehref: '/'
        };
    }

    function buildDev() {
        return {
            basehref: '/front/'
        };
    }

    function buildTest() {
        return {
            // basehref: ''
        };
    }

    function buildUat() {
        return {
            // basehref: ''
        };
    }

    function buildProd() {
        return {
            // basehref: ''
        };
    }
}