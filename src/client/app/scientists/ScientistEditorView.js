Ext.define('App.scientists.ScientistEditorView', {
    extend: 'Ext.form.Panel',
    xtype: 'scientist-editor-view',
    requires: ['App.scientists.ScientistModel', 'App.scientists.ScientistEditorController'],
    controller: 'scientistedit',
    statics: {
        template: new Ext.XTemplate('<p>Testing Scientist: {firstName} , {lastName}, {email}</p>')
    },
    viewModel: {
        data: {
            person: Ext.create('App.scientists.ScientistModel')
        }
    },
    defaultType: 'textfield',
    layout: 'column',
    autoScroll: true,
    bodyPadding: 5,
    fieldDefaults: {
        labelAlign: 'right',
        padding: 5,
//        labelWidth: false,
//        labelStyle: 'width: auto'
    },
    items: [
        {fieldLabel: 'Name', name: 'first', bind: '{person.firstName}'},
        {fieldLabel: 'Surname', name: 'last', bind: '{person.lastName}'},
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
            id: 'saveButton',
            text: 'Save',
            formBind: true
        },
        {
            id: 'cancelButton',
            text: 'Cancel'
        },
    ],
    setUpRecord: function (record) {
        this.controller.setUpRecord(record);
    }
});