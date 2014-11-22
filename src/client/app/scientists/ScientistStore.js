Ext.define('App.scientists.ScientistStore', {
    extend: 'Ext.data.BufferedStore',
    alias: 'store.scientists',
    model: 'App.scientists.ScientistModel',
    remoteGroup: true,
    leadingBufferZone: 300,
    pageSize: 500,
    remove: function(ids, callback){
        var model = this.getModel();
        model.remove(ids, callback);
    }
});