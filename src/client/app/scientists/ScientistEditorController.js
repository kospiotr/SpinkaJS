Ext.define('App.scientists.ScientistEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientist-editor',
    listen: {
        controller: {
            '*': {
                'scientistNewActivated': 'scientistNewActivated',
                'scientistEditActivated': 'scientistEditActivated'
            }
        }
    },
    control: {
        'button[text=Save]': {
            click: function () {
                this.getView().mask('Saving record');
                this.getViewModel().getData().model.save({
                    scope: this,
                    callback: function (records, operation, success) {
                        this.getView().unmask();
                        if (success) {
                            Ext.toast({
                                html: 'Record has been successfully saved',
                                closable: false,
                                align: 't'
                            });
                            this.fireEvent('goScientistEdit', records.getId());
                        }
                    }
                });
            }
        },
        'button[text=Reset]': {
            click: function () {
                this.getViewModel().getData().model.reject();
            }
        }
    },
    init: function () {
        this.callParent();
        this.getViewModel().bind('{modelDirty}', function(isDirty){
            if(isDirty){
                this.fireEvent('showSpotlight', this.getView().getId());
            }else{
                this.fireEvent('hideSpotlight');
            }
        }, this);
    },
    scientistEditActivated: function (args) {
        var id = args[0];
        if (id == null) {
            throw 'You need to pass an id'
        }
        this.loadRecord(id);
    },
    scientistNewActivated: function () {
        console.log('new scientist activated');
        this.getViewModel().setData({model: App.scientists.ScientistModel.create()})
    },
    loadRecord: function (id) {
        console.log('Loading with given id: ' + id);
        this.getView().mask('Loading record');
        App.scientists.ScientistModel.load(id, {
            scope: this,
            success: function (record, operation) {
                this.getViewModel().setData({model: record});
            },
            callback: function (record, operation, success) {
                this.getView().unmask();
            }
        });
    }
});