Ext.define('App.scientists.ScientistEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scientist-editor',
    listen: {
        controller: {
            '*': {
                'scientistNewActivated': 'scientistNewActivated',
                'scientistEditActivated': 'scientistEditActivated',
                'scientistCloneActivated': 'scientistCloneActivated'
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
        },
        'button[text=Delete]': {
            click: function () {
                this.getViewModel().getData().model.erase({
                    success: function () {
                        this.fireEvent('notification', 'Record has been successfully deleted');
                        this.goToList();
                    },
                    scope: this
                });
            }
        }
    },
    init: function () {
        this.callParent();
        this.getViewModel().bind('{modelDirty}', function (isDirty) {
            if (isDirty) {
                this.fireEvent('showSpotlight', this.getView().getId());
            } else {
                this.fireEvent('hideSpotlight');
            }
        }, this);
    },
    scientistEditActivated: function (args) {
        var id = args[0];
        if (id == null) {
            throw 'You need to pass an id'
        }
        this.getViewModel().setData({isNewRecord: false});
        this.loadRecord(id);
    },
    scientistCloneActivated: function (args) {
        var me = this;
        var id = args[0];
        if (id == null) {
            throw 'You need to pass an id'
        }
        this.getViewModel().setData({isNewRecord: true});
        this.loadRecord(id, function (callback) {
            var model = me.getViewModel().getData().model;
            model.setId(null);
            model.commit();
            model.phantom = true;
        });
    },
    scientistNewActivated: function () {
        console.log('new scientist activated');
        this.getViewModel().setData({isNewRecord: true});
        this.getViewModel().setData({model: App.scientists.ScientistModel.create()})
        this.validateForm();
    },
    loadRecord: function (id, callback) {
        App.scientists.ScientistModel.load(id, {
            scope: this,
            success: function (record, operation) {
                this.getViewModel().setData({model: record});
                this.validateForm();
                if (callback) {
                    callback(record);
                }
            }
        });
    },
    validateForm: function () {
        this.getView().isValid();
    },
    goToList: function () {
        this.fireEvent('goScientistList');
    }
});