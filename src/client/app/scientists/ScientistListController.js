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
            rowdblclick: 'scientistSelected',
            selectionchange: 'selectionChange'
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
    newScientist: function () {
        this.fireEvent('goScientistNew');
    },
    destroy: function () {
        console.log('destroying ScientistListController');
        this.callParent();
    },
    selectionChange: function (grid, selected, eOpts) {
        var selectionCount = selected.length;
        this.getViewModel().setData({
            selection: selected,
            selected: selectionCount > 0,
            singleSelected: selectionCount === 1,
            multiSelected: selectionCount > 1,
        });

    },
    onEdit: function () {
        var selectedRecord = this.getViewModel().data.selection[0];
        this.fireEvent('goScientistEdit', selectedRecord.getId());
    },
    onDelete: function () {
        var store = this.getViewModel().getStore('scientists');
        store.remove(this.getViewModel().data.selection);
        store.sync({
            success: function () {
                this.fireEvent('notification', 'Records has been successfully deleted');
            },
            scope: this
        });
    },
});

