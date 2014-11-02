Ext.define('App.scientists.ScientistEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientist-editor',
    listen: {
        controller: {
            '*': {
                'scientistActivated': 'scientistActivated'
            }
        }
    },
    init: function () {
        Ext.log('Init ScientistEditorController');
    },
    scientistActivated: function () {
        console.log("showScientistActivated: %o ", arguments[0]);
    }
});