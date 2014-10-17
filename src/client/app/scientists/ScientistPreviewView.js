Ext.define('App.scientists.ScientistPreviewView', {
  extend: 'Ext.panel.Panel',
  statics: {
    template: new Ext.XTemplate('<p>Testing Scientist: {firstName} , {lastName}, {email}</p>')
  },
  alias: 'view.Scientist',
  requires: ['App.scientists.ScientistController'],
  controller: 'scientist',
  border: false,
  bodyBorder: false,
  title: 'Scientist',
  padding: 5,
  style: {
    backgroundColor: '#3892d3;'
  },
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
    data = record ? record.raw : null;
    this.html = App.scientists.ScientistPreview.template.applyTemplate(data);
  }
});