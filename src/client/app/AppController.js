Ext.define('App.AppController', {
    extend: 'Ext.app.Controller',
    require: ['App.scientists.ScientistController'],
    views: ['App.scientists.ScientistListView', 'App.home.HomeView'],
    config: {
        workflow: {
            scientists: {
                controller: 'App.scientists.ScientistController',
                view: 'App.scientists.ScientistListView',
                route: 'scientists'
            },
            home: {
                view: 'App.home.HomeView',
                route: 'home'
            }
        }
    },
    routes: {
        'home': 'runHome',
        'scientists': 'runScientists'
    },
    init: function () {
        console.log('Init AppController');
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
                var controller = me[workItemName + 'Controller'];
                if (controller && controller.activated) {
                    controller.activated();
                }
            };
            routes[workItem.route] = 'run' + WorkItemName;
        });
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