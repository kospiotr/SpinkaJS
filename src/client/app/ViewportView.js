Ext.define('App.ViewportView', {
  extend: 'Ext.panel.Panel',
  layout: 'card',
  border: false,
  bodyBorder: false,
  id: 'viewport',
  tbar: {
    xtype: 'toolbar',
    border: false,
    style: {
      backgroundColor: '#157fcc'
    },
    items: [
      {id: 'homeButton', xtype: 'button', text: 'SpinkaJS'},
      {id: 'projectsButton', xtype: 'button', text: 'Projects'},
      {id: 'scientistsButton', xtype: 'button', text: 'Scientists'},
      {id: 'contractorsButton', xtype: 'button', text: 'Contractors'},
      '->',
      {xtype: 'textfield', text: 'Profile', emptyText: 'search ...'},
      {xtype: 'button', text: 'Profile'}
    ]
  }
});