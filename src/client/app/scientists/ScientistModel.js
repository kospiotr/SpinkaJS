Ext.define('App.scientists.ScientistModel', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.scientist',
    idProperty: '_id',
    fields: [
        {name: '_id'},
        {name: 'name'},
        {name: 'surname'},
        {name: 'degree'},
        {name: 'department'},
        {name: 'unit'},
        {name: 'specialization'},
        {name: 'phone'},
        {name: 'email'},
        {name: 'website'},
        {name: 'image'},
        {name: 'experience'},
        {name: 'researches'},
        {name: 'expertise'}
    ],
    proxy: {
        type: 'rest',
        url: 'rest/scientist',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json'
        }
    },
});
