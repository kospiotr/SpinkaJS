Ext.define('App.view.Scientist', {
  extend: 'Ext.panel.Panel',
  statics: {
    template: new Ext.XTemplate('<p>Testing Scientist: {firstName} , {lastName}, {email}</p>')
  },
  alias: 'view.Scientist',
  requires: ['App.controller.ScientistController'],
  controller: 'scientist',
  border: false,
  bodyBorder: false,
  title: 'Scientist',
  layout: 'card',
  padding: 5,
  style: {
    backgroundColor: '#3892d3;'
  },
  items:[
    {
      itemId: 'previewPanel',
      xtype: 'panel',
      html: 'Preview'
    },
    {
      itemId: 'editPanel',
      xtype: 'panel',
      html: 'Edit'
    }
  ],
  bbar: {
    xtype: 'toolbar',
    items: [
      {id: 'backToListButton', xtype: 'button', text: 'List'},
      {id: 'previewButton', xtype: 'button', text: 'Preview'},
      {id: 'newButton', xtype: 'button', text: 'New'},
      {id: 'editButton', xtype: 'splitbutton', text: 'Edit',
        menu: {id: 'copyButton', xtype: 'menu', items: [{text: 'Copy'}]}
      },
      {id: 'deleteButton', xtype: 'button', text: 'Delete'},
      {xtype: 'button', text: 'Export',
        menu: {
          items: [
            {id: 'printButton', text: 'Print'},
            {id: 'saveButton', text: 'Save as'}
          ]
        }
      }
    ]
  },
  setUpRecord: function (record) {
    var previewPanel = this.getComponent('previewPanel');
    data = record ? record.raw : null;
    previewPanel.html = App.view.Scientist.template.applyTemplate(data);
  }
});