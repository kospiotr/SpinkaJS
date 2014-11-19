Ext.define('App.scientists.ScientistListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientist-list-view',
    listen: {
        controller: {
            '*': {
                'scientistListActivated': 'scientistListActivated'
            }
        }
    },
    control: {
        'button[action=search]': {
            click: 'doSearch'
        },
        'grid': {
            rowdblclick: 'scientistSelected'
        },
        'button[action=new]': {
            click: 'newScientist'
        }
    },
    scientistListActivated: function () {
        Ext.log('scientistsActivated: %o' + arguments);
        this.doSearch();
    },
    doSearch: function () {
        Ext.log('doSearch');
        this.getStore('scientists').load();
    },
    scientistSelected: function (grid, record, tr, rowIndex, e, eOpts) {
        this.fireEvent('goScientistEdit', record.getId());
    },
    newScientist: function(){
        this.fireEvent('goScientistNew');
    },
    destroy: function(){
        console.log('destroying ScientistListController');
        this.callParent();
    }

});

