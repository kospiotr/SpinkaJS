Ext.application({
	name: 'App',
	namespaces: ['App'],
	requires: ['App.ViewportView', 'App.AppController'],
	autoCreateViewport: 'App.ViewportView',
	glyphFontFamily: 'Pictos',
        launch: function(){
            console.log('Init app');
            var appController = this.getController('App.AppController');
            appController.runHome();
        }
});