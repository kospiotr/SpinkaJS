Ext.define('App.AppController', {
    extend: 'Ext.app.Controller',
    require: ['App.scientists.ScientistController', 'Ext.ux.Spotlight'],
    views: ['App.scientists.ScientistListView', 'App.scientists.ScientistEditorView', 'App.home.HomeView'],
    config: {
        workflow: {
            scientistList: {
                view: 'App.scientists.ScientistListView',
                route: 'scientist/list'
            },
            scientistEdit: {
                view: 'App.scientists.ScientistEditorView',
                route: 'scientist/edit/:id',
                go: function (id) {
                    return 'scientist/edit/' + id;
                }
            },
            home: {
                view: 'App.home.HomeView'
            }
        }
    },
    init: function () {
        Ext.log('Init AppController START');
        var me = this;
        this.spotlight = Ext.create('Ext.ux.Spotlight', {
            easing: 'easeOut',
            duration: 300
        });
        var routes = {};
        var listeners = {};

        var getRoute = function (itemName, workItem) {
            return workItem.route ? workItem.route : itemName;
        };

        var setUpRunItem = function (itemName, workItem) {
            var itemNameCap = Ext.String.capitalize(itemName);
            var runItemName = 'run' + itemNameCap;

            var runItemFn = function () {
                Ext.log('run ' + itemNameCap + ', arguments: ' + arguments);
                me.setViewportActiveView(workItem.view);
                var args = arguments;
                Ext.defer(function () {
                    console.log('fireEvent: ' + itemName + 'Activated');
                    me.fireEvent(itemName + 'Activated', args);
                });
            };

            me[runItemName] = runItemFn;
            listeners[runItemName] = runItemFn;
            routes[getRoute(itemName, workItem)] = runItemName;

        };

        var setUpGoItem = function (itemName, workItem) {
            var itemNameCap = Ext.String.capitalize(itemName);
            var goItemName = 'go' + itemNameCap;

            var customGoFn = function () {
                Ext.log('custom go' + itemNameCap + ', arguments: ' + arguments);
                me.redirectTo(workItem.go.apply(me, arguments));
            };

            var defaultGoFn = function () {
                Ext.log('default go' + itemNameCap + ', arguments: ' + arguments);
                me.redirectTo(getRoute(itemName, workItem));
            };

            var goItemFn = workItem.go ? customGoFn : defaultGoFn;

            me[goItemName] = goItemFn;
            listeners[goItemName] = goItemFn;
        };

        var setUpItem = function (itemName, workItem) {
            me[itemName + 'ViewName'] = workItem.view;

            setUpRunItem(itemName, workItem);
            setUpGoItem(itemName, workItem);
        };

        Ext.Object.each(this.getWorkflow(), setUpItem);
        me.setRoutes(routes);
        me.listen({controller: {'*': listeners}});
        this.callParent(arguments);
        Ext.log('Init AppController END');

    },
    refs: {
        viewport: '#viewport'
    },
    control: {
        '#homeButton': {
            click: 'goHome'
        },
        '#scientistsButton': {
            click: 'goScientistList'
        }
    },
    listen: {
        controller: {
            '*': {
                showSpotlight: function (id) {
                    this.spotlight.show(id);
                },
                hideSpotlight: function () {
                    if (this.spotlight.active) {
                        this.spotlight.hide();
                    }
                }
            }
        }
    },
    setViewportActiveView: function (viewName) {

        var viewport = this.getViewport();
        viewport.removeAll();
        var view = this.getView(viewName).create();
        viewport.add(view);
    },
    destroy: function () {
        console.log('destroying AppController');
        this.callParent();
    }
});