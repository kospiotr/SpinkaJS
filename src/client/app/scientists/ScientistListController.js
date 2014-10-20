Ext.define('App.scientists.ScientistListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientist-list',
    control: {
        grid: {
            rowdblclick: function (grid, record, tr, rowIndex, e, eOpts) {
                this.getView().fireEvent('openRecord', record);
            }
        },
        '#newButton': {
            click: function () {
                this.getView().fireEvent('newRecord', new App.scientists.ScientistModel());
            }
        },
        '#editButton': {
            click: function () {
                this.getView().fireEvent('editRecord', this.getSelectedRecord());
            }
        },
        '#copyButton': {
            click: function () {
                this.getView().fireEvent('copyRecord', this.getSelectedRecord());
            }
        },
        '#delButton': {
            click: function () {
                this.getView().fireEvent('delRecord', this.getSelectedRecords());
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
    },
    getSelectedRecords: function () {
        var grid = this.view.lookupComponent('gridId');
        return grid.getSelection();
    },
    getSelectedRecord: function () {
        var selectedRecords = this.getSelectedRecords() || [];
        return selectedRecords.length > 0 ? selectedRecords[0] : null;
    }

});