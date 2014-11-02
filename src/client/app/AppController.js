Ext.define('App.AppController', {
    extend: 'Ext.app.Controller',
    require: ['App.scientists.ScientistController'],
    views: ['App.scientists.ScientistListView', 'App.scientists.ScientistEditorView', 'App.home.HomeView'],
    config: {
        workflow: {
            scientists: {
                controller: 'App.scientists.ScientistController',
                view: 'App.scientists.ScientistListView',
                route: 'scientists'
            },
            scientist: {
                controller: 'App.scientists.ScientistEditorController',
                view: 'App.scientists.ScientistEditorView',
                route: 'scientist/:id'
            },
            home: {
                view: 'App.home.HomeView',
                route: 'home'
            }
        }
    },
    init: function () {
        Ext.log('Init AppController');
        var me = this;
        var routes = {};
        Ext.Object.each(this.getWorkflow(), function (workItemName, workItem) {
            var WorkItemName = Ext.String.capitalize(workItemName);

            me[workItemName + 'ViewName'] = workItem.view;
            me['go' + WorkItemName] = function () {
                Ext.log('go' + WorkItemName);
                me.redirectTo(workItem.route);
            };
            me['run' + WorkItemName] = function () {
                Ext.log('run ' + WorkItemName);
                if (workItem.controller && !me[workItemName + 'Controller']) {
                    me[workItemName + 'Controller'] = Ext.create(workItem.controller);
                }
                var view = me.getView(workItem.view).create();
                me.setViewportActiveView(view);
                me.fireEvent(workItemName + 'Activated', arguments);
            };

            if (!routes[workItem.route]) {
                routes[workItem.route] = 'run' + WorkItemName;
            }
        });
        me.setRoutes(routes);
    },
    refs: {
        viewport: '#viewport'
    },
    control: {
        '#homeButton': {
            click: 'goHome'
        },
        '#scientistsButton': {
            click: 'goScientists'
        }
    },
    setViewportActiveView: function (view) {
        var viewport = this.getViewport();
        viewport.removeAll();
        viewport.setActiveItem(view);
    }
});