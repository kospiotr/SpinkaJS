Ext.define('App.scientists.ScientistListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientist-list-view',
    control: {
        'button[action=search]': {
            click: 'doSearch'
        }
    },
    doSearch: function () {
        console.log('doSearch');
    }
});

