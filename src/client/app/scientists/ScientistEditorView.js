Ext.define('App.scientists.ScientistEditorView', {
    extend: 'Ext.form.Panel',
    xtype: 'scientist-editor-view',
    controller: 'scientist-editor',
    requires: ['App.scientists.ScientistModel', 'App.scientists.ScientistEditorController'],
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
        {fieldLabel: 'Name', name: 'name', bind: '{model.name}'},
        {fieldLabel: 'Surname', name: 'surname', bind: '{model.surname}'},
        {fieldLabel: 'Degree', name: 'degree', bind: '{model.degree}'},
        {fieldLabel: 'Department', name: 'department', bind: '{model.department}'},
        {fieldLabel: 'Unit', name: 'unit', bind: '{model.unit}', xtype: 'combobox',
            store: ['unit1', 'unit2', 'unit3', 'unit4']},
        {fieldLabel: 'Specialization', name: 'specialization', bind: '{model.specialization}', xtype: 'textarea', width: '100%'},
        {fieldLabel: 'Phone', name: 'phone', bind: '{model.phone}'},
        {fieldLabel: 'Email', name: 'email', vtype: 'email', bind: '{model.email}'},
        {fieldLabel: 'Website', name: 'website', bind: '{model.website}'},
        {fieldLabel: 'Image', name: 'image', bind: '{model.image}'},
        {fieldLabel: 'Experience', name: 'experience', bind: '{model.experience}', xtype: 'textarea', width: '100%'},
        {fieldLabel: 'Researches', name: 'researches', bind: '{model.researches}', xtype: 'textarea', width: '100%'},
        {fieldLabel: 'Expertise', name: 'expertise', bind: '{model.expertise}', xtype: 'textarea', width: '100%'}
    ],
    buttons: [
        {
            text: 'Save',
            formBind: true
        },
        {
            text: 'Cancel'
        }
    ]
});