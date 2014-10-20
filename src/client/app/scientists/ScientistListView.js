Ext.define('App.scientists.ScientistListView', {
    extend: 'Ext.panel.Panel',
    alias: 'view.scientists',
    requires: ['App.scientists.ScientistStore', 'App.scientists.ScientistListController', 'App.ux.PreviewPlugin'],
    controller: 'scientist-list',
    border: false,
    layout: 'border',
    items: [
        {
            region: 'west',
            xtype: 'form',
            width: 300,
            border: false,
            resizable: true,
            split: true,
            margin: '5 0 5 5',
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
                {text: 'Clear', listeners: {click: 'onClearClick'}},
                {text: 'Search', listeners: {click: 'onSearchClick'}}
            ]
        }, {
            id: 'gridId',
            region: 'center',
            border: false,
            layout: 'fit',
            margin: '5 5 5 0',
            xtype: 'grid',
            store: Ext.create('App.scientists.ScientistStore'),
            title: 'Scientists',
            multiSelect: true,
            columns: [
                {text: 'Name', dataIndex: 'name'},
                {text: 'Surname', dataIndex: 'surname'},
                {text: 'Email', dataIndex: 'email'},
                {text: 'Degree', dataIndex: 'degree', flex: 1},
                {text: 'Department', dataIndex: 'department'},
                {text: 'Unit', dataIndex: 'unit'},
            ],
            plugins: [{
                    ptype: 'preview',
                    bodyField: 'description',
                    tpl: '<span><b>{firstName} {lastName}</b></span> <span>{email}</span> <span style="float: right">{state}</span>',
                    previewExpanded: false,
                    pluginId: 'preview'
                }],
            bbar: {
                xtype: 'pagingtoolbar',
                prependButtons: true,
                items: [
                    {id: 'newButton', xtype: 'button', text: 'New'},
                    {id: 'editButton', xtype: 'splitbutton', text: 'Edit',
                        menu: {xtype: 'menu', items: [{id: 'copyButton', text: 'Copy'}]},
                    },
                    {id: 'delButton', xtype: 'button', text: 'Delete'},
                    {id: 'exportButton', xtype: 'button', text: 'Export',
                        menu: {
                            items: [
                                {id: 'printButton', text: 'Print'},
                                {id: 'saveAsButton', text: 'Save as'}
                            ]
                        }
                    },
                    '->',
                    {
                        xtype: 'checkbox',
                        boxLabel: 'Preview',
                        initComponent: function () {
                            this.plugin = this.up('grid').getPlugin('preview');
                            this.enableToggle = true;
                            this.setValue(this.plugin.previewExpanded);
                            this.callParent();
                        },
                        handler: function (btn, pressed) {
                            this.plugin.toggleExpanded(pressed);
                            this.setValue(this.plugin.previewExpanded);
                        }
                    }
                ]
            }
        }
    ]
});