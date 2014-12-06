var _ = require('underscore');

var ApiDocs = function (app, options) {
    return function (req, res) {
        
        var renderInfo = function () {
            var _app = app;
            return {
                "description": "This is a sample server Petstore server.  You can find out more about Swagger at <a href=\"http://swagger.wordnik.com\">http://swagger.wordnik.com</a> or on irc.freenode.net, #swagger.  For this sample, you can use the api key \"special-key\" to test the authorization filters",
                "version": "1.0.0",
                "title": "Swagger Petstore",
            }
        };
        
        var renderPaths = function (layer) {
            
        };
        var renderPaths = function () {
            var stack = app._router.stack;
            return _.each(stack,function(elem, index, list){
                renderSinglePath();
            }); 
            return {
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
            };
        };
        var renderDefinitions = function () {
            return {};
//            return {
//                "User": {
//                    "properties": {
//                        "id": {
//                            "type": "integer",
//                            "format": "int64",
//                            "xml": {
//                                "name": "id"
//                            }
//                        },
//                        "username": {
//                            "type": "string",
//                            "xml": {
//                                "name": "username"
//                            }
//                        },
//                        "firstName": {
//                            "type": "string",
//                            "xml": {
//                                "name": "firstName"
//                            }
//                        },
//                        "lastName": {
//                            "type": "string",
//                            "xml": {
//                                "name": "lastName"
//                            }
//                        },
//                        "email": {
//                            "type": "string",
//                            "xml": {
//                                "name": "email"
//                            }
//                        },
//                        "password": {
//                            "type": "string",
//                            "xml": {
//                                "name": "password"
//                            }
//                        },
//                        "phone": {
//                            "type": "string",
//                            "xml": {
//                                "name": "phone"
//                            }
//                        },
//                        "userStatus": {
//                            "type": "integer",
//                            "format": "int32",
//                            "xml": {
//                                "name": "userStatus"
//                            },
//                            "description": "User Status"
//                        }
//                    },
//                    "xml": {
//                        "name": "User"
//                    }
//                },
//                "Category": {
//                    "properties": {
//                        "id": {
//                            "type": "integer",
//                            "format": "int64",
//                            "xml": {
//                                "name": "id"
//                            }
//                        },
//                        "name": {
//                            "type": "string",
//                            "xml": {
//                                "name": "name"
//                            }
//                        }
//                    },
//                    "xml": {
//                        "name": "Category"
//                    }
//                },
//                "Pet": {
//                    "required": [
//                        "name",
//                        "photoUrls"
//                    ],
//                    "properties": {
//                        "id": {
//                            "type": "integer",
//                            "format": "int64",
//                            "xml": {
//                                "name": "id"
//                            }
//                        },
//                        "category": {
//                            "xml": {
//                                "name": "category"
//                            },
//                            "$ref": "Category"
//                        },
//                        "name": {
//                            "type": "string",
//                            "example": "doggie",
//                            "xml": {
//                                "name": "name"
//                            }
//                        },
//                        "photoUrls": {
//                            "type": "array",
//                            "xml": {
//                                "name": "photoUrl",
//                                "wrapped": true
//                            },
//                            "items": {
//                                "type": "string"
//                            }
//                        },
//                        "tags": {
//                            "type": "array",
//                            "xml": {
//                                "name": "tag",
//                                "wrapped": true
//                            },
//                            "items": {
//                                "$ref": "Tag"
//                            }
//                        },
//                        "status": {
//                            "type": "string",
//                            "xml": {
//                                "name": "status"
//                            },
//                            "description": "pet status in the store"
//                        }
//                    },
//                    "xml": {
//                        "name": "Pet"
//                    }
//                },
//                "Tag": {
//                    "properties": {
//                        "id": {
//                            "type": "integer",
//                            "format": "int64",
//                            "xml": {
//                                "name": "id"
//                            }
//                        },
//                        "name": {
//                            "type": "string",
//                            "xml": {
//                                "name": "name"
//                            }
//                        }
//                    },
//                    "xml": {
//                        "name": "Tag"
//                    }
//                },
//                "Order": {
//                    "properties": {
//                        "id": {
//                            "type": "integer",
//                            "format": "int64",
//                            "xml": {
//                                "name": "id"
//                            }
//                        },
//                        "petId": {
//                            "type": "integer",
//                            "format": "int64",
//                            "xml": {
//                                "name": "petId"
//                            }
//                        },
//                        "quantity": {
//                            "type": "integer",
//                            "format": "int32",
//                            "xml": {
//                                "name": "quantity"
//                            }
//                        },
//                        "shipDate": {
//                            "type": "string",
//                            "format": "date-time",
//                            "xml": {
//                                "name": "shipDate"
//                            }
//                        },
//                        "status": {
//                            "type": "string",
//                            "xml": {
//                                "name": "status"
//                            },
//                            "description": "Order Status"
//                        },
//                        "complete": {
//                            "type": "boolean"
//                        }
//                    },
//                    "xml": {
//                        "name": "Order"
//                    }
//                }
//            };
        };
        var out = {
            "swagger": "2.0",
            "info": renderInfo(),
            "host": options.host,
            "basePath": options.basePath,
            "schemes": options.schemes,
            "paths": renderPaths(),
            "definitions": renderDefinitions()};
        res.json(out);
    };
};
module.exports = ApiDocs; 