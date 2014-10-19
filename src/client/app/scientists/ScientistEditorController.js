Ext.define('App.scientists.ScientistEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientistedit',
    control: {
        '#saveButton': {
            click: function () {
                var record = this.getViewModel().get('record');
                console.log(record);
                record.save();
            }
        }
    },
    setUpRecord: function (record) {
        this.getViewModel().set('record', record);
    }

});