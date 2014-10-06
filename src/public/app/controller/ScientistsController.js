Ext.define('App.controller.ScientistsController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.scientists',
  control: {
    grid:{
      rowdblclick: function (grid, record, tr, rowIndex, e, eOpts ) {
        this.getView().fireEvent('openRecord', record);
      }
    }
  }

});