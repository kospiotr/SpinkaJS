Ext.application({
    name: 'App',
    namespaces: ['App'],
    requires: ['App.ViewportView', 'App.AppController'],
    autoCreateViewport: 'App.ViewportView',
    glyphFontFamily: 'Pictos',
    paths: {
        'Ext.ux': 'app/ux'
    },
    launch: function () {
        console.log('Init app');
        var appController = this.getController('App.AppController');
        if (!Ext.util.History.getToken()) {
            Ext.defer(function(){
                appController.runHome();
            });
        }
    }
});