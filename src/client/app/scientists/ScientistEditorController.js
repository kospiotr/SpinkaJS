Ext.define('App.scientists.ScientistEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientist-editor',
    control: {
        '#saveButton': {
            click: function () {
                this.getView().getForm().getRecord().save();
            }
        }
    }
});