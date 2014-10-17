Ext.define('App.view.ScientistEdit', {
  extend: 'Ext.form.Panel',
  requires: ['App.model.Scientist', 'App.controller.ScientistEditController'],
  controller: 'scientistedit',
  statics: {
    template: new Ext.XTemplate('<p>Testing Scientist: {firstName} , {lastName}, {email}</p>')
  },
  viewModel: {
    data: {
      person: Ext.create('App.model.Scientist')
    }
  },
  autoShow: true,
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
    {fieldLabel: 'First Name', emptyText: 'First Name', name: 'first', bind: '{person.firstName}'},
    {fieldLabel: 'Last Name', emptyText: 'Last Name', name: 'last', bind: '{person.lastName}'},
    {fieldLabel: 'Email', name: 'email', vtype: 'email', bind: '{person.email}'},
    {
      xtype: 'combobox',
      fieldLabel: 'State',
      name: 'state',
      valueField: 'abbr',
      displayField: 'state',
      typeAhead: true,
      queryMode: 'local',
      emptyText: 'Select a state...', bind: '{person.state}'
    },
    {xtype: 'datefield', fieldLabel: 'Date of Birth', name: 'dob', allowBlank: false, maxValue: new Date(), bind: '{person.dateOfBirth}'},
  ],
  buttons: [
    {
      id: 'registerButton',
      text: 'Register',
      disabled: true,
      formBind: true
    },
    {
      id: 'setupButton',
      text: 'SetUp'
    },
  ],
  setUpRecord: function (record) {
    this.controller.setUpRecord(record);
  }
});