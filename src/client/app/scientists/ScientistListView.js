Ext.define('App.scientists.ScientistListView', {
    extend: 'Ext.panel.Panel',
    alias: 'view.scientists',
    controller: 'scientist-list-view',
    requires: ['App.scientists.ScientistStore','App.scientists.ScientistListController', 'Ext.ux.PreviewPlugin'],
    border: false,
    layout: 'border',
    viewModel: {
        stores: {
            scientists: Ext.create('App.scientists.ScientistStore')
        }
    },
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
                {text: 'Clear', action: 'clear'},
                {text: 'Search', action: 'search'}
            ]
        }, {
            region: 'center',
            border: false,
            layout: 'fit',
            margin: '5 5 5 0',
            xtype: 'grid',
            bind: '{scientists}',
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
                    {xtype: 'button', text: 'New', action: 'new'},
                    {xtype: 'splitbutton', text: 'Edit',
                        menu: {xtype: 'menu', items: [{text: 'Copy'}]},
                    },
                    {xtype: 'button', text: 'Delete'},
                    {xtype: 'button', text: 'Export',
                        menu: {
                            items: [
                                {text: 'Print'},
                                {text: 'Save as'}
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