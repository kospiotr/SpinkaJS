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
                this.getViewModel().getData().model.save({
                    scope: this,
                    callback: function (records, operation, success) {
                        if (success) {
                            this.fireEvent('notification', 'Record has been successfully saved');
                            this.fireEvent('goScientistEdit', records.getId());
                        }
                    }
                });
            }
        },
        'button[text=Reset]': {
            click: function () {
                this.getViewModel().getData().model.reject();
                this.validateForm();
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
        this.validateForm();
    },
    loadRecord: function (id) {
        App.scientists.ScientistModel.load(id, {
            scope: this,
            success: function (record, operation) {
                this.getViewModel().setData({model: record});
                this.validateForm();
            }
        });
    },
    validateForm: function(){
        this.getView().isValid();
    }
});