Ext.define('App.scientists.ScientistEditorView', {
    extend: 'Ext.form.Panel',
    xtype: 'scientist-editor-view',
    controller: 'scientist-editor',
    requires: ['App.scientists.ScientistModel', 'App.scientists.ScientistEditorController', 'Ext.ux.Spotlight'],
    statics: {
        template: new Ext.XTemplate('<p>Testing Scientist: {firstName} , {lastName}, {email}</p>')
    },
    viewModel: {
        data: {
            model: Ext.create('App.scientists.ScientistModel'),
        },
        formulas: {
            modelDirty: {
                bind: {
                    bindTo: "{model}",
                    deep: true
                },
                get: function () {
                    return this.getData().model.dirty;
                }
            }
        }
    },
    defaultType: 'textfield',
    layout: 'column',
    autoScroll: true,
    border: false,
    bodyPadding: 5,
    margin: 5,
    title: 'Scientist',
    fieldDefaults: {
        labelAlign: 'right',
        padding: 5,
    },
    modelValidation: true,
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
            formBind: true,
            glyph: 10004
        },
        {
            text: 'Reset',
            glyph: 8634
        }
    ]
});