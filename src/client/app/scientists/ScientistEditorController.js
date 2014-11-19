Ext.define('App.scientists.ScientistEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientist-editor',
    listen: {
        controller: {
            '*': {
                'scientistEditActivated': 'scientistEditActivated'
            }
        }
    },
    scientistEditActivated: function (args) {
        var id = args[0];
        console.log("showScientistActivated: %o", id);
        if (id == null) {
            throw 'You need to pass an id'
        }
        this.loadRecord(id);
    },
    loadRecord: function (id) {
        console.log('Loading with given id: ' + id);
    }
});