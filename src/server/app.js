var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var swagger = require("swagger-node-express");
var multer = require('multer');
var index = require('./routes/index.js');

var App = function () {
    var me = this;

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    me.setupVariables = function () {
        //  Set the environment variables we need.
        me.ipaddress = process.env.NODEJS_IP;
        me.port = process.env.NODEJS_PORT || 8080;
        if (typeof me.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No NODEJS_IP var, using 127.0.0.1');
            me.ipaddress = "127.0.0.1";
        }
        ;
    };

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    me.terminator = function (sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...',
                    Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    me.setupTerminationHandlers = function () {
        //  Process on exit and signals.
        process.on('exit', function () {
            me.terminator();
        });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function (element, index, array) {
            process.on(element, function () {
                me.terminator(element);
            });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    me.initializeServer = function () {
        app.use(bodyParser.json());       // to support JSON-encoded bodies
        app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
        app.use(multer({dest: './uploads/'}));
        app.use('/', index);
        app.get('/api-docs', function (req, res) {
            var a = app;
            var out = {
                "swagger": "2.0",
                "info": {
                    "description": "This is a sample server Petstore server.  You can find out more about Swagger at <a href=\"http://swagger.wordnik.com\">http://swagger.wordnik.com</a> or on irc.freenode.net, #swagger.  For this sample, you can use the api key \"special-key\" to test the authorization filters",
                    "version": "1.0.0",
                    "title": "Swagger Petstore",
                    "termsOfService": "http://helloreverb.com/terms/",
                    "contact": {
                        "name": "apiteam@wordnik.com"
                    },
                    "license": {
                        "name": "Apache 2.0",
                        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
                    }
                },
                "host": "petstore.swagger.wordnik.com",
                "basePath": "/v2",
                "schemes": [
                    "http"
                ],
                "paths": {
                    "/pet/{petId}": {
                        "get": {
                            "tags": [
                                "pet"
                            ],
                            "summary": "Find pet by ID",
                            "description": "Returns a pet when ID < 10.  ID > 10 or nonintegers will simulate API error conditions",
                            "operationId": "getPetById",
                            "produces": [
                                "application/json",
                                "application/xml"
                            ],
                            "parameters": [
                                {
                                    "in": "path",
                                    "name": "petId",
                                    "description": "ID of pet that needs to be fetched",
                                    "required": true,
                                    "type": "integer",
                                    "format": "int64"
                                }
                            ],
                            "responses": {
                                "404": {
                                    "description": "Pet not found"
                                },
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/Pet"
                                    }
                                },
                                "400": {
                                    "description": "Invalid ID supplied"
                                }
                            },
                            "security": [
                                {
                                    "api_key": []
                                },
                                {
                                    "petstore_oauth2": ["email"]
                                }
                            ]
                        }
                    }
                },
                "definitions": {
                    "User": {
                        "properties": {
                            "id": {
                                "type": "integer",
                                "format": "int64",
                                "xml": {
                                    "name": "id"
                                }
                            },
                            "username": {
                                "type": "string",
                                "xml": {
                                    "name": "username"
                                }
                            },
                            "firstName": {
                                "type": "string",
                                "xml": {
                                    "name": "firstName"
                                }
                            },
                            "lastName": {
                                "type": "string",
                                "xml": {
                                    "name": "lastName"
                                }
                            },
                            "email": {
                                "type": "string",
                                "xml": {
                                    "name": "email"
                                }
                            },
                            "password": {
                                "type": "string",
                                "xml": {
                                    "name": "password"
                                }
                            },
                            "phone": {
                                "type": "string",
                                "xml": {
                                    "name": "phone"
                                }
                            },
                            "userStatus": {
                                "type": "integer",
                                "format": "int32",
                                "xml": {
                                    "name": "userStatus"
                                },
                                "description": "User Status"
                            }
                        },
                        "xml": {
                            "name": "User"
                        }
                    },
                    "Category": {
                        "properties": {
                            "id": {
                                "type": "integer",
                                "format": "int64",
                                "xml": {
                                    "name": "id"
                                }
                            },
                            "name": {
                                "type": "string",
                                "xml": {
                                    "name": "name"
                                }
                            }
                        },
                        "xml": {
                            "name": "Category"
                        }
                    },
                    "Pet": {
                        "required": [
                            "name",
                            "photoUrls"
                        ],
                        "properties": {
                            "id": {
                                "type": "integer",
                                "format": "int64",
                                "xml": {
                                    "name": "id"
                                }
                            },
                            "category": {
                                "xml": {
                                    "name": "category"
                                },
                                "$ref": "Category"
                            },
                            "name": {
                                "type": "string",
                                "example": "doggie",
                                "xml": {
                                    "name": "name"
                                }
                            },
                            "photoUrls": {
                                "type": "array",
                                "xml": {
                                    "name": "photoUrl",
                                    "wrapped": true
                                },
                                "items": {
                                    "type": "string"
                                }
                            },
                            "tags": {
                                "type": "array",
                                "xml": {
                                    "name": "tag",
                                    "wrapped": true
                                },
                                "items": {
                                    "$ref": "Tag"
                                }
                            },
                            "status": {
                                "type": "string",
                                "xml": {
                                    "name": "status"
                                },
                                "description": "pet status in the store"
                            }
                        },
                        "xml": {
                            "name": "Pet"
                        }
                    },
                    "Tag": {
                        "properties": {
                            "id": {
                                "type": "integer",
                                "format": "int64",
                                "xml": {
                                    "name": "id"
                                }
                            },
                            "name": {
                                "type": "string",
                                "xml": {
                                    "name": "name"
                                }
                            }
                        },
                        "xml": {
                            "name": "Tag"
                        }
                    },
                    "Order": {
                        "properties": {
                            "id": {
                                "type": "integer",
                                "format": "int64",
                                "xml": {
                                    "name": "id"
                                }
                            },
                            "petId": {
                                "type": "integer",
                                "format": "int64",
                                "xml": {
                                    "name": "petId"
                                }
                            },
                            "quantity": {
                                "type": "integer",
                                "format": "int32",
                                "xml": {
                                    "name": "quantity"
                                }
                            },
                            "shipDate": {
                                "type": "string",
                                "format": "date-time",
                                "xml": {
                                    "name": "shipDate"
                                }
                            },
                            "status": {
                                "type": "string",
                                "xml": {
                                    "name": "status"
                                },
                                "description": "Order Status"
                            },
                            "complete": {
                                "type": "boolean"
                            }
                        },
                        "xml": {
                            "name": "Order"
                        }
                    }
                }
            }
            res.json(out);
        });
//        app.get('/d', function (req, res) {
//            console.log('\n********************************************');
//            console.log('\t\tEXPRESS');
//            console.log('********************************************\n');
//            var routes = app._router.stack;
//            var table = [];
//            for (var key in routes) {
//                if (routes.hasOwnProperty(key)) {
//                    var val = routes[key];
//                    if (val.route)
//                    {
//                        val = val.route;
//                        var _o = {};
//                        _o[val.stack[0].method] = [val.path, val.path];
//                        console.log('Row: '+_o);
//                        table.push(_o);
//                    }
//                }
//            }
//            console.log(table.toString());
//            res.json(table);
//        });


        swagger.setAppHandler(app);
    };


    /**
     *  Initializes the sample application.
     */
    me.initialize = function () {
        me.setupVariables();
        me.setupTerminationHandlers();

        // Create the express server and routes.
        me.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    me.start = function () {
        //  Start the app on the specific interface (and port).
        app.listen(me.port, me.ipaddress, function () {
            console.log('%s: Node server started on %s:%d ...', Date(Date.now()), me.ipaddress, me.port);
        });
    };

    me.initialize();
};

module.exports = App;