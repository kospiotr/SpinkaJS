var _ = require('underscore');

var ApiDocs = function (options) {
    var out = {};
    out.renderInfo = function () {
        return {
            "description": "This is a sample server Petstore server.  You can find out more about Swagger at <a href=\"http://swagger.wordnik.com\">http://swagger.wordnik.com</a> or on irc.freenode.net, #swagger.  For out sample, you can use the api key \"special-key\" to test the authorization filters",
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
        }
    };

    out.renderSinglePath = function (routerPath) {
        return {
            "/scientist": {
                "get": {
                    "tags": [
                        "scientist"
                    ],
                    "summary": "Find all scientists",
                    "operationId": "getAllScientists",
                }
            }
        };
    };
    var indent = function (level) {
        return Array(level + 1).join('    ');
    }

    var extractPathFromRegexp = function (regexp) {
        var string = regexp.toString();
        return string.replace('/^\\', '').replace('\\/?(?=/|$)/i', '').replace('?(?=/|$)/i', '');
    }

    var translateKeysToParameters = function (keys) {
        return _.map(keys, function (key) {
            return {
                name: key.name,
                required: !key.optional
            };
        });
    }

    out.renderPath = function (parent, level, elem) {
        if (_.has(elem, 'route') && _.has(elem.route, 'path')) {
//            console.log('%s     -> is route with path "%j"', indent(level), elem.route.path);
            if (!_.has(parent, 'children')) {
                parent.children = [];
            }
            parent.children.push({
//                type: 'route',
//                level: level,
                path: elem.route.path,
                methods: _.keys(elem.route.methods),
                parameters: translateKeysToParameters(elem.keys)
            });

        }
    };


    out.renderChildreen = function (parent, level, elem) {
        if (_.has(elem, 'handle') && _.has(elem.handle, 'stack')) {
//            console.log('%s     -> is layer', indent(level));
            if (!_.has(parent, 'children')) {
                parent.children = [];
            }
            var paths = {
//                type: 'layer',
//                level: level,
                path: extractPathFromRegexp(elem.regexp)
            };
            out.renderLayers(paths, level + 1, elem.handle.stack);
            parent.children.push(paths);
        }
    };

    out.renderLayers = function (parent, level, routerStack) {
        _.each(routerStack, function (elem, index, list) {
//            console.log('[%j] %s %j', level, indent(level), elem);
            out.renderPath(parent, level, elem);
            out.renderChildreen(parent, level, elem);
        });
        return parent;
    };

    out.flattenLayers = function (layer, top, parentPath) {
        if (top == null) {
            top = {};
        }
        parentPath = (parentPath == null ? '' : parentPath) + (layer.path == null ? '' : layer.path);
        if (_.has(layer, 'children')) {
            _.each(layer.children, function (elem) {
                out.flattenLayers(elem, top, parentPath);
            });
        } else {
            parentPath = parentPath.replace('//', '/').replace(':id', '{id}');
            if (top[parentPath] == null) {
                top[parentPath] = {};
            }
            var currentPath = top[parentPath];
            _.each(layer.methods, function (method) {
                var currentMethod = currentPath[method] = {produces: "application/json"};
                _.each(layer.parameters, function (parameter) {
                    if (currentMethod['parameters'] == null) {
                        currentMethod['parameters'] = [];
                    }
                    var parameters = currentMethod['parameters'];
                    parameters.push({
                        'in': 'path',
                        'name': parameter.name,
                        'required': parameter.required,
                        'type': 'integer',
                        'format': 'int64'
                    });
                });
            });

        }
        return top;
    };

    out.renderDefinitions = function () {
        return {};
    };

    out.getSpec = function (routerStack) {
//        console.log(routerStack);
        var layers = out.renderLayers({}, 0, routerStack);
//        console.log('RESULTS NOT FLATTENED----->');
//        console.log(JSON.stringify(layers, undefined, 2));
//        console.log('RESULTS FLATTENED----->');
        layers = out.flattenLayers(layers);
//        console.log(JSON.stringify(layers, undefined, 2));
        return {
            "swagger": "2.0",
            "info": out.renderInfo(),
            "host": options.host,
            "basePath": options.basePath,
            "schemes": options.schemes,
            "paths": layers,
            "definitions": out.renderDefinitions()};
    };

    out.getRouterHandler = function (req, res) {
        var routerStack = req.app._router.stack;
        res.json(out.getSpec(routerStack));
    };
    return out;
};
module.exports = ApiDocs; 
