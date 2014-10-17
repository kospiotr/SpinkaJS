Ext.define('App.scientists.ScientistModel',{
	extend: 'Ext.data.Model',
  alias: 'viewmodel.scientist',
	fields: [
		'firstName', 'lastName', 'email', 'state', 'dateOfBirth', 'description'
	]
});
