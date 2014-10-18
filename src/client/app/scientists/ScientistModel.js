Ext.define('App.scientists.ScientistModel', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.scientist',
    fields: [
        'name',
        'surname',
        'degree',
        'department',
        'unit',
        'specialization',
        'phone',
        'email',
        'website',
        'imageLink',
        'experience',
        'researches',
        'expertise'
    ]
});
