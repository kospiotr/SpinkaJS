Ext.define('App.scientists.ScientistController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientists',
    control: {
    },
    init: function () {
        console.log('Init ScientistController');
    },
    activated: function () {
        Ext.log('Scientists Module Activated');
    }

});