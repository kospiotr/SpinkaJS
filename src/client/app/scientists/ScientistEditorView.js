Ext.define('App.scientists.ScientistEditorView', {
    extend: 'Ext.form.Panel',
    xtype: 'scientist-editor-view',
    requires: ['App.scientists.ScientistModel', 'App.scientists.ScientistEditorController'],
    controller: 'scientist-editor',
    statics: {
        template: new Ext.XTemplate('<p>Testing Scientist: {firstName} , {lastName}, {email}</p>')
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
        {fieldLabel: 'Name', name: 'name'},
        {fieldLabel: 'Surname', name: 'surname'},
        {fieldLabel: 'Degree', name: 'degree'},
        {fieldLabel: 'Department', name: 'department'},
        {fieldLabel: 'Unit', name: 'unit', xtype: 'combobox',
            store: ['unit1', 'unit2', 'unit3', 'unit4']},
        {fieldLabel: 'Specialization', name: 'specialization', xtype: 'textarea', width: '100%'},
        {fieldLabel: 'Phone', name: 'phone'},
        {fieldLabel: 'Email', name: 'email', vtype: 'email'},
        {fieldLabel: 'Website', name: 'website'},
        {fieldLabel: 'Image', name: 'image'},
        {fieldLabel: 'Experience', name: 'experience', xtype: 'textarea', width: '100%'},
        {fieldLabel: 'Researches', name: 'researches', xtype: 'textarea', width: '100%'},
        {fieldLabel: 'Expertise', name: 'expertise', xtype: 'textarea', width: '100%'}
    ],
    buttons: [
        {
            id: 'saveButton',
            text: 'Save',
            formBind: true
        }, {
            id: 'cancelButton',
            text: 'Cancel'
        },
    ]
});