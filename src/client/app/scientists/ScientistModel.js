Ext.define('App.scientists.ScientistModel', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.scientist',
    idProperty: '_id',
    fields: [
        {name: '_id'},
        {name: 'name', type: 'string', allowNull: false},
        {name: 'surname', type: 'string', allowNull: false},
        {name: 'degree', type: 'string'},
        {name: 'department', type: 'string'},
        {name: 'unit', type: 'string'},
        {name: 'specialization', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'email', type: 'string', allowNull: false},
        {name: 'website', type: 'string'},
        {name: 'image', type: 'string'},
        {name: 'experience', type: 'string'},
        {name: 'researches', type: 'string'},
        {name: 'expertise', type: 'string'}
    ],
    validators: {
        name: 'presence',
        surname: 'presence',
        email: 'email',
    },
    proxy: {
        type: 'rest',
        url: 'rest/scientist',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        },
        writer: {
            type: 'json'
        }
    },
    statics: {
        remove: function (modelsToDelete, callback) {
            var ids = [];
            Ext.each(modelsToDelete, function(elem){
                ids.push(elem.getId());
            });
            var proxy = this.getProxy();
            Ext.Ajax.request({
                url: proxy.getUrl() + '/batch',
                method: 'POST',
                jsonData: {
                    delete: ids
                },
                callback: callback
            });
        }
    }
});
