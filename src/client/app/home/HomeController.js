Ext.define('App.home.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.home',
    destroy: function(){
        console.log('destroying HomeController');
        this.callParent();
    }
});