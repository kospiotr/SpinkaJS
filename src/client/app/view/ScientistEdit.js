Ext.define('App.view.ScientistEdit', {
  extend: 'Ext.form.Panel',
  xtype: 'scientist-edit',
  alias: 'view.ScientistEdit',
  border: false,
  bodyBorder: false,
  title: 'Scientist',
  padding: 5,
  bodyPadding: 5,
  style: {
    backgroundColor: '#3892d3;'
  },
  defaultType: 'textfield',
  fieldDefaults: {
    labelAlign: 'right',
    labelWidth: 115,
    msgTarget: 'side'
  },
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
  buttons: [{
      text: 'Register',
      disabled: true,
      formBind: true
    }],
  setUpRecord: function (record) {
  }
});