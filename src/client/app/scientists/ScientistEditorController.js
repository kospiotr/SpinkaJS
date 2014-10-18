Ext.define('App.scientists.ScientistEditorController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.scientistedit',
  control: {
    '#registerButton': {
      click: function () {
        var view = this.getView();
      }
    },
    '#setupButton': {
      click: function () {
        var v = this.getView();
        v.spotlight.show(v.getId());
      }
    }
  },
  setUpRecord: function (record) {
    this.getViewModel().set('person', record);
  }

});