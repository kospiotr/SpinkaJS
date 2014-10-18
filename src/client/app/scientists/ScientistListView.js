Ext.define('App.scientists.ScientistListView', {
  extend: 'Ext.panel.Panel',
  alias: 'view.scientists',
  requires: ['App.scientists.ScientistStore', 'App.scientists.ScientistListController', 'App.ux.PreviewPlugin'],
  controller: 'scientistlist',
  border: false,
  bodyBorder: false,
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
        {fieldLabel: 'First Name', emptyText: 'First Name', name: 'first'},
        {fieldLabel: 'Last Name', emptyText: 'Last Name', name: 'last'},
        {fieldLabel: 'Email', name: 'email', vtype: 'email'},
        {
          xtype: 'combobox',
          fieldLabel: 'State',
          name: 'state',
          valueField: 'abbr',
          displayField: 'state',
          typeAhead: true,
          queryMode: 'local',
          emptyText: 'Select a state...'
        },
        {xtype: 'datefield', fieldLabel: 'Date of Birth', name: 'dob', allowBlank: false, maxValue: new Date()}
      ],
      bbar: [
        '->',
        {text: 'Clear', listeners: {click: 'onClearClick'}},
        {text: 'Search', listeners: {click: 'onSearchClick'}}
      ]
    },
    {
      id: 'gridId',
      region: 'center',
      border: false,
      layout: 'fit',
      margin: '5 5 5 0',
      xtype: 'grid',
      store: Ext.create('App.scientists.ScientistStore'),
      title: 'Scientists',
      columns: [
        {text: 'First Name', dataIndex: 'firstName'},
        {text: 'Last Name', dataIndex: 'lastName'},
        {text: 'Email', dataIndex: 'email', flex: 1},
        {text: 'State', dataIndex: 'state'},
        {text: 'Date Of Birth', dataIndex: 'dateOfBirth'}
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
          {xtype: 'button', text: 'New'},
          {xtype: 'splitbutton', text: 'Edit',
            menu: {xtype: 'menu', items: [{text: 'Copy'}]}
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