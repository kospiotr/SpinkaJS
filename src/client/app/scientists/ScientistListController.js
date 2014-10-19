Ext.define('App.scientists.ScientistListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientistlist',
    control: {
        grid: {
            rowdblclick: function (grid, record, tr, rowIndex, e, eOpts) {
                this.getView().fireEvent('openRecord', record);
            }
        },
        '#newButton': {
            click: function () {
                this.getView().fireEvent('newRecord');
            }
        },
        '#delButton': {
            click: function () {
                var grid = this.view.lookupComponent('gridId');
                var selected = grid.getSelection();
                Ext.each(selected, function(record){
                    record.erase();
                },this);
            }
        }
    },
    onSearchClick: function () {
        this.loadGrid();
    },
    init: function () {
        this.callParent();
        this.loadGrid();
    },
    loadGrid: function () {
        this.view.lookupComponent('gridId').store.load();
    }

});