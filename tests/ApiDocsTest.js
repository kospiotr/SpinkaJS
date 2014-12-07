var expect = require('chai').expect,
        instance = require('../src/server/routes/rest-docs.js');

describe('render Info', function () {
    var result = new instance({
    }).renderInfo();
    expect(result).to.have.property('title', 'Swagger Petstore');

});

describe('render single path', function () {
    var options = {};
    var path = {
        "handle": {
          stack: [
              {"keys":[],"regexp":{},"route":{"path":"/","stack":[{"method":"get"}],"methods":{"get":true}},"params":{},"path":"/"}]  
        },
        "keys": [], 
        "regexp": {}, 
        "params": {}, 
        "path": "/scientist"
    };
    var result = new instance(options).renderSinglePath(path);
//    expect(result).to.eql('title', 'Swagger Petstore');

});
 