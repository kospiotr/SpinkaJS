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
        }
    },
    defaultType: 'textfield',
    layout: 'column',
    autoScroll: true,
    bodyPadding: 5,
    padding: 5,
    title: 'Scientist',
    style: {
      backgroundColor: '#3892d3'
    },
    fieldDefaults: {
        labelAlign: 'right',
        padding: 5
    },
    items: [
        {fieldLabel: 'Name', name: 'name', bind: '{record.name}'},
        {fieldLabel: 'Surname', name: 'surname', bind: '{record.surname}'},
        {fieldLabel: 'Degree', name: 'degree', bind: '{record.degree}'},
        {fieldLabel: 'Department', name: 'department', bind: '{record.department}'},
        {fieldLabel: 'Unit', name: 'unit', bind: '{record.unit}', xtype: 'combobox',
            store: ['unit1', 'unit2', 'unit3', 'unit4']},
        {fieldLabel: 'Specialization', name: 'specialization', bind: '{record.specialization}', xtype: 'textarea', width: '100%'},
        {fieldLabel: 'Phone', name: 'phone', bind: '{record.phone}'},
        {fieldLabel: 'Email', name: 'email', bind: '{record.email}', vtype: 'email'},
        {fieldLabel: 'Website', name: 'website', bind: '{record.website}'},
        {fieldLabel: 'Image', name: 'image', bind: '{record.image}'},
        {fieldLabel: 'Experience', name: 'experience', bind: '{record.experience}', xtype: 'textarea', width: '100%'},
        {fieldLabel: 'Researches', name: 'researches', bind: '{record.researches}', xtype: 'textarea', width: '100%'},
        {fieldLabel: 'Expertise', name: 'expertise', bind: '{record.expertise}', xtype: 'textarea', width: '100%'}
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