//封装krpano函数
var tg_krpano_api = {
	obj:null,//krpano obj
	add_layer:function(layer_name,params){
		this.obj.call("addlayer('"+layer_name+"')");
		for(var key in params){
			this.obj.call("set(layer["+layer_name+"]."+key+",'"+params[key]+"')");
		}
	},
	add_textstyle:function(layer_name,params){
		for(var key in params){
			this.obj.call("set(textstyle["+layer_name+"]."+key+",'"+params[key]+"')");
		}
	},
	
}