Ext.define('App.scientists.ScientistListView', {
    extend: 'Ext.panel.Panel',
    alias: 'view.scientists',
    controller: 'scientist-list-view',
    requires: ['App.scientists.ScientistStore', 'App.scientists.ScientistListController', 'Ext.ux.PreviewPlugin'],
    border: false,
    layout: 'border',
    viewModel: {
        stores: {
            scientists: Ext.create('App.scientists.ScientistStore')
        },
        data: {
            selected: false,
            singleSelected: false,
            multiSelected: false
        }
    },
    margin: 5,
    items: [
        {
            region: 'west',
            xtype: 'form',
            width: 300,
            border: false,
            resizable: true,
            split: true,
            title: 'Filters',
            defaultType: 'textfield',
            defaults: {
                width: '100%'
            },
            autoScroll: true,
            collapsible: true,
            bodyPadding: 5,
            items: [
                {fieldLabel: 'Name', name: 'name'},
                {fieldLabel: 'Surname', name: 'surname'},
                {fieldLabel: 'Degree', name: 'degree'},
                {fieldLabel: 'Department', name: 'department'},
                {fieldLabel: 'Unit', name: 'unit'},
            ],
            bbar: [
                '->',
                {text: 'Clear', action: 'clear'},
                {text: 'Search', action: 'search'}
            ]
        }, {
            region: 'center',
            border: false,
            layout: 'fit',
            xtype: 'grid',
            bind: '{scientists}',
            title: 'Scientists',
            multiSelect: true,
            selModel: {
                pruneRemoved: false
            },
            loadMask: true,
            columns: [
                {text: 'Name', dataIndex: 'name'},
                {text: 'Surname', dataIndex: 'surname'},
                {text: 'Email', dataIndex: 'email'},
                {text: 'Degree', dataIndex: 'degree', flex: 1},
                {text: 'Department', dataIndex: 'department'},
                {text: 'Unit', dataIndex: 'unit'},
            ],
            bbar: [
                {xtype: 'splitbutton', text: 'New', action: 'new',
                    menu: {xtype: 'menu', items: [{text: 'Import', handler: 'onImport'}]}
                },
                {xtype: 'splitbutton', text: 'Edit', handler: 'onEdit', bind: {disabled: '{!singleSelected}'},
                    menu: {xtype: 'menu', items: [{text: 'Clone', handler: 'onClone'}]},
                },
                {xtype: 'button', text: 'Delete', handler: 'onDelete', bind: {disabled: '{!selected}'}},
                {xtype: 'button', text: 'Export',
                    menu: {
                        items: [
                            {text: 'Print'},
                            {text: 'Save as'}
                        ]
                    }
                },
                '->',
                {xtype: 'label', reference: 'totalCountLabel'}
            ]
        }
    ]
});