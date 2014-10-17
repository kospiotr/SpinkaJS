Ext.define('App.scientists.ScientistEditController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.scientistedit',
  control: {
    '#registerButton': {
      click: function () {
        var view = this.getView();
        debugger;
      }
    },
    '#setupButton': {
      click: function () {
        var record = Ext.create('App.scientists.ScientistModel', {
          firstName: 'Test'
        });
        this.setUpRecord(record);
      }
    }
  },
  setUpRecord: function (record) {
    this.getViewModel().set('person', record);
  }

});