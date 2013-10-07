Ext.onReady(function () {

	var items = new Array();
	
	

    Ext.Ajax.request({
        url: '../test/test.php',
        success: function(response) {
            var json = Ext.decode(response.responseText);
            for(var i = 0; i < json.length; i++){
            	var pie = json[i].data;
            	
            	var time = json[i].time;
            	var date = new Date();
            	date.setMonth(parseInt(time.substring(0,2))-1);
            	date.setDate(parseInt(time.substring(2,4)));
            	date.setYear(parseInt(time.substring(4,8)));
            	date.setHours(parseInt(time.substring(8)));
            	var tweet  = parseInt(pie.tweet);
            	var tweetUrl  = parseInt(pie.tweetUrl);
            	var retweet  = parseInt(pie.retweet);
            	var retweetUrl  = parseInt(pie.retweetUrl);
            	
            	var total = tweet + retweet + tweetUrl + retweetUrl;
            	
            	if(total > 0){
            		
	            	var store = Ext.create('Ext.data.JsonStore', {
	                    fields: ['name', 'data'],
	                    data: [{
	                    	'name': 'Tweet',
	                    	'data': tweet
	                    },{
	                    	'name': 'Tweet with Url',
	                    	'data': tweetUrl
	                    },{
	                    	'name': 'Retweet',
	                    	'data': retweet
	                    },{
	                    	'name': 'Retweet with Url',
	                    	'data': retweetUrl
	                    }]
	            	});
	            	
	            	var chart = Ext.create('Ext.chart.Chart', {
	        	        xtype: 'chart',
	        	        animate: true,
	        	        title: time,
	        	        width: 300,
	        	        height: 200,
	        	        store: store,
	        	        shadow: true,
	        	        items:[{
        	        	      type  : 'text',
        	        	      text  : date.toDateString() + ' ' + date.getHours(),
        	        	      font  : '14px Arial',
        	        	      width : 100,
        	        	      height: 30,
        	        	      x : 50,
        	        	      y : 10 
	                    }],
	        	        legend: {
	        	            position: 'right',
	        	            itemSpacing: 5,
	        	            labelFont: '10px Helvetica, sans-serif'
	        	        },
	        	        insetPadding: 30,
	        	        theme: 'Base:gradients',
	        	        series: [{
	        	            type: 'pie',
	        	            field: 'data',   
	        	            showInLegend: true,
	        	            donut: false,
	        	            scope: this,
	        	            tips: {
	        	              trackMouse: true,
	        	              width: 150,
	        	              height: 30,
	        	              renderer: function(storeItem, item) {	    
	        	            	  var total = 0;
	        	            	  storeItem.store.each(function(rec) {
	        	                        total += rec.get('data');
	        	                   });

	        	            	  if(total != 0){
	        	            		  this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
	        	            	  }
	        	            	  else{
	        	            		  this.setTitle('No data for this item');
	        	            	  }
	        	              }
	        	            },
	        	            highlight: {
	        	              segment: {
	        	                margin: 20
	        	              }
	        	            }
	        	        }]
	        	    });
            	}
            	items.push(chart);
            }
            
            var panel = Ext.create('widget.panel', {
        	    width: 1200,
        	    height: 1000,
        	    autoScroll: 'auto',
        	    title: 'Twitter Life Patterns',
        	    renderTo: Ext.getBody(),
        	    tbar: [{
        	        text: 'Save Chart',
        	        handler: function() {
        	            Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
        	                if(choice == 'yes'){
        	                    chart.save({
        	                        type: 'image/png'
        	                    });
        	                }
        	            });
        	        }
        	    }, {
        	        text: 'Reset',
        	        handler: function() {
        	            // Add a short delay to prevent fast sequential clicks
//        	            window.loadTask.delay(100, function() {
//        	                store1.loadData(generateData(6, 20));
//        	            });
        	        }
        	    }],
        	    items: items
        	});
        } 
    });	
});
