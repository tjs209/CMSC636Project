Ext.onReady(function () {
//    var store = Ext.create('Ext.data.JsonStore', {
//        fields: ['name', 'data'],
//        data: [{
//            'name': 'metric one',
//            'data': 10
//        }, {
//            'name': 'metric two',
//            'data': 7
//        }, {
//            'name': 'metric three',
//            'data': 5
//        }, {
//            'name': 'metric four',
//            'data': 2
//        }]
//    });

    var stores = new Array();
    
    Ext.ajax.request({
        url: '../test/test.php',
        success: function(response) {
            var json = Ext.decode(response.responseText);
            
            for(var i = 0; i < json.length; i++){
            	
            	var pie = json[i].data;
            	var store = Ext.create('Ext.data.JsonStore', {
                    fields: ['name', 'data'],
                    data: [{
                    	'name': 'Tweet',
                    	'data': pie.tweet
                    },{
                    	'name': 'Tweet',
                    	'data': pie.tweetUrl
                    },{
                    	'name': 'Tweet',
                    	'data': pie.retweet
                    },{
                    	'name': 'Tweet',
                    	'data': pie.retweetUrl
                    }]
            	}
            	stores.push(store);
            }
        } 
    });
            	
    console.log(stores);
//    var a = Ext.create('Ext.chart.Chart', {
//        renderTo: Ext.getBody(),
//        width: 200,
//        height: 150,
//        animate: true,
//        store: store,
//        theme: 'Base:gradients',
//        series: [{
//            type: 'pie',
//            angleField: 'data',
//            showInLegend: true,
//            tips: {
//                trackMouse: true,
//                width: 100,
//                height: 20,
//                renderer: function (storeItem, item) {
//                    // calculate and display percentage on hover
//                    var total = 0;
//                    store.each(function (rec) {
//                        total += rec.get('data');
//                    });
//                    this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
//                }
//            },
//            highlight: {
//                segment: {
//                    margin: 20
//                }
//            },
//            label: {
//                field: 'name',
//                display: 'rotate',
//                contrast: true,
//                font: '12px Arial'
//            }
//        }]
//    });
//    console.log(a);
});
