Ext.define('App.scientists.ScientistListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientist-list-view',
    listen: {
        controller: {
            '*': {
                'scientistListActivated': 'scientistListActivated'
            }
        },
        
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
        this.doSearch();
    },
    doSearch: function () {
        this.getStore('scientists').load({
//            callback: this.afterSearch,
//            scope: this
        });
    },
    afterSearch: function () {
        var text = "Displaying " + this.getStore('scientists').getTotalCount() + ' records';
        this.lookupReference('totalCountLabel').setText(text);
    },
    scientistSelected: function (grid, record, tr, rowIndex, e, eOpts) {
        this.fireEvent('goScientistEdit', record.getId());
    },
    newScientist: function () {
        this.fireEvent('goScientistNew');
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
    getSelectedRecords: function () {
        return this.getViewModel().data.selection;
    },
    getSelectedRecord: function () {
        return this.getSelectedRecords()[0];
    },
    onEdit: function () {
        this.fireEvent('goScientistEdit', this.getSelectedRecord().getId());
    },
    onDelete: function () {
        var me = this;
        this.getStore('scientists').remove(this.getSelectedRecords(), function () {
            me.fireEvent('notification', 'Records has been successfully deleted');
            me.doSearch();
        });
    },
    onImport: function () {
        var me = this;
        var importWindow = Ext.create('Ext.ux.UploadingWindow', {
            listeners: {
                importingdone: function () {
                    me.doSearch();
                    this.close();
                }
            }
        });
        importWindow.show();
    },
    onClone: function () {
        this.fireEvent('goScientistClone', this.getSelectedRecord().getId());
    }
});

