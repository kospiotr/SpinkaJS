Ext.application({
	name: 'App',
	autoCreateViewport: true,
	routes:{
		'test' : 'handleTest'		
	},
	launch: function () {
	},
	handleTest: function(){
		console.log('Test');
	}
});