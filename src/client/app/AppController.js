Ext.define('App.AppController', {
    extend: 'Ext.app.Controller',
    require: ['App.scientists.ScientistController'],
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
        Ext.log('Init AppController');
        var me = this;
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
                var view = me.getView(workItem.view).create();
                me.setViewportActiveView(view);
                Ext.defer(function () {
                    console.log('fireEvent: ' + itemName + 'Activated');
                    me.fireEvent(itemName + 'Activated', arguments);
                }, 1500);
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
    setViewportActiveView: function (view) {

        var viewport = this.getViewport();
        viewport.removeAll(true);
        
        view.region = 'center';
        viewport.add(view);


    }
});