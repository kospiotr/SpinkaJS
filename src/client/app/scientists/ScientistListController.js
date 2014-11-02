Ext.define('App.scientists.ScientistListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientist-list-view',
    listen: {
        controller: {
            '*': {
                'scientistsActivated': 'onScientistsActivated'
            }
        }
    },
    control: {
        'button[action=search]': {
            click: 'doSearch'
        }
    },
    onScientistsActivated: function () {
        Ext.log('scientistsActivated');
        this.doSearch();
    },
    doSearch: function () {
        Ext.log('doSearch');
        this.getStore('scientists').load();
    },

});

