(function (console) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
var Main = function() {
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	var view = new images_app_ApplicationView();
	var context = new images_app_ApplicationContext(view);
};
Main.prototype = {
	__class__: Main
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var Xml = function() { };
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe_Http;
haxe_Http.__name__ = ["haxe","Http"];
haxe_Http.prototype = {
	setHeader: function(header,value) {
		this.headers = Lambda.filter(this.headers,function(h) {
			return h.header != header;
		});
		this.headers.push({ header : header, value : value});
		return this;
	}
	,setPostData: function(data) {
		this.postData = data;
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,exists: function(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var keys = this.arrayKeys();
		var _g1 = 0;
		var _g = keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			var k = keys[i];
			if(k == null) s.b += "null"; else s.b += "" + k;
			s.b += " => ";
			s.add(Std.string(__map_reserved[k] != null?this.getReserved(k):this.h[k]));
			if(i < keys.length) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var mmvc_api_IContext = function() { };
$hxClasses["mmvc.api.IContext"] = mmvc_api_IContext;
mmvc_api_IContext.__name__ = ["mmvc","api","IContext"];
mmvc_api_IContext.prototype = {
	__class__: mmvc_api_IContext
	,__properties__: {get_commandMap:"get_commandMap"}
};
var mmvc_impl_Context = function(contextView,autoStartup) {
	if(autoStartup == null) autoStartup = true;
	this.autoStartup = autoStartup;
	this.set_contextView(contextView);
};
$hxClasses["mmvc.impl.Context"] = mmvc_impl_Context;
mmvc_impl_Context.__name__ = ["mmvc","impl","Context"];
mmvc_impl_Context.__interfaces__ = [mmvc_api_IContext];
mmvc_impl_Context.prototype = {
	startup: function() {
	}
	,shutdown: function() {
	}
	,set_contextView: function(value) {
		if(this.contextView != value) {
			this.contextView = value;
			this.commandMap = null;
			this.mediatorMap = null;
			this.viewMap = null;
			this.triggerMap = null;
			this.mapInjections();
			this.checkAutoStartup();
		}
		return value;
	}
	,get_injector: function() {
		if(this.injector == null) return this.createInjector();
		return this.injector;
	}
	,get_reflector: function() {
		if(this.reflector == null) this.reflector = new minject_Reflector();
		return this.reflector;
	}
	,get_commandMap: function() {
		if(this.commandMap == null) this.commandMap = new mmvc_base_CommandMap(this.createChildInjector());
		return this.commandMap;
	}
	,get_mediatorMap: function() {
		if(this.mediatorMap == null) this.mediatorMap = new mmvc_base_MediatorMap(this.contextView,this.createChildInjector(),this.get_reflector());
		return this.mediatorMap;
	}
	,get_viewMap: function() {
		if(this.viewMap == null) this.viewMap = new mmvc_base_ViewMap(this.contextView,this.get_injector());
		return this.viewMap;
	}
	,get_triggerMap: function() {
		if(this.triggerMap == null) this.triggerMap = new mmvc_base_TriggerMap(this.get_injector());
		return this.triggerMap;
	}
	,mapInjections: function() {
		this.get_injector().mapValue(minject_Reflector,this.get_reflector());
		this.get_injector().mapValue(minject_Injector,this.get_injector());
		this.get_injector().mapValue(mmvc_api_IViewContainer,this.contextView);
		this.get_injector().mapValue(mmvc_api_ICommandMap,this.get_commandMap());
		this.get_injector().mapValue(mmvc_api_IMediatorMap,this.get_mediatorMap());
		this.get_injector().mapValue(mmvc_api_IViewMap,this.get_viewMap());
		this.get_injector().mapValue(mmvc_api_ITriggerMap,this.get_triggerMap());
	}
	,checkAutoStartup: function() {
		if(this.autoStartup && this.contextView != null) this.startup();
	}
	,createInjector: function() {
		this.injector = new minject_Injector();
		return this.get_injector();
	}
	,createChildInjector: function() {
		return this.get_injector().createChildInjector();
	}
	,__class__: mmvc_impl_Context
	,__properties__: {get_triggerMap:"get_triggerMap",get_viewMap:"get_viewMap",get_reflector:"get_reflector",get_mediatorMap:"get_mediatorMap",get_injector:"get_injector",get_commandMap:"get_commandMap",set_contextView:"set_contextView"}
};
var images_app_ApplicationContext = function(contextView) {
	mmvc_impl_Context.call(this,contextView);
};
$hxClasses["images.app.ApplicationContext"] = images_app_ApplicationContext;
images_app_ApplicationContext.__name__ = ["images","app","ApplicationContext"];
images_app_ApplicationContext.__super__ = mmvc_impl_Context;
images_app_ApplicationContext.prototype = $extend(mmvc_impl_Context.prototype,{
	startup: function() {
		this.get_triggerMap().map(images_gallery_trigger_LoadGallery,images_gallery_command_LoadGalleryCommand);
		this.get_triggerMap().map(images_gallery_trigger_LoadLightbox,images_gallery_command_LoadLightboxCommand);
		this.get_injector().mapSingleton(images_gallery_model_Gallery);
		this.get_injector().mapSingleton(images_gallery_model_Lightbox);
		this.get_mediatorMap().mapView(images_gallery_view_LightboxView,images_gallery_view_LightboxViewMediator);
		this.get_mediatorMap().mapView(images_gallery_view_GalleryView,images_gallery_view_GalleryViewMediator);
		this.get_mediatorMap().mapView(images_app_ApplicationView,images_app_ApplicationViewMediator);
	}
	,shutdown: function() {
	}
	,__class__: images_app_ApplicationContext
});
var images_core_View = function() {
	this.id = "view" + images_core_View.idCounter++;
	this.index = -1;
	this.className = Type.getClassName(js_Boot.getClass(this)).split(".").pop();
	this.children = [];
	this.signal = new msignal_Signal2();
	this.initialize();
};
$hxClasses["images.core.View"] = images_core_View;
images_core_View.__name__ = ["images","core","View"];
images_core_View.prototype = {
	toString: function() {
		return this.className + "(" + this.id + ")";
	}
	,dispatch: function(event,view) {
		if(view == null) view = this;
		this.signal.dispatch(event,view);
	}
	,addChild: function(view) {
		view.signal.add($bind(this,this.dispatch));
		view.parent = this;
		view.set_index(this.children.length);
		this.children.push(view);
		this.element.appendChild(view.element);
		this.dispatch("added",view);
	}
	,removeChild: function(view) {
		var removed = HxOverrides.remove(this.children,view);
		if(removed) {
			var oldIndex = view.index;
			view.remove();
			view.signal.remove($bind(this,this.dispatch));
			view.parent = null;
			view.set_index(-1);
			this.element.removeChild(view.element);
			var _g1 = oldIndex;
			var _g = this.children.length;
			while(_g1 < _g) {
				var i = _g1++;
				var view1 = this.children[i];
				view1.set_index(i);
			}
			this.dispatch("removed",view);
		}
	}
	,initialize: function() {
		if(this.tagName == null) this.tagName = "div";
		this.element = window.document.createElement(this.tagName);
		this.element.setAttribute("id",this.id);
		this.element.className = this.className;
	}
	,remove: function() {
	}
	,update: function() {
	}
	,set_index: function(value) {
		if(this.index != value) {
			this.index = value;
			this.update();
		}
		return this.index;
	}
	,__class__: images_core_View
	,__properties__: {set_index:"set_index"}
};
var mmvc_api_IViewContainer = function() { };
$hxClasses["mmvc.api.IViewContainer"] = mmvc_api_IViewContainer;
mmvc_api_IViewContainer.__name__ = ["mmvc","api","IViewContainer"];
mmvc_api_IViewContainer.prototype = {
	__class__: mmvc_api_IViewContainer
};
var images_app_ApplicationView = function() {
	images_core_View.call(this);
};
$hxClasses["images.app.ApplicationView"] = images_app_ApplicationView;
images_app_ApplicationView.__name__ = ["images","app","ApplicationView"];
images_app_ApplicationView.__interfaces__ = [mmvc_api_IViewContainer];
images_app_ApplicationView.__super__ = images_core_View;
images_app_ApplicationView.prototype = $extend(images_core_View.prototype,{
	createGallery: function() {
		var galleryView = new images_gallery_view_GalleryView();
		this.addChild(galleryView);
	}
	,createLightbox: function() {
		var lightboxView = new images_gallery_view_LightboxView();
		this.addChild(lightboxView);
	}
	,updateLightbox: function(data) {
		console.log("update but where?");
		var _g = 0;
		var _g1 = this.children.concat([]);
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(js_Boot.__instanceof(child,images_gallery_view_LightboxView)) {
				var lightboxView = child;
				lightboxView.set_data(data);
			}
		}
	}
	,dispatch: function(event,view) {
		switch(event) {
		case "added":
			this.viewAdded(view);
			break;
		case "removed":
			this.viewRemoved(view);
			break;
		default:
			images_core_View.prototype.dispatch.call(this,event,view);
		}
	}
	,isAdded: function(view) {
		return true;
	}
	,initialize: function() {
		images_core_View.prototype.initialize.call(this);
		window.document.body.appendChild(this.element);
	}
	,__class__: images_app_ApplicationView
});
var mmvc_api_IMediator = function() { };
$hxClasses["mmvc.api.IMediator"] = mmvc_api_IMediator;
mmvc_api_IMediator.__name__ = ["mmvc","api","IMediator"];
mmvc_api_IMediator.prototype = {
	__class__: mmvc_api_IMediator
};
var mmvc_base_MediatorBase = function() {
	this.slots = [];
};
$hxClasses["mmvc.base.MediatorBase"] = mmvc_base_MediatorBase;
mmvc_base_MediatorBase.__name__ = ["mmvc","base","MediatorBase"];
mmvc_base_MediatorBase.__interfaces__ = [mmvc_api_IMediator];
mmvc_base_MediatorBase.prototype = {
	preRegister: function() {
		this.removed = false;
		this.onRegister();
	}
	,onRegister: function() {
	}
	,preRemove: function() {
		this.removed = true;
		this.onRemove();
	}
	,onRemove: function() {
		var _g = 0;
		var _g1 = this.slots;
		while(_g < _g1.length) {
			var slot = _g1[_g];
			++_g;
			slot.remove();
		}
	}
	,getViewComponent: function() {
		return this.view;
	}
	,setViewComponent: function(viewComponent) {
		this.view = viewComponent;
	}
	,mediate: function(slot) {
		this.slots.push(slot);
	}
	,__class__: mmvc_base_MediatorBase
};
var mmvc_impl_Mediator = function() {
	mmvc_base_MediatorBase.call(this);
};
$hxClasses["mmvc.impl.Mediator"] = mmvc_impl_Mediator;
mmvc_impl_Mediator.__name__ = ["mmvc","impl","Mediator"];
mmvc_impl_Mediator.__super__ = mmvc_base_MediatorBase;
mmvc_impl_Mediator.prototype = $extend(mmvc_base_MediatorBase.prototype,{
	__class__: mmvc_impl_Mediator
});
var images_app_ApplicationViewMediator = function() {
	mmvc_impl_Mediator.call(this);
};
$hxClasses["images.app.ApplicationViewMediator"] = images_app_ApplicationViewMediator;
images_app_ApplicationViewMediator.__name__ = ["images","app","ApplicationViewMediator"];
images_app_ApplicationViewMediator.__super__ = mmvc_impl_Mediator;
images_app_ApplicationViewMediator.prototype = $extend(mmvc_impl_Mediator.prototype,{
	onRegister: function() {
		mmvc_impl_Mediator.prototype.onRegister.call(this);
		this.view.createLightbox();
		this.view.createGallery();
		this.lightbox.dataChanged.add($bind(this,this.updateLightbox));
	}
	,updateLightbox: function() {
		this.view.updateLightbox(this.lightbox.data);
	}
	,onRemove: function() {
		mmvc_impl_Mediator.prototype.onRemove.call(this);
	}
	,__class__: images_app_ApplicationViewMediator
});
var mmvc_api_ICommand = function() { };
$hxClasses["mmvc.api.ICommand"] = mmvc_api_ICommand;
mmvc_api_ICommand.__name__ = ["mmvc","api","ICommand"];
mmvc_api_ICommand.prototype = {
	__class__: mmvc_api_ICommand
};
var mmvc_impl_TriggerCommand = function() {
};
$hxClasses["mmvc.impl.TriggerCommand"] = mmvc_impl_TriggerCommand;
mmvc_impl_TriggerCommand.__name__ = ["mmvc","impl","TriggerCommand"];
mmvc_impl_TriggerCommand.__interfaces__ = [mmvc_api_ICommand];
mmvc_impl_TriggerCommand.prototype = {
	execute: function() {
	}
	,dispatch: function(trigger) {
		this.triggerMap.dispatch(trigger);
	}
	,__class__: mmvc_impl_TriggerCommand
};
var images_gallery_command_LoadGalleryCommand = function() {
	mmvc_impl_TriggerCommand.call(this);
};
$hxClasses["images.gallery.command.LoadGalleryCommand"] = images_gallery_command_LoadGalleryCommand;
images_gallery_command_LoadGalleryCommand.__name__ = ["images","gallery","command","LoadGalleryCommand"];
images_gallery_command_LoadGalleryCommand.__super__ = mmvc_impl_TriggerCommand;
images_gallery_command_LoadGalleryCommand.prototype = $extend(mmvc_impl_TriggerCommand.prototype,{
	execute: function() {
		console.log("loaded");
		this.loader = new mcore_loader_JSONLoader("data/data.json");
		this.loader.completed.addOnce($bind(this,this.onCompleted));
		this.loader.failed.addOnce($bind(this,this.failed));
		this.loader.load();
	}
	,onCompleted: function(data) {
		this.loader.failed.remove($bind(this,this.failed));
		var items = data.items;
		var _g = 0;
		while(_g < items.length) {
			var item = items[_g];
			++_g;
			var image = new images_gallery_model_Image(item.title,item.description,item.author,item.src);
			this.list.add(image);
		}
		this.trigger.completed.dispatch(this.list);
	}
	,failed: function(error) {
		this.loader.completed.remove($bind(this,this.onCompleted));
		this.trigger.failed.dispatch(Std.string(error));
	}
	,__class__: images_gallery_command_LoadGalleryCommand
});
var images_gallery_command_LoadLightboxCommand = function() {
	mmvc_impl_TriggerCommand.call(this);
};
$hxClasses["images.gallery.command.LoadLightboxCommand"] = images_gallery_command_LoadLightboxCommand;
images_gallery_command_LoadLightboxCommand.__name__ = ["images","gallery","command","LoadLightboxCommand"];
images_gallery_command_LoadLightboxCommand.__super__ = mmvc_impl_TriggerCommand;
images_gallery_command_LoadLightboxCommand.prototype = $extend(mmvc_impl_TriggerCommand.prototype,{
	execute: function() {
		console.log("hey it's me lightbox! I am here, change my data.");
		this.trigger.completed.dispatch(this.lightbox);
	}
	,__class__: images_gallery_command_LoadLightboxCommand
});
var mcore_data_Collection = function() { };
$hxClasses["mcore.data.Collection"] = mcore_data_Collection;
mcore_data_Collection.__name__ = ["mcore","data","Collection"];
mcore_data_Collection.prototype = {
	__class__: mcore_data_Collection
	,__properties__: {get_size:"get_size"}
};
var mcore_data_CollectionBase = function() {
	this.source = [];
	this.changed = new msignal_Signal0();
};
$hxClasses["mcore.data.CollectionBase"] = mcore_data_CollectionBase;
mcore_data_CollectionBase.__name__ = ["mcore","data","CollectionBase"];
mcore_data_CollectionBase.__interfaces__ = [mcore_data_Collection];
mcore_data_CollectionBase.prototype = {
	get_size: function() {
		return this.source.length;
	}
	,add: function(value) {
		this.source.push(value);
		this.notifyChanged();
	}
	,notifyChanged: function() {
		this.changed.dispatch();
	}
	,addAll: function(values) {
		if(values == null) return;
		var s = this.source.length;
		var $it0 = $iterator(values)();
		while( $it0.hasNext() ) {
			var value = $it0.next();
			this.source.push(value);
		}
		if(this.source.length != s) this.notifyChanged();
	}
	,clear: function() {
		if(this.isEmpty()) return;
		this.source.splice(0,this.source.length);
		this.notifyChanged();
	}
	,contains: function(value) {
		return mcore_util_Iterables.indexOf(this.source,value) != -1;
	}
	,isEmpty: function() {
		return this.source.length == 0;
	}
	,iterator: function() {
		return HxOverrides.iter(this.source);
	}
	,remove: function(value) {
		var hasChanged = false;
		var i = this.source.length;
		while(i-- > 0) if(this.source[i] == value) {
			this.source.splice(0,1);
			hasChanged = true;
		}
		if(hasChanged) this.notifyChanged();
		return hasChanged;
	}
	,filter: function(predicate) {
		var collectionType = js_Boot.getClass(this);
		var collection = mcore_util_Types.createInstance(collectionType,[]);
		var filteredValues = mcore_util_Iterables.filter(this.source,predicate);
		collection.addAll(filteredValues);
		return collection;
	}
	,toArray: function() {
		return this.source.slice();
	}
	,toString: function() {
		return this.source.toString();
	}
	,__class__: mcore_data_CollectionBase
	,__properties__: {get_size:"get_size"}
};
var mcore_data_ArrayList = function(values) {
	mcore_data_CollectionBase.call(this);
	if(values != null) this.addAll(values);
};
$hxClasses["mcore.data.ArrayList"] = mcore_data_ArrayList;
mcore_data_ArrayList.__name__ = ["mcore","data","ArrayList"];
mcore_data_ArrayList.__super__ = mcore_data_CollectionBase;
mcore_data_ArrayList.prototype = $extend(mcore_data_CollectionBase.prototype,{
	get_first: function() {
		if(this.isEmpty()) return null;
		return this.source[0];
	}
	,get_last: function() {
		if(this.isEmpty()) return null;
		return this.source[this.get_size() - 1];
	}
	,get_length: function() {
		return this.source.length;
	}
	,insert: function(index,value) {
		if(index < 0 || index > this.get_size()) throw new js__$Boot_HaxeError("index out of bounds");
		this.source.splice(index,0,value);
		this.notifyChanged();
	}
	,get: function(index) {
		if(index < 0 || index >= this.get_size()) throw new js__$Boot_HaxeError("index out of bounds");
		return this.source[index];
	}
	,indexOf: function(value) {
		var _g1 = 0;
		var _g = this.source.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.source[i] == value) return i;
		}
		return -1;
	}
	,removeAt: function(index) {
		if(index < 0 || index >= this.get_size()) throw new js__$Boot_HaxeError("index out of bounds");
		var value = this.source.splice(index,1)[0];
		this.notifyChanged();
		return value;
	}
	,__class__: mcore_data_ArrayList
	,__properties__: $extend(mcore_data_CollectionBase.prototype.__properties__,{get_length:"get_length",get_last:"get_last",get_first:"get_first"})
});
var images_gallery_model_Gallery = function(values) {
	mcore_data_ArrayList.call(this,values);
};
$hxClasses["images.gallery.model.Gallery"] = images_gallery_model_Gallery;
images_gallery_model_Gallery.__name__ = ["images","gallery","model","Gallery"];
images_gallery_model_Gallery.__super__ = mcore_data_ArrayList;
images_gallery_model_Gallery.prototype = $extend(mcore_data_ArrayList.prototype,{
	__class__: images_gallery_model_Gallery
});
var images_gallery_model_Image = function(title,description,author,src) {
	this.title = title;
	this.description = description;
	this.author = author;
	this.src = src;
};
$hxClasses["images.gallery.model.Image"] = images_gallery_model_Image;
images_gallery_model_Image.__name__ = ["images","gallery","model","Image"];
images_gallery_model_Image.prototype = {
	toString: function() {
		return JSON.stringify(this);
	}
	,__class__: images_gallery_model_Image
};
var images_gallery_model_Lightbox = function() {
	this.dataChanged = new msignal_Signal0();
};
$hxClasses["images.gallery.model.Lightbox"] = images_gallery_model_Lightbox;
images_gallery_model_Lightbox.__name__ = ["images","gallery","model","Lightbox"];
images_gallery_model_Lightbox.prototype = {
	set_data: function(value) {
		if(this.data != value) {
			this.data = value;
			this.dataChanged.dispatch();
			console.log("model data changed");
		}
		return value;
	}
	,__class__: images_gallery_model_Lightbox
	,__properties__: {set_data:"set_data"}
};
var images_gallery_trigger_LoadGallery = function() {
	this.completed = new msignal_Signal1(images_gallery_model_Gallery);
	this.failed = new msignal_Signal1(Dynamic);
};
$hxClasses["images.gallery.trigger.LoadGallery"] = images_gallery_trigger_LoadGallery;
images_gallery_trigger_LoadGallery.__name__ = ["images","gallery","trigger","LoadGallery"];
images_gallery_trigger_LoadGallery.prototype = {
	__class__: images_gallery_trigger_LoadGallery
};
var images_gallery_trigger_LoadLightbox = function() {
	this.completed = new msignal_Signal1(images_gallery_model_Lightbox);
	this.failed = new msignal_Signal1(Dynamic);
};
$hxClasses["images.gallery.trigger.LoadLightbox"] = images_gallery_trigger_LoadLightbox;
images_gallery_trigger_LoadLightbox.__name__ = ["images","gallery","trigger","LoadLightbox"];
images_gallery_trigger_LoadLightbox.prototype = {
	__class__: images_gallery_trigger_LoadLightbox
};
var images_gallery_view_GalleryView = function() {
	this.tagName = "ul";
	this.itemSelected = new msignal_Signal1();
	images_core_View.call(this);
};
$hxClasses["images.gallery.view.GalleryView"] = images_gallery_view_GalleryView;
images_gallery_view_GalleryView.__name__ = ["images","gallery","view","GalleryView"];
images_gallery_view_GalleryView.__super__ = images_core_View;
images_gallery_view_GalleryView.prototype = $extend(images_core_View.prototype,{
	set_data: function(value) {
		if(this.data != value) {
			this.data = value;
			this.updateData();
		}
		return value;
	}
	,dispatch: function(event,view) {
		switch(event) {
		case "actioned":
			if(js_Boot.__instanceof(view,images_gallery_view_ImageView)) {
				var imageView = view;
				this.itemSelected.dispatch(imageView.data);
			}
			break;
		default:
			images_core_View.prototype.dispatch.call(this,event,view);
		}
	}
	,clearData: function() {
		var _g = 0;
		var _g1 = this.children.concat([]);
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(js_Boot.__instanceof(child,images_gallery_view_ImageView)) this.removeChild(child);
		}
	}
	,updateData: function() {
		this.clearData();
		if(this.data != null) {
			var $it0 = this.data.iterator();
			while( $it0.hasNext() ) {
				var item = $it0.next();
				var view = new images_gallery_view_ImageView();
				view.set_data(item);
				this.addChild(view);
			}
		}
	}
	,__class__: images_gallery_view_GalleryView
	,__properties__: $extend(images_core_View.prototype.__properties__,{set_data:"set_data"})
});
var mmvc_impl_TriggerMediator = function() {
	mmvc_impl_Mediator.call(this);
};
$hxClasses["mmvc.impl.TriggerMediator"] = mmvc_impl_TriggerMediator;
mmvc_impl_TriggerMediator.__name__ = ["mmvc","impl","TriggerMediator"];
mmvc_impl_TriggerMediator.__super__ = mmvc_impl_Mediator;
mmvc_impl_TriggerMediator.prototype = $extend(mmvc_impl_Mediator.prototype,{
	dispatch: function(trigger) {
		this.triggerMap.dispatch(trigger);
	}
	,__class__: mmvc_impl_TriggerMediator
});
var images_gallery_view_GalleryViewMediator = function() {
	mmvc_impl_TriggerMediator.call(this);
};
$hxClasses["images.gallery.view.GalleryViewMediator"] = images_gallery_view_GalleryViewMediator;
images_gallery_view_GalleryViewMediator.__name__ = ["images","gallery","view","GalleryViewMediator"];
images_gallery_view_GalleryViewMediator.__super__ = mmvc_impl_TriggerMediator;
images_gallery_view_GalleryViewMediator.prototype = $extend(mmvc_impl_TriggerMediator.prototype,{
	onRegister: function() {
		var trigger = new images_gallery_trigger_LoadGallery();
		trigger.completed.addOnce($bind(this,this.loadCompleted));
		this.dispatch(trigger);
		this.view.itemSelected.add($bind(this,this.onItemSelected));
	}
	,onItemSelected: function(data) {
		console.log("clicked");
		this.lightbox.set_data(data);
	}
	,onRemove: function() {
		mmvc_impl_TriggerMediator.prototype.onRemove.call(this);
	}
	,loadCompleted: function(list) {
		this.view.set_data(list);
	}
	,__class__: images_gallery_view_GalleryViewMediator
});
var images_gallery_view_ImageView = function() {
	this.tagName = "li";
	images_core_View.call(this);
};
$hxClasses["images.gallery.view.ImageView"] = images_gallery_view_ImageView;
images_gallery_view_ImageView.__name__ = ["images","gallery","view","ImageView"];
images_gallery_view_ImageView.__super__ = images_core_View;
images_gallery_view_ImageView.prototype = $extend(images_core_View.prototype,{
	set_data: function(value) {
		if(this.data != value) {
			this.data = value;
			this.updateData();
		}
		return value;
	}
	,updateData: function() {
		var imageElement;
		var _this = window.document;
		imageElement = _this.createElement("img");
		imageElement.src = this.data.src;
		imageElement.alt = this.data.title;
		this.element.appendChild(imageElement);
	}
	,initialize: function() {
		images_core_View.prototype.initialize.call(this);
		this.element.onclick = $bind(this,this.js_onClick);
	}
	,remove: function() {
		this.element.onclick = null;
	}
	,js_onClick: function(event) {
		this.dispatch("actioned",this);
	}
	,__class__: images_gallery_view_ImageView
	,__properties__: $extend(images_core_View.prototype.__properties__,{set_data:"set_data"})
});
var images_gallery_view_LightboxView = function() {
	this.tagName = "div";
	images_core_View.call(this);
};
$hxClasses["images.gallery.view.LightboxView"] = images_gallery_view_LightboxView;
images_gallery_view_LightboxView.__name__ = ["images","gallery","view","LightboxView"];
images_gallery_view_LightboxView.__super__ = images_core_View;
images_gallery_view_LightboxView.prototype = $extend(images_core_View.prototype,{
	set_data: function(value) {
		if(this.data != value) {
			this.data = value;
			this.clearData();
			this.updateData();
		}
		return value;
	}
	,clearData: function() {
		this.element.innerHTML = "";
	}
	,updateData: function() {
		var imageElement;
		var _this = window.document;
		imageElement = _this.createElement("img");
		imageElement.src = this.data.src;
		imageElement.alt = this.data.title;
		var titleElement = window.document.createElement("h2");
		titleElement.innerText = this.data.title;
		var descriptionElement = window.document.createElement("p");
		descriptionElement.innerText = this.data.description;
		var authorElement = window.document.createElement("small");
		authorElement.innerText = this.data.author;
		this.element.appendChild(titleElement);
		this.element.appendChild(imageElement);
		this.element.appendChild(descriptionElement);
		this.element.appendChild(authorElement);
	}
	,initialize: function() {
		images_core_View.prototype.initialize.call(this);
		this.element.onclick = $bind(this,this.js_onClick);
	}
	,remove: function() {
		this.element.onclick = null;
	}
	,js_onClick: function(event) {
		this.dispatch("unhide_gallery",this);
	}
	,__class__: images_gallery_view_LightboxView
	,__properties__: $extend(images_core_View.prototype.__properties__,{set_data:"set_data"})
});
var images_gallery_view_LightboxViewMediator = function() {
	mmvc_impl_TriggerMediator.call(this);
};
$hxClasses["images.gallery.view.LightboxViewMediator"] = images_gallery_view_LightboxViewMediator;
images_gallery_view_LightboxViewMediator.__name__ = ["images","gallery","view","LightboxViewMediator"];
images_gallery_view_LightboxViewMediator.__super__ = mmvc_impl_TriggerMediator;
images_gallery_view_LightboxViewMediator.prototype = $extend(mmvc_impl_TriggerMediator.prototype,{
	onRegister: function() {
		var trigger = new images_gallery_trigger_LoadLightbox();
		trigger.completed.addOnce($bind(this,this.loadCompleted));
		this.dispatch(trigger);
	}
	,onRemove: function() {
		mmvc_impl_TriggerMediator.prototype.onRemove.call(this);
	}
	,loadCompleted: function(lightbox) {
		console.log("load completed?");
		this.view.set_data(lightbox.data);
	}
	,__class__: images_gallery_view_LightboxViewMediator
});
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var mcore_loader_Loader = function() { };
$hxClasses["mcore.loader.Loader"] = mcore_loader_Loader;
mcore_loader_Loader.__name__ = ["mcore","loader","Loader"];
mcore_loader_Loader.prototype = {
	__class__: mcore_loader_Loader
	,__properties__: {get_progress:"get_progress"}
};
var mcore_loader_LoaderBase = function(uri) {
	this.uri = uri;
	this.progressed = new msignal_Signal1(Float);
	this.completed = new msignal_Signal1(null);
	this.failed = new msignal_Signal1(mcore_loader_LoaderError);
	this.cancelled = new msignal_Signal0();
};
$hxClasses["mcore.loader.LoaderBase"] = mcore_loader_LoaderBase;
mcore_loader_LoaderBase.__name__ = ["mcore","loader","LoaderBase"];
mcore_loader_LoaderBase.__interfaces__ = [mcore_loader_Loader];
mcore_loader_LoaderBase.prototype = {
	get_progress: function() {
		return 0;
	}
	,load: function() {
		if(this.uri == null) throw new js__$Boot_HaxeError("No uri defined for Loader");
	}
	,cancel: function() {
	}
	,__class__: mcore_loader_LoaderBase
	,__properties__: {get_progress:"get_progress"}
};
var mcore_loader_HTTPLoader = function(uri,http) {
	mcore_loader_LoaderBase.call(this,uri);
	if(http == null) http = new haxe_Http("");
	this.http = http;
	http.onData = $bind(this,this.httpData);
	http.onError = $bind(this,this.httpError);
	http.onStatus = $bind(this,this.httpStatus);
	this.headers = new haxe_ds_StringMap();
};
$hxClasses["mcore.loader.HTTPLoader"] = mcore_loader_HTTPLoader;
mcore_loader_HTTPLoader.__name__ = ["mcore","loader","HTTPLoader"];
mcore_loader_HTTPLoader.__super__ = mcore_loader_LoaderBase;
mcore_loader_HTTPLoader.prototype = $extend(mcore_loader_LoaderBase.prototype,{
	load: function() {
		mcore_loader_LoaderBase.prototype.load.call(this);
		this.http.url = this.uri;
		this.httpConfigure();
		this.addHeaders();
		this.progressed.dispatch(0);
		try {
			this.http.request(false);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			this.failed.dispatch(mcore_loader_LoaderError.SecurityError(Std.string(e)));
		}
	}
	,send: function(data) {
		if(this.uri == null) throw new js__$Boot_HaxeError("No uri defined for Loader");
		if(!this.headers.exists("Content-Type")) {
			var contentType = this.getMIMEType(data);
			this.headers.set("Content-Type",contentType);
		}
		this.http.url = this.uri;
		this.http.setPostData(Std.string(data));
		this.httpConfigure();
		this.addHeaders();
		this.progressed.dispatch(0);
		try {
			this.http.request(true);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			this.failed.dispatch(mcore_loader_LoaderError.SecurityError(Std.string(e)));
		}
	}
	,getMIMEType: function(data) {
		if(js_Boot.__instanceof(data,Xml)) return "application/xml"; else if(typeof(data) == "string" && data.length > 0 && (data.charAt(0) == "{" && data.charAt(data.length - 1) == "}") || data.charAt(0) == "[" && data.charAt(data.length - 1) == "]") return "application/json";
		return "application/octet-stream";
	}
	,cancel: function() {
		mcore_loader_LoaderBase.prototype.cancel.call(this);
		this.cancelled.dispatch();
	}
	,httpConfigure: function() {
	}
	,addHeaders: function() {
		var $it0 = this.headers.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			this.http.setHeader(name,this.headers.get(name));
		}
	}
	,httpData: function(data) {
		this.progressed.dispatch(1);
		this.completed.dispatch(data);
	}
	,httpStatus: function(status) {
		this.statusCode = status;
	}
	,httpError: function(error) {
		this.failed.dispatch(mcore_loader_LoaderError.IOError(error));
	}
	,__class__: mcore_loader_HTTPLoader
});
var mcore_loader_JSONLoader = function(uri,http) {
	mcore_loader_HTTPLoader.call(this,uri,http);
};
$hxClasses["mcore.loader.JSONLoader"] = mcore_loader_JSONLoader;
mcore_loader_JSONLoader.__name__ = ["mcore","loader","JSONLoader"];
mcore_loader_JSONLoader.__super__ = mcore_loader_HTTPLoader;
mcore_loader_JSONLoader.prototype = $extend(mcore_loader_HTTPLoader.prototype,{
	httpData: function(data) {
		this.progressed.dispatch(1);
		try {
			var json = JSON.parse(data);
			this.completed.dispatch(json);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			this.failed.dispatch(mcore_loader_LoaderError.FormatError(Std.string(e)));
			return;
		}
	}
	,send: function(data) {
		if(this.uri == null) throw new js__$Boot_HaxeError("No uri defined for Loader");
		try {
			if(!(typeof(data) == "string")) data = JSON.stringify(data);
			if(!this.headers.exists("Content-Type")) this.headers.set("Content-Type","application/json");
			mcore_loader_HTTPLoader.prototype.send.call(this,data);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			this.failed.dispatch(mcore_loader_LoaderError.FormatError(Std.string(e)));
		}
	}
	,__class__: mcore_loader_JSONLoader
});
var mcore_loader_LoaderError = { __ename__ : true, __constructs__ : ["IOError","SecurityError","FormatError","DataError"] };
mcore_loader_LoaderError.IOError = function(info) { var $x = ["IOError",0,info]; $x.__enum__ = mcore_loader_LoaderError; $x.toString = $estr; return $x; };
mcore_loader_LoaderError.SecurityError = function(info) { var $x = ["SecurityError",1,info]; $x.__enum__ = mcore_loader_LoaderError; $x.toString = $estr; return $x; };
mcore_loader_LoaderError.FormatError = function(info) { var $x = ["FormatError",2,info]; $x.__enum__ = mcore_loader_LoaderError; $x.toString = $estr; return $x; };
mcore_loader_LoaderError.DataError = function(info,data) { var $x = ["DataError",3,info,data]; $x.__enum__ = mcore_loader_LoaderError; $x.toString = $estr; return $x; };
var mcore_util_Arrays = function() { };
$hxClasses["mcore.util.Arrays"] = mcore_util_Arrays;
mcore_util_Arrays.__name__ = ["mcore","util","Arrays"];
mcore_util_Arrays.toString = function(source) {
	return source.toString();
};
mcore_util_Arrays.shuffle = function(source) {
	var copy = source.slice();
	var shuffled = [];
	while(copy.length > 0) shuffled.push(copy.splice(Std.random(copy.length),1)[0]);
	return shuffled;
};
mcore_util_Arrays.lastItem = function(source) {
	return source[source.length - 1];
};
var mcore_util_Iterables = function() { };
$hxClasses["mcore.util.Iterables"] = mcore_util_Iterables;
mcore_util_Iterables.__name__ = ["mcore","util","Iterables"];
mcore_util_Iterables.contains = function(iterable,value) {
	return mcore_util_Iterables.indexOf(iterable,value) != -1;
};
mcore_util_Iterables.indexOf = function(iterable,value) {
	var i = 0;
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		if(member == value) return i;
		i++;
	}
	return -1;
};
mcore_util_Iterables.find = function(iterable,predicate) {
	var item = null;
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		if(predicate(member)) {
			item = member;
			break;
		}
	}
	return item;
};
mcore_util_Iterables.filter = function(iterable,predicate) {
	var items = [];
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		if(predicate(member)) items.push(member);
	}
	return items;
};
mcore_util_Iterables.concat = function(iterableA,iterableB) {
	var items = [];
	var _g = 0;
	var _g1 = [iterableA,iterableB];
	while(_g < _g1.length) {
		var iterable = _g1[_g];
		++_g;
		var $it0 = $iterator(iterable)();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			items.push(item);
		}
	}
	return items;
};
mcore_util_Iterables.map = function(iterable,selector) {
	var items = [];
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		items.push(selector(item));
	}
	return items;
};
mcore_util_Iterables.mapWithIndex = function(iterable,selector) {
	var items = [];
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		items.push(selector(item,items.length));
	}
	return items;
};
mcore_util_Iterables.fold = function(iterable,aggregator,seed) {
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		seed = aggregator(member,seed);
	}
	return seed;
};
mcore_util_Iterables.foldRight = function(iterable,aggregator,seed) {
	return mcore_util_Iterables.fold(mcore_util_Iterables.reverse(iterable),aggregator,seed);
};
mcore_util_Iterables.reverse = function(iterable) {
	var items = [];
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		items.unshift(member);
	}
	return items;
};
mcore_util_Iterables.isEmpty = function(iterable) {
	return !$iterator(iterable)().hasNext();
};
mcore_util_Iterables.toArray = function(iterable) {
	var result = [];
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		result.push(member);
	}
	return result;
};
mcore_util_Iterables.size = function(iterable) {
	var i = 0;
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		i++;
	}
	return i;
};
mcore_util_Iterables.count = function(iterable,predicate) {
	var i = 0;
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		if(predicate(member)) i++;
	}
	return i;
};
var mcore_util_Strings = function() { };
$hxClasses["mcore.util.Strings"] = mcore_util_Strings;
mcore_util_Strings.__name__ = ["mcore","util","Strings"];
mcore_util_Strings.stripHTML = function(content) {
	var pattern = new EReg("<[^>]*>","g");
	return pattern.replace(content,"");
};
mcore_util_Strings.capitalize = function(value) {
	var words = value.split(" ");
	var _g1 = 0;
	var _g = words.length;
	while(_g1 < _g) {
		var i = _g1++;
		var word = words[i];
		words[i] = word.charAt(0).toUpperCase() + HxOverrides.substr(word,1,null);
	}
	return words.join(" ");
};
mcore_util_Strings.substitute = function(source,values) {
	var _g1 = 0;
	var _g = values.length;
	while(_g1 < _g) {
		var i = _g1++;
		source = source.split("{" + i + "}").join(values[i]);
	}
	return source;
};
mcore_util_Strings.contains = function(source,subject) {
	return source.indexOf(subject) != -1;
};
mcore_util_Strings.lastChar = function(source) {
	if(source == "") return ""; else return source.charAt(source.length - 1);
};
var mcore_util_Types = function() { };
$hxClasses["mcore.util.Types"] = mcore_util_Types;
mcore_util_Types.__name__ = ["mcore","util","Types"];
mcore_util_Types.isSubClassOf = function(object,type) {
	return js_Boot.__instanceof(object,type) && Type.getClass(object) != type;
};
mcore_util_Types.createInstance = function(forClass,args) {
	if(args == null) args = [];
	try {
		return Type.createInstance(forClass,args);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		throw new js__$Boot_HaxeError("Error creating instance of " + Type.getClassName(forClass) + "(" + args.toString() + ")");
	}
};
var minject_ClassMap = function() {
	this.map = new haxe_ds_StringMap();
};
$hxClasses["minject.ClassMap"] = minject_ClassMap;
minject_ClassMap.__name__ = ["minject","ClassMap"];
minject_ClassMap.__interfaces__ = [haxe_IMap];
minject_ClassMap.prototype = {
	get: function(k) {
		var key = Type.getClassName(k);
		return this.map.get(key);
	}
	,set: function(k,v) {
		var key = Type.getClassName(k);
		this.map.set(key,v);
	}
	,exists: function(k) {
		var key = Type.getClassName(k);
		return this.map.exists(key);
	}
	,remove: function(k) {
		var key = Type.getClassName(k);
		return this.map.remove(key);
	}
	,keys: function() {
		return (function($this) {
			var $r;
			var _this;
			{
				var _g = [];
				var $it0 = $this.map.keys();
				while( $it0.hasNext() ) {
					var k = $it0.next();
					_g.push(Type.resolveClass(k));
				}
				_this = _g;
			}
			$r = HxOverrides.iter(_this);
			return $r;
		}(this));
	}
	,iterator: function() {
		return this.map.iterator();
	}
	,toString: function() {
		return this.map.toString();
	}
	,getKey: function(k) {
		return Type.getClassName(k);
	}
	,__class__: minject_ClassMap
};
var minject_InjectionConfig = function(request,injectionName) {
	this.request = request;
	this.injectionName = injectionName;
};
$hxClasses["minject.InjectionConfig"] = minject_InjectionConfig;
minject_InjectionConfig.__name__ = ["minject","InjectionConfig"];
minject_InjectionConfig.prototype = {
	getResponse: function(injector) {
		if(this.injector != null) injector = this.injector;
		if(this.result != null) return this.result.getResponse(injector);
		var parentConfig = injector.getAncestorMapping(this.request,this.injectionName);
		if(parentConfig != null) return parentConfig.getResponse(injector);
		return null;
	}
	,hasResponse: function(injector) {
		return this.result != null;
	}
	,hasOwnResponse: function() {
		return this.result != null;
	}
	,setResult: function(result) {
		this.result = result;
	}
	,setInjector: function(injector) {
		this.injector = injector;
	}
	,toString: function() {
		var named;
		if(this.injectionName != null && this.injectionName != "") named = " named \"" + this.injectionName + "\" and"; else named = "";
		return "rule: [" + Type.getClassName(this.request) + ("]" + named + " mapped to [" + Std.string(this.result) + "]");
	}
	,__class__: minject_InjectionConfig
};
var minject_Injector = function() {
	this.injectionConfigs = new haxe_ds_StringMap();
	this.injecteeDescriptions = new minject_ClassMap();
	this.attendedToInjectees = new minject_InjecteeSet();
};
$hxClasses["minject.Injector"] = minject_Injector;
minject_Injector.__name__ = ["minject","Injector"];
minject_Injector.prototype = {
	mapValue: function(whenAskedFor,useValue,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectValueResult(useValue));
		return config;
	}
	,mapClass: function(whenAskedFor,instantiateClass,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectClassResult(instantiateClass));
		return config;
	}
	,mapSingleton: function(whenAskedFor,named) {
		if(named == null) named = "";
		return this.mapSingletonOf(whenAskedFor,whenAskedFor,named);
	}
	,mapSingletonOf: function(whenAskedFor,useSingletonOf,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectSingletonResult(useSingletonOf));
		return config;
	}
	,mapRule: function(whenAskedFor,useRule,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectOtherRuleResult(useRule));
		return useRule;
	}
	,getMapping: function(forClass,named) {
		if(named == null) named = "";
		var requestName = this.getClassName(forClass) + "#" + named;
		if(this.injectionConfigs.exists(requestName)) return this.injectionConfigs.get(requestName);
		var config = new minject_InjectionConfig(forClass,named);
		this.injectionConfigs.set(requestName,config);
		return config;
	}
	,injectInto: function(target) {
		if(this.attendedToInjectees.contains(target)) return;
		this.attendedToInjectees.add(target);
		var targetClass = Type.getClass(target);
		var injecteeDescription = null;
		if(this.injecteeDescriptions.exists(targetClass)) injecteeDescription = this.injecteeDescriptions.get(targetClass); else injecteeDescription = this.getInjectionPoints(targetClass);
		if(injecteeDescription == null) return;
		var injectionPoints = injecteeDescription.injectionPoints;
		var length = injectionPoints.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			var injectionPoint = injectionPoints[i];
			injectionPoint.applyInjection(target,this);
		}
	}
	,construct: function(theClass) {
		var injecteeDescription;
		if(this.injecteeDescriptions.exists(theClass)) injecteeDescription = this.injecteeDescriptions.get(theClass); else injecteeDescription = this.getInjectionPoints(theClass);
		var injectionPoint = injecteeDescription.ctor;
		return injectionPoint.applyInjection(theClass,this);
	}
	,instantiate: function(theClass) {
		var instance = this.construct(theClass);
		this.injectInto(instance);
		return instance;
	}
	,unmap: function(theClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(theClass,named);
		if(mapping == null) throw new js__$Boot_HaxeError("Error while removing an injector mapping: No mapping defined for class " + this.getClassName(theClass) + ", named \"" + named + "\"");
		mapping.setResult(null);
	}
	,hasMapping: function(forClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(forClass,named);
		if(mapping == null) return false;
		return mapping.hasResponse(this);
	}
	,getInstance: function(ofClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(ofClass,named);
		if(mapping == null || !mapping.hasResponse(this)) throw new js__$Boot_HaxeError("Error while getting mapping response: No mapping defined for class " + this.getClassName(ofClass) + ", named \"" + named + "\"");
		return mapping.getResponse(this);
	}
	,createChildInjector: function() {
		var injector = new minject_Injector();
		injector.set_parentInjector(this);
		return injector;
	}
	,getAncestorMapping: function(forClass,named) {
		var parent = this.parentInjector;
		while(parent != null) {
			var parentConfig = parent.getConfigurationForRequest(forClass,named,false);
			if(parentConfig != null && parentConfig.hasOwnResponse()) return parentConfig;
			parent = parent.parentInjector;
		}
		return null;
	}
	,getInjectionPoints: function(forClass) {
		var typeMeta = haxe_rtti_Meta.getType(forClass);
		var fieldsMeta = this.getFields(forClass);
		var ctorInjectionPoint = null;
		var injectionPoints = [];
		var postConstructMethodPoints = [];
		var _g = 0;
		var _g1 = Reflect.fields(fieldsMeta);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var fieldMeta = Reflect.field(fieldsMeta,field);
			var inject = Object.prototype.hasOwnProperty.call(fieldMeta,"inject");
			var post = Object.prototype.hasOwnProperty.call(fieldMeta,"post");
			var type = Reflect.field(fieldMeta,"type");
			var args = Reflect.field(fieldMeta,"args");
			if(field == "_") {
				if(args.length > 0) ctorInjectionPoint = new minject_point_ConstructorInjectionPoint(fieldMeta.args);
			} else if(Object.prototype.hasOwnProperty.call(fieldMeta,"args")) {
				if(inject) {
					var point = new minject_point_MethodInjectionPoint(field,fieldMeta.args);
					injectionPoints.push(point);
				} else if(post) {
					var order;
					if(fieldMeta.post == null) order = 0; else order = fieldMeta.post[0];
					var point1 = new minject_point_PostConstructInjectionPoint(field,order);
					postConstructMethodPoints.push(point1);
				}
			} else if(type != null) {
				var name;
				if(fieldMeta.inject == null) name = null; else name = fieldMeta.inject[0];
				var point2 = new minject_point_PropertyInjectionPoint(field,fieldMeta.type[0],name);
				injectionPoints.push(point2);
			}
		}
		if(postConstructMethodPoints.length > 0) {
			postConstructMethodPoints.sort(function(a,b) {
				return a.order - b.order;
			});
			var _g2 = 0;
			while(_g2 < postConstructMethodPoints.length) {
				var point3 = postConstructMethodPoints[_g2];
				++_g2;
				injectionPoints.push(point3);
			}
		}
		if(ctorInjectionPoint == null) ctorInjectionPoint = new minject_point_NoParamsConstructorInjectionPoint();
		var injecteeDescription = new minject_InjecteeDescription(ctorInjectionPoint,injectionPoints);
		this.injecteeDescriptions.set(forClass,injecteeDescription);
		return injecteeDescription;
	}
	,getConfigurationForRequest: function(forClass,named,traverseAncestors) {
		if(traverseAncestors == null) traverseAncestors = true;
		var requestName = this.getClassName(forClass) + "#" + named;
		if(!this.injectionConfigs.exists(requestName)) {
			if(traverseAncestors && this.parentInjector != null && this.parentInjector.hasMapping(forClass,named)) return this.getAncestorMapping(forClass,named);
			return null;
		}
		return this.injectionConfigs.get(requestName);
	}
	,set_parentInjector: function(value) {
		if(this.parentInjector != null && value == null) this.attendedToInjectees = new minject_InjecteeSet();
		this.parentInjector = value;
		if(this.parentInjector != null) this.attendedToInjectees = this.parentInjector.attendedToInjectees;
		return this.parentInjector;
	}
	,getClassName: function(forClass) {
		if(forClass == null) return "Dynamic"; else return Type.getClassName(forClass);
	}
	,getFields: function(type) {
		var meta = { };
		while(type != null) {
			var typeMeta = haxe_rtti_Meta.getFields(type);
			var _g = 0;
			var _g1 = Reflect.fields(typeMeta);
			while(_g < _g1.length) {
				var field = _g1[_g];
				++_g;
				Reflect.setField(meta,field,Reflect.field(typeMeta,field));
			}
			type = Type.getSuperClass(type);
		}
		return meta;
	}
	,__class__: minject_Injector
	,__properties__: {set_parentInjector:"set_parentInjector"}
};
var minject_InjecteeSet = function() {
};
$hxClasses["minject.InjecteeSet"] = minject_InjecteeSet;
minject_InjecteeSet.__name__ = ["minject","InjecteeSet"];
minject_InjecteeSet.prototype = {
	add: function(value) {
		value.__injected__ = true;
	}
	,contains: function(value) {
		return value.__injected__ == true;
	}
	,remove: function(value) {
		Reflect.deleteField(value,"__injected__");
	}
	,'delete': function(value) {
		this.remove(value);
	}
	,iterator: function() {
		return HxOverrides.iter([]);
	}
	,__class__: minject_InjecteeSet
};
var minject_InjecteeDescription = function(ctor,injectionPoints) {
	this.ctor = ctor;
	this.injectionPoints = injectionPoints;
};
$hxClasses["minject.InjecteeDescription"] = minject_InjecteeDescription;
minject_InjecteeDescription.__name__ = ["minject","InjecteeDescription"];
minject_InjecteeDescription.prototype = {
	__class__: minject_InjecteeDescription
};
var minject_Reflector = function() {
};
$hxClasses["minject.Reflector"] = minject_Reflector;
minject_Reflector.__name__ = ["minject","Reflector"];
minject_Reflector.prototype = {
	classExtendsOrImplements: function(classOrClassName,superClass) {
		var actualClass = null;
		if(js_Boot.__instanceof(classOrClassName,Class)) actualClass = js_Boot.__cast(classOrClassName , Class); else if(typeof(classOrClassName) == "string") try {
			actualClass = Type.resolveClass(js_Boot.__cast(classOrClassName , String));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			throw new js__$Boot_HaxeError("The class name " + Std.string(classOrClassName) + " is not valid because of " + Std.string(e) + "\n" + Std.string(e.getStackTrace()));
		}
		if(actualClass == null) throw new js__$Boot_HaxeError("The parameter classOrClassName must be a Class or fully qualified class name.");
		var classInstance = Type.createEmptyInstance(actualClass);
		return js_Boot.__instanceof(classInstance,superClass);
	}
	,getClass: function(value) {
		if(js_Boot.__instanceof(value,Class)) return value;
		return Type.getClass(value);
	}
	,getFQCN: function(value) {
		var fqcn;
		if(typeof(value) == "string") return js_Boot.__cast(value , String);
		return Type.getClassName(value);
	}
	,__class__: minject_Reflector
};
var minject_point_InjectionPoint = function() { };
$hxClasses["minject.point.InjectionPoint"] = minject_point_InjectionPoint;
minject_point_InjectionPoint.__name__ = ["minject","point","InjectionPoint"];
minject_point_InjectionPoint.prototype = {
	__class__: minject_point_InjectionPoint
};
var minject_point_MethodInjectionPoint = function(name,args) {
	this.name = name;
	this.args = args;
};
$hxClasses["minject.point.MethodInjectionPoint"] = minject_point_MethodInjectionPoint;
minject_point_MethodInjectionPoint.__name__ = ["minject","point","MethodInjectionPoint"];
minject_point_MethodInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_MethodInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),this.gatherArgs(target,injector));
		return target;
	}
	,gatherArgs: function(target,injector) {
		var values = [];
		var _g = 0;
		var _g1 = this.args;
		while(_g < _g1.length) {
			var arg = _g1[_g];
			++_g;
			var name;
			if(arg.name == null) name = ""; else name = arg.name;
			var config = injector.getMapping(Type.resolveClass(arg.type),arg.name);
			var injection = config.getResponse(injector);
			values.push(injection);
		}
		return values;
	}
	,__class__: minject_point_MethodInjectionPoint
};
var minject_point_ConstructorInjectionPoint = function(args) {
	minject_point_MethodInjectionPoint.call(this,"new",args);
};
$hxClasses["minject.point.ConstructorInjectionPoint"] = minject_point_ConstructorInjectionPoint;
minject_point_ConstructorInjectionPoint.__name__ = ["minject","point","ConstructorInjectionPoint"];
minject_point_ConstructorInjectionPoint.__super__ = minject_point_MethodInjectionPoint;
minject_point_ConstructorInjectionPoint.prototype = $extend(minject_point_MethodInjectionPoint.prototype,{
	applyInjection: function(target,injector) {
		return Type.createInstance(target,this.gatherArgs(target,injector));
	}
	,__class__: minject_point_ConstructorInjectionPoint
});
var minject_point_NoParamsConstructorInjectionPoint = function() {
};
$hxClasses["minject.point.NoParamsConstructorInjectionPoint"] = minject_point_NoParamsConstructorInjectionPoint;
minject_point_NoParamsConstructorInjectionPoint.__name__ = ["minject","point","NoParamsConstructorInjectionPoint"];
minject_point_NoParamsConstructorInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_NoParamsConstructorInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		return Type.createInstance(target,[]);
	}
	,__class__: minject_point_NoParamsConstructorInjectionPoint
};
var minject_point_PostConstructInjectionPoint = function(name,order) {
	if(order == null) order = 0;
	this.name = name;
	this.order = order;
};
$hxClasses["minject.point.PostConstructInjectionPoint"] = minject_point_PostConstructInjectionPoint;
minject_point_PostConstructInjectionPoint.__name__ = ["minject","point","PostConstructInjectionPoint"];
minject_point_PostConstructInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PostConstructInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),[]);
		return target;
	}
	,__class__: minject_point_PostConstructInjectionPoint
};
var minject_point_PropertyInjectionPoint = function(name,type,injectionName) {
	this.name = name;
	this.type = type;
	this.injectionName = injectionName;
};
$hxClasses["minject.point.PropertyInjectionPoint"] = minject_point_PropertyInjectionPoint;
minject_point_PropertyInjectionPoint.__name__ = ["minject","point","PropertyInjectionPoint"];
minject_point_PropertyInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PropertyInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		var injectionConfig = injector.getMapping(Type.resolveClass(this.type),this.injectionName);
		var injection = injectionConfig.getResponse(injector);
		Reflect.setProperty(target,this.name,injection);
		return target;
	}
	,__class__: minject_point_PropertyInjectionPoint
};
var minject_result_InjectionResult = function() {
};
$hxClasses["minject.result.InjectionResult"] = minject_result_InjectionResult;
minject_result_InjectionResult.__name__ = ["minject","result","InjectionResult"];
minject_result_InjectionResult.prototype = {
	getResponse: function(injector) {
		return null;
	}
	,toString: function() {
		return "";
	}
	,__class__: minject_result_InjectionResult
};
var minject_result_InjectClassResult = function(responseType) {
	minject_result_InjectionResult.call(this);
	this.responseType = responseType;
};
$hxClasses["minject.result.InjectClassResult"] = minject_result_InjectClassResult;
minject_result_InjectClassResult.__name__ = ["minject","result","InjectClassResult"];
minject_result_InjectClassResult.__super__ = minject_result_InjectionResult;
minject_result_InjectClassResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		return injector.instantiate(this.responseType);
	}
	,toString: function() {
		return "class " + Type.getClassName(this.responseType);
	}
	,__class__: minject_result_InjectClassResult
});
var minject_result_InjectOtherRuleResult = function(rule) {
	minject_result_InjectionResult.call(this);
	this.rule = rule;
};
$hxClasses["minject.result.InjectOtherRuleResult"] = minject_result_InjectOtherRuleResult;
minject_result_InjectOtherRuleResult.__name__ = ["minject","result","InjectOtherRuleResult"];
minject_result_InjectOtherRuleResult.__super__ = minject_result_InjectionResult;
minject_result_InjectOtherRuleResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		return this.rule.getResponse(injector);
	}
	,toString: function() {
		return this.rule.toString();
	}
	,__class__: minject_result_InjectOtherRuleResult
});
var minject_result_InjectSingletonResult = function(responseType) {
	minject_result_InjectionResult.call(this);
	this.responseType = responseType;
};
$hxClasses["minject.result.InjectSingletonResult"] = minject_result_InjectSingletonResult;
minject_result_InjectSingletonResult.__name__ = ["minject","result","InjectSingletonResult"];
minject_result_InjectSingletonResult.__super__ = minject_result_InjectionResult;
minject_result_InjectSingletonResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		if(this.response == null) {
			this.response = this.createResponse(injector);
			injector.injectInto(this.response);
		}
		return this.response;
	}
	,createResponse: function(injector) {
		return injector.construct(this.responseType);
	}
	,toString: function() {
		return "singleton " + Type.getClassName(this.responseType);
	}
	,__class__: minject_result_InjectSingletonResult
});
var minject_result_InjectValueResult = function(value) {
	minject_result_InjectionResult.call(this);
	this.value = value;
};
$hxClasses["minject.result.InjectValueResult"] = minject_result_InjectValueResult;
minject_result_InjectValueResult.__name__ = ["minject","result","InjectValueResult"];
minject_result_InjectValueResult.__super__ = minject_result_InjectionResult;
minject_result_InjectValueResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		return this.value;
	}
	,toString: function() {
		return "instance of " + Type.getClassName(Type.getClass(this.value));
	}
	,__class__: minject_result_InjectValueResult
});
var mmvc_api_ICommandMap = function() { };
$hxClasses["mmvc.api.ICommandMap"] = mmvc_api_ICommandMap;
mmvc_api_ICommandMap.__name__ = ["mmvc","api","ICommandMap"];
mmvc_api_ICommandMap.prototype = {
	__class__: mmvc_api_ICommandMap
};
var mmvc_api_IMediatorMap = function() { };
$hxClasses["mmvc.api.IMediatorMap"] = mmvc_api_IMediatorMap;
mmvc_api_IMediatorMap.__name__ = ["mmvc","api","IMediatorMap"];
mmvc_api_IMediatorMap.prototype = {
	__class__: mmvc_api_IMediatorMap
	,__properties__: {set_enabled:"set_enabled",set_contextView:"set_contextView"}
};
var mmvc_api_ITriggerMap = function() { };
$hxClasses["mmvc.api.ITriggerMap"] = mmvc_api_ITriggerMap;
mmvc_api_ITriggerMap.__name__ = ["mmvc","api","ITriggerMap"];
mmvc_api_ITriggerMap.prototype = {
	__class__: mmvc_api_ITriggerMap
};
var mmvc_api_IViewMap = function() { };
$hxClasses["mmvc.api.IViewMap"] = mmvc_api_IViewMap;
mmvc_api_IViewMap.__name__ = ["mmvc","api","IViewMap"];
mmvc_api_IViewMap.prototype = {
	__class__: mmvc_api_IViewMap
	,__properties__: {set_enabled:"set_enabled",set_contextView:"set_contextView"}
};
var mmvc_base_CommandMap = function(injector) {
	this.injector = injector;
	this.signalMap = new haxe_ds_ObjectMap();
	this.signalClassMap = new minject_ClassMap();
	this.detainedCommands = new haxe_ds_ObjectMap();
};
$hxClasses["mmvc.base.CommandMap"] = mmvc_base_CommandMap;
mmvc_base_CommandMap.__name__ = ["mmvc","base","CommandMap"];
mmvc_base_CommandMap.__interfaces__ = [mmvc_api_ICommandMap];
mmvc_base_CommandMap.prototype = {
	mapSignalClass: function(signalClass,commandClass,oneShot) {
		if(oneShot == null) oneShot = false;
		var signal = this.getSignalClassInstance(signalClass);
		this.mapSignal(signal,commandClass,oneShot);
		return signal;
	}
	,mapSignal: function(signal,commandClass,oneShot) {
		if(oneShot == null) oneShot = false;
		if(this.hasSignalCommand(signal,commandClass)) return;
		var signalCommandMap;
		if(this.signalMap.h.__keys__[signal.__id__] != null) signalCommandMap = this.signalMap.h[signal.__id__]; else {
			signalCommandMap = new minject_ClassMap();
			this.signalMap.set(signal,signalCommandMap);
		}
		var me = this;
		var callbackFunction = Reflect.makeVarArgs(function(args) {
			me.routeSignalToCommand(signal,args,commandClass,oneShot);
		});
		signalCommandMap.set(commandClass,callbackFunction);
		signal.add(callbackFunction);
	}
	,unmapSignalClass: function(signalClass,commandClass) {
		var signal = this.getSignalClassInstance(signalClass);
		this.unmapSignal(signal,commandClass);
		if(!this.hasCommand(signal)) {
			this.injector.unmap(signalClass);
			this.signalClassMap.remove(signalClass);
		}
	}
	,unmapSignal: function(signal,commandClass) {
		var callbacksByCommandClass = this.signalMap.h[signal.__id__];
		if(callbacksByCommandClass == null) return;
		var callbackFunction = callbacksByCommandClass.get(commandClass);
		if(callbackFunction == null) return;
		if(!this.hasCommand(signal)) this.signalMap.remove(signal);
		signal.remove(callbackFunction);
		callbacksByCommandClass.remove(commandClass);
	}
	,getSignalClassInstance: function(signalClass) {
		if(this.signalClassMap.exists(signalClass)) return js_Boot.__cast(this.signalClassMap.get(signalClass) , msignal_Signal);
		return this.createSignalClassInstance(signalClass);
	}
	,createSignalClassInstance: function(signalClass) {
		var injectorForSignalInstance = this.injector;
		if(this.injector.hasMapping(minject_Injector)) injectorForSignalInstance = this.injector.getInstance(minject_Injector);
		var signal = injectorForSignalInstance.instantiate(signalClass);
		injectorForSignalInstance.mapValue(signalClass,signal);
		this.signalClassMap.set(signalClass,signal);
		return signal;
	}
	,hasCommand: function(signal) {
		var callbacksByCommandClass = this.signalMap.h[signal.__id__];
		if(callbacksByCommandClass == null) return false;
		var count = 0;
		var $it0 = callbacksByCommandClass.iterator();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			count++;
		}
		return count > 0;
	}
	,hasSignalCommand: function(signal,commandClass) {
		var callbacksByCommandClass = this.signalMap.h[signal.__id__];
		if(callbacksByCommandClass == null) return false;
		var callbackFunction = callbacksByCommandClass.get(commandClass);
		return callbackFunction != null;
	}
	,routeSignalToCommand: function(signal,valueObjects,commandClass,oneshot) {
		this.injector.mapValue(msignal_Signal,signal);
		this.mapSignalValues(signal.valueClasses,valueObjects);
		var command = this.createCommandInstance(commandClass);
		this.injector.unmap(msignal_Signal);
		this.unmapSignalValues(signal.valueClasses,valueObjects);
		command.execute();
		this.injector.attendedToInjectees.remove(command);
		if(oneshot) this.unmapSignal(signal,commandClass);
	}
	,createCommandInstance: function(commandClass) {
		return this.injector.instantiate(commandClass);
	}
	,mapSignalValues: function(valueClasses,valueObjects) {
		var _g1 = 0;
		var _g = valueClasses.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.injector.mapValue(valueClasses[i],valueObjects[i]);
		}
	}
	,unmapSignalValues: function(valueClasses,valueObjects) {
		var _g1 = 0;
		var _g = valueClasses.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.injector.unmap(valueClasses[i]);
		}
	}
	,detain: function(command) {
		this.detainedCommands.set(command,true);
	}
	,release: function(command) {
		if(this.detainedCommands.h.__keys__[command.__id__] != null) this.detainedCommands.remove(command);
	}
	,__class__: mmvc_base_CommandMap
};
var mmvc_base_ContextError = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.id = id;
};
$hxClasses["mmvc.base.ContextError"] = mmvc_base_ContextError;
mmvc_base_ContextError.__name__ = ["mmvc","base","ContextError"];
mmvc_base_ContextError.prototype = {
	__class__: mmvc_base_ContextError
};
var mmvc_base_ViewMapBase = function(contextView,injector) {
	this.viewListenerCount = 0;
	this.set_enabled(true);
	this.injector = injector;
	this.set_contextView(contextView);
};
$hxClasses["mmvc.base.ViewMapBase"] = mmvc_base_ViewMapBase;
mmvc_base_ViewMapBase.__name__ = ["mmvc","base","ViewMapBase"];
mmvc_base_ViewMapBase.prototype = {
	set_contextView: function(value) {
		if(value != this.contextView) {
			this.removeListeners();
			this.contextView = value;
			if(this.viewListenerCount > 0) this.addListeners();
		}
		return this.contextView;
	}
	,set_enabled: function(value) {
		if(value != this.enabled) {
			this.removeListeners();
			this.enabled = value;
			if(this.viewListenerCount > 0) this.addListeners();
		}
		return value;
	}
	,addListeners: function() {
	}
	,removeListeners: function() {
	}
	,onViewAdded: function(view) {
	}
	,onViewRemoved: function(view) {
	}
	,__class__: mmvc_base_ViewMapBase
	,__properties__: {set_enabled:"set_enabled",set_contextView:"set_contextView"}
};
var mmvc_base_MediatorMap = function(contextView,injector,reflector) {
	mmvc_base_ViewMapBase.call(this,contextView,injector);
	this.reflector = reflector;
	this.mediatorByView = new haxe_ds_ObjectMap();
	this.mappingConfigByView = new haxe_ds_ObjectMap();
	this.mappingConfigByViewClassName = new haxe_ds_StringMap();
	this.mediatorsMarkedForRemoval = new haxe_ds_ObjectMap();
	this.hasMediatorsMarkedForRemoval = false;
};
$hxClasses["mmvc.base.MediatorMap"] = mmvc_base_MediatorMap;
mmvc_base_MediatorMap.__name__ = ["mmvc","base","MediatorMap"];
mmvc_base_MediatorMap.__interfaces__ = [mmvc_api_IMediatorMap];
mmvc_base_MediatorMap.__super__ = mmvc_base_ViewMapBase;
mmvc_base_MediatorMap.prototype = $extend(mmvc_base_ViewMapBase.prototype,{
	mapView: function(viewClassOrName,mediatorClass,injectViewAs,autoCreate,autoRemove) {
		if(autoRemove == null) autoRemove = true;
		if(autoCreate == null) autoCreate = true;
		var viewClassName = this.reflector.getFQCN(viewClassOrName);
		if(this.mappingConfigByViewClassName.get(viewClassName) != null) throw new js__$Boot_HaxeError(new mmvc_base_ContextError("Mediator Class has already been mapped to a View Class in this context - " + Std.string(mediatorClass)));
		if(this.reflector.classExtendsOrImplements(mediatorClass,mmvc_api_IMediator) == false) throw new js__$Boot_HaxeError(new mmvc_base_ContextError("Mediator Class does not implement IMediator - " + Std.string(mediatorClass)));
		var config = new mmvc_base_MappingConfig();
		config.mediatorClass = mediatorClass;
		config.autoCreate = autoCreate;
		config.autoRemove = autoRemove;
		if(injectViewAs) {
			if((injectViewAs instanceof Array) && injectViewAs.__enum__ == null) {
				var _this;
				_this = js_Boot.__cast(injectViewAs , Array);
				config.typedViewClasses = _this.slice();
			} else if(js_Boot.__instanceof(injectViewAs,Class)) config.typedViewClasses = [injectViewAs];
		} else if(js_Boot.__instanceof(viewClassOrName,Class)) config.typedViewClasses = [viewClassOrName];
		this.mappingConfigByViewClassName.set(viewClassName,config);
		if(autoCreate || autoRemove) {
			this.viewListenerCount++;
			if(this.viewListenerCount == 1) this.addListeners();
		}
		if(autoCreate && this.contextView != null && viewClassName == Type.getClassName(Type.getClass(this.contextView))) this.createMediatorUsing(this.contextView,viewClassName,config);
	}
	,unmapView: function(viewClassOrName) {
		var viewClassName = this.reflector.getFQCN(viewClassOrName);
		var config = this.mappingConfigByViewClassName.get(viewClassName);
		if(config != null && (config.autoCreate || config.autoRemove)) {
			this.viewListenerCount--;
			if(this.viewListenerCount == 0) this.removeListeners();
		}
		this.mappingConfigByViewClassName.remove(viewClassName);
	}
	,createMediator: function(viewComponent) {
		return this.createMediatorUsing(viewComponent);
	}
	,registerMediator: function(viewComponent,mediator) {
		this.mediatorByView.set(viewComponent,mediator);
		var mapping;
		var key = Type.getClassName(Type.getClass(viewComponent));
		mapping = this.mappingConfigByViewClassName.get(key);
		this.mappingConfigByView.set(viewComponent,mapping);
		mediator.setViewComponent(viewComponent);
		mediator.preRegister();
	}
	,removeMediator: function(mediator) {
		if(mediator != null) {
			var viewComponent = mediator.getViewComponent();
			this.mediatorByView.remove(viewComponent);
			this.mappingConfigByView.remove(viewComponent);
			mediator.preRemove();
			mediator.setViewComponent(null);
		}
		return mediator;
	}
	,removeMediatorByView: function(viewComponent) {
		var mediator = this.removeMediator(this.retrieveMediator(viewComponent));
		this.injector.attendedToInjectees.remove(mediator);
		return mediator;
	}
	,retrieveMediator: function(viewComponent) {
		return this.mediatorByView.get(viewComponent);
	}
	,hasMapping: function(viewClassOrName) {
		var viewClassName = this.reflector.getFQCN(viewClassOrName);
		return this.mappingConfigByViewClassName.exists(viewClassName);
	}
	,hasMediatorForView: function(viewComponent) {
		return this.mediatorByView.exists(viewComponent);
	}
	,hasMediator: function(mediator) {
		var $it0 = this.mediatorByView.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			if(this.mediatorByView.h[key.__id__] == mediator) return true;
		}
		return false;
	}
	,addListeners: function() {
		if(this.contextView != null && this.enabled) {
			this.contextView.viewAdded = $bind(this,this.onViewAdded);
			this.contextView.viewRemoved = $bind(this,this.onViewRemoved);
		}
	}
	,removeListeners: function() {
		if(this.contextView != null) {
			this.contextView.viewAdded = null;
			this.contextView.viewRemoved = null;
		}
	}
	,onViewAdded: function(view) {
		if(this.mediatorsMarkedForRemoval.get(view) != null) {
			this.mediatorsMarkedForRemoval.remove(view);
			return;
		}
		var viewClassName = Type.getClassName(Type.getClass(view));
		var config = this.mappingConfigByViewClassName.get(viewClassName);
		if(config != null && config.autoCreate) this.createMediatorUsing(view,viewClassName,config);
	}
	,onViewRemoved: function(view) {
		var config = this.mappingConfigByView.get(view);
		if(config != null && config.autoRemove) this.removeMediatorByView(view);
	}
	,removeMediatorLater: function() {
		var $it0 = this.mediatorsMarkedForRemoval.iterator();
		while( $it0.hasNext() ) {
			var view = $it0.next();
			if(!this.contextView.isAdded(view)) this.removeMediatorByView(view);
			this.mediatorsMarkedForRemoval.remove(view);
		}
		this.hasMediatorsMarkedForRemoval = false;
	}
	,createMediatorUsing: function(viewComponent,viewClassName,config) {
		var mediator = this.mediatorByView.get(viewComponent);
		if(mediator == null) {
			if(viewClassName == null) viewClassName = Type.getClassName(Type.getClass(viewComponent));
			if(config == null) config = this.mappingConfigByViewClassName.get(viewClassName);
			if(config != null) {
				var _g = 0;
				var _g1 = config.typedViewClasses;
				while(_g < _g1.length) {
					var claxx = _g1[_g];
					++_g;
					this.injector.mapValue(claxx,viewComponent);
				}
				mediator = this.injector.instantiate(config.mediatorClass);
				var _g2 = 0;
				var _g11 = config.typedViewClasses;
				while(_g2 < _g11.length) {
					var clazz = _g11[_g2];
					++_g2;
					this.injector.unmap(clazz);
				}
				this.registerMediator(viewComponent,mediator);
			}
		}
		return mediator;
	}
	,__class__: mmvc_base_MediatorMap
});
var mmvc_base_MappingConfig = function() {
};
$hxClasses["mmvc.base.MappingConfig"] = mmvc_base_MappingConfig;
mmvc_base_MappingConfig.__name__ = ["mmvc","base","MappingConfig"];
mmvc_base_MappingConfig.prototype = {
	__class__: mmvc_base_MappingConfig
};
var mmvc_base_TriggerMap = function(injector) {
	this.injector = injector;
};
$hxClasses["mmvc.base.TriggerMap"] = mmvc_base_TriggerMap;
mmvc_base_TriggerMap.__name__ = ["mmvc","base","TriggerMap"];
mmvc_base_TriggerMap.__interfaces__ = [mmvc_api_ITriggerMap];
mmvc_base_TriggerMap.prototype = {
	map: function(trigger,command) {
		if(this.isClass(trigger)) return this.mapClass(trigger,command);
		if(this.isString(trigger)) return this.mapString(trigger,command);
		if(this.isEnumValue(trigger)) return this.mapEnumValue(trigger,command);
		throw new js__$Boot_HaxeError("Mapping type " + Std.string(Type["typeof"](trigger)) + " is not supported.");
	}
	,unmap: function(trigger,command) {
		if(this.isClass(trigger)) return this.unmapClass(trigger,command);
		if(this.isString(trigger)) return this.unmapString(trigger,command);
		if(this.isEnumValue(trigger)) return this.unmapEnumValue(trigger,command);
		throw new js__$Boot_HaxeError("Unmapping type " + Std.string(Type["typeof"](trigger)) + " is not supported.");
	}
	,dispatch: function(trigger) {
		if(this.isClassInstance(trigger)) return this.dispatchClass(trigger);
		if(this.isString(trigger)) return this.dispatchString(trigger);
		if(this.isEnumValue(trigger)) return this.dispatchEnumValue(trigger);
		throw new js__$Boot_HaxeError("Unmapping type " + Std.string(Type["typeof"](trigger)) + " is not supported.");
	}
	,mapClass: function(trigger,command) {
		if(this.classToCommand == null) this.classToCommand = new haxe_ds_StringMap();
		var key = Type.getClassName(trigger);
		var list = this.classToCommand.get(key);
		if(list == null) this.classToCommand.set(key,[command]); else list.push(command);
	}
	,unmapClass: function(trigger,command) {
		if(this.classToCommand == null) return;
		var key = Type.getClassName(trigger);
		var list = this.classToCommand.get(key);
		if(list != null) HxOverrides.remove(list,command);
	}
	,dispatchClass: function(trigger) {
		if(this.classToCommand == null) return;
		var triggerClass;
		if(trigger == null) triggerClass = null; else triggerClass = js_Boot.getClass(trigger);
		var key = Type.getClassName(triggerClass);
		var list = this.classToCommand.get(key);
		if(list != null) {
			var _g = 0;
			while(_g < list.length) {
				var commandClass = list[_g];
				++_g;
				this.invokeCommand(trigger,triggerClass,commandClass);
			}
		}
	}
	,mapString: function(trigger,command) {
		if(this.stringToCommand == null) this.stringToCommand = new haxe_ds_StringMap();
		var list = this.stringToCommand.get(trigger);
		if(list == null) this.stringToCommand.set(trigger,[command]); else list.push(command);
	}
	,unmapString: function(trigger,command) {
		if(this.stringToCommand == null) return;
		var list = this.stringToCommand.get(trigger);
		if(list != null) HxOverrides.remove(list,command);
	}
	,dispatchString: function(trigger) {
		if(this.stringToCommand == null) return;
		var list = this.stringToCommand.get(trigger);
		if(list != null) {
			var _g = 0;
			while(_g < list.length) {
				var commandClass = list[_g];
				++_g;
				this.invokeCommand(trigger,String,commandClass);
			}
		}
	}
	,mapEnumValue: function(trigger,command) {
		if(this.enumValueToCommand == null) this.enumValueToCommand = new haxe_ds_EnumValueMap();
		var list = this.enumValueToCommand.get(trigger);
		if(list == null) this.enumValueToCommand.set(trigger,[command]); else list.push(command);
	}
	,unmapEnumValue: function(trigger,command) {
		if(this.enumValueToCommand == null) return;
		var list = this.enumValueToCommand.get(trigger);
		if(list != null) HxOverrides.remove(list,command);
	}
	,dispatchEnumValue: function(trigger) {
		if(this.enumValueToCommand == null) return;
		var triggerClass;
		if(trigger == null) triggerClass = null; else triggerClass = js_Boot.getClass(trigger);
		var list = this.enumValueToCommand.get(trigger);
		if(list != null) {
			var _g = 0;
			while(_g < list.length) {
				var commandClass = list[_g];
				++_g;
				this.invokeCommand(trigger,triggerClass,commandClass);
			}
		}
	}
	,mapInstance: function(trigger,command) {
		if(!this.isClassInstance(trigger)) throw new js__$Boot_HaxeError("Trigger " + Std.string(trigger) + " is not an object.");
		if(this.instanceToCommand == null) this.instanceToCommand = new haxe_ds_ObjectMap();
		var list = this.instanceToCommand.h[trigger.__id__];
		if(list == null) this.instanceToCommand.set(trigger,[command]); else list.push(command);
	}
	,unmapInstance: function(trigger,command) {
		if(!this.isClassInstance(trigger)) throw new js__$Boot_HaxeError("Trigger " + Std.string(trigger) + " is not an object.");
		if(this.instanceToCommand == null) return;
		var list = this.instanceToCommand.h[trigger.__id__];
		if(list != null) HxOverrides.remove(list,command);
	}
	,dispatchInstance: function(trigger) {
		if(!this.isClassInstance(trigger)) throw new js__$Boot_HaxeError("Trigger " + Std.string(trigger) + " is not an object.");
		if(this.instanceToCommand == null) return;
		var triggerClass;
		if(trigger == null) triggerClass = null; else triggerClass = js_Boot.getClass(trigger);
		var list = this.instanceToCommand.h[trigger.__id__];
		if(list != null) {
			var _g = 0;
			while(_g < list.length) {
				var commandClass = list[_g];
				++_g;
				this.invokeCommand(trigger,triggerClass,commandClass);
			}
		}
	}
	,invokeCommand: function(trigger,triggerClass,commandClass) {
		if(commandClass == null) return;
		var command = this.injector.instantiate(commandClass);
		if(js_Boot.__instanceof(command,mmvc_impl_TriggerCommand)) {
			var triggerCommand = command;
			triggerCommand.trigger = trigger;
		}
		command.execute();
	}
	,isClass: function(source) {
		return js_Boot.__instanceof(source,Class);
	}
	,isString: function(source) {
		return typeof(source) == "string";
	}
	,isEnumValue: function(source) {
		return Reflect.isEnumValue(source);
	}
	,isClassInstance: function(source) {
		return Type.getClass(source) != null && !(typeof(source) == "string");
	}
	,__class__: mmvc_base_TriggerMap
};
var mmvc_base_ViewMap = function(contextView,injector) {
	mmvc_base_ViewMapBase.call(this,contextView,injector);
	this.mappedPackages = [];
	this.mappedTypes = new minject_ClassMap();
	this.injectedViews = new haxe_ds_ObjectMap();
};
$hxClasses["mmvc.base.ViewMap"] = mmvc_base_ViewMap;
mmvc_base_ViewMap.__name__ = ["mmvc","base","ViewMap"];
mmvc_base_ViewMap.__interfaces__ = [mmvc_api_IViewMap];
mmvc_base_ViewMap.__super__ = mmvc_base_ViewMapBase;
mmvc_base_ViewMap.prototype = $extend(mmvc_base_ViewMapBase.prototype,{
	mapPackage: function(packageName) {
		if(HxOverrides.indexOf(this.mappedPackages,packageName,0) > -1) return;
		this.mappedPackages.push(packageName);
		this.viewListenerCount++;
		if(this.viewListenerCount == 1) this.addListeners();
	}
	,unmapPackage: function(packageName) {
		if(!HxOverrides.remove(this.mappedPackages,packageName)) return;
		this.viewListenerCount--;
		if(this.viewListenerCount == 0) this.removeListeners();
	}
	,mapType: function(type) {
		if(this.mappedTypes.exists(type)) return;
		this.mappedTypes.set(type,type);
		this.viewListenerCount++;
		if(this.viewListenerCount == 1) this.addListeners();
		if(this.contextView != null && js_Boot.__instanceof(this.contextView,type)) this.injectInto(this.contextView);
	}
	,unmapType: function(type) {
		if(!this.mappedTypes.exists(type)) return;
		this.mappedTypes.remove(type);
		this.viewListenerCount--;
		if(this.viewListenerCount == 0) this.removeListeners();
	}
	,hasType: function(type) {
		return this.mappedTypes.exists(type);
	}
	,hasPackage: function(packageName) {
		return HxOverrides.indexOf(this.mappedPackages,packageName,0) > -1;
	}
	,addListeners: function() {
		if(this.contextView == null || !this.enabled) return;
		this.contextView.viewAdded = $bind(this,this.onViewAdded);
		this.contextView.viewRemoved = $bind(this,this.onViewAdded);
	}
	,removeListeners: function() {
		if(this.contextView == null) return;
		this.contextView.viewAdded = null;
		this.contextView.viewRemoved = null;
	}
	,onViewAdded: function(view) {
		if(this.injectedViews.exists(view)) return;
		var $it0 = this.mappedTypes.iterator();
		while( $it0.hasNext() ) {
			var type = $it0.next();
			if(js_Boot.__instanceof(view,type)) {
				this.injectInto(view);
				return;
			}
		}
		var len = this.mappedPackages.length;
		if(len > 0) {
			var className = Type.getClassName(Type.getClass(view));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				var packageName = this.mappedPackages[i];
				if(className.indexOf(packageName) == 0) {
					this.injectInto(view);
					return;
				}
			}
		}
	}
	,onViewRemoved: function(view) {
	}
	,injectInto: function(view) {
		this.injector.injectInto(view);
		this.injectedViews.set(view,true);
	}
	,__class__: mmvc_base_ViewMap
});
var msignal_Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal_SlotList.NIL;
	this.priorityBased = false;
};
$hxClasses["msignal.Signal"] = msignal_Signal;
msignal_Signal.__name__ = ["msignal","Signal"];
msignal_Signal.prototype = {
	add: function(listener) {
		return this.registerListener(listener);
	}
	,addOnce: function(listener) {
		return this.registerListener(listener,true);
	}
	,addWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,false,priority);
	}
	,addOnceWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,true,priority);
	}
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
	}
	,removeAll: function() {
		this.slots = msignal_SlotList.NIL;
	}
	,registerListener: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		if(this.registrationPossible(listener,once)) {
			var newSlot = this.createSlot(listener,once,priority);
			if(!this.priorityBased && priority != 0) this.priorityBased = true;
			if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
			return newSlot;
		}
		return this.slots.find(listener);
	}
	,registrationPossible: function(listener,once) {
		if(!this.slots.nonEmpty) return true;
		var existingSlot = this.slots.find(listener);
		if(existingSlot == null) return true;
		if(existingSlot.once != once) throw new js__$Boot_HaxeError("You cannot addOnce() then add() the same listener without removing the relationship first.");
		return false;
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,get_numListeners: function() {
		return this.slots.get_length();
	}
	,__class__: msignal_Signal
	,__properties__: {get_numListeners:"get_numListeners"}
};
var msignal_Signal0 = function() {
	msignal_Signal.call(this);
};
$hxClasses["msignal.Signal0"] = msignal_Signal0;
msignal_Signal0.__name__ = ["msignal","Signal0"];
msignal_Signal0.__super__ = msignal_Signal;
msignal_Signal0.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function() {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute();
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot0(this,listener,once,priority);
	}
	,__class__: msignal_Signal0
});
var msignal_Signal1 = function(type) {
	msignal_Signal.call(this,[type]);
};
$hxClasses["msignal.Signal1"] = msignal_Signal1;
msignal_Signal1.__name__ = ["msignal","Signal1"];
msignal_Signal1.__super__ = msignal_Signal;
msignal_Signal1.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot1(this,listener,once,priority);
	}
	,__class__: msignal_Signal1
});
var msignal_Signal2 = function(type1,type2) {
	msignal_Signal.call(this,[type1,type2]);
};
$hxClasses["msignal.Signal2"] = msignal_Signal2;
msignal_Signal2.__name__ = ["msignal","Signal2"];
msignal_Signal2.__super__ = msignal_Signal;
msignal_Signal2.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value1,value2) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value1,value2);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot2(this,listener,once,priority);
	}
	,__class__: msignal_Signal2
});
var msignal_Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
$hxClasses["msignal.Slot"] = msignal_Slot;
msignal_Slot.__name__ = ["msignal","Slot"];
msignal_Slot.prototype = {
	remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		if(value == null) throw new js__$Boot_HaxeError("listener cannot be null");
		return this.listener = value;
	}
	,__class__: msignal_Slot
	,__properties__: {set_listener:"set_listener"}
};
var msignal_Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot0"] = msignal_Slot0;
msignal_Slot0.__name__ = ["msignal","Slot0"];
msignal_Slot0.__super__ = msignal_Slot;
msignal_Slot0.prototype = $extend(msignal_Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
	,__class__: msignal_Slot0
});
var msignal_Slot1 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot1"] = msignal_Slot1;
msignal_Slot1.__name__ = ["msignal","Slot1"];
msignal_Slot1.__super__ = msignal_Slot;
msignal_Slot1.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param != null) value1 = this.param;
		this.listener(value1);
	}
	,__class__: msignal_Slot1
});
var msignal_Slot2 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot2"] = msignal_Slot2;
msignal_Slot2.__name__ = ["msignal","Slot2"];
msignal_Slot2.__super__ = msignal_Slot;
msignal_Slot2.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1,value2) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param1 != null) value1 = this.param1;
		if(this.param2 != null) value2 = this.param2;
		this.listener(value1,value2);
	}
	,__class__: msignal_Slot2
});
var msignal_SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) {
		if(msignal_SlotList.NIL != null) throw new js__$Boot_HaxeError("Parameters head and tail are null. Use the NIL element instead.");
		this.nonEmpty = false;
	} else if(head == null) throw new js__$Boot_HaxeError("Parameter head cannot be null."); else {
		this.head = head;
		if(tail == null) this.tail = msignal_SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
$hxClasses["msignal.SlotList"] = msignal_SlotList;
msignal_SlotList.__name__ = ["msignal","SlotList"];
msignal_SlotList.prototype = {
	get_length: function() {
		if(!this.nonEmpty) return 0;
		if(this.tail == msignal_SlotList.NIL) return 1;
		var result = 0;
		var p = this;
		while(p.nonEmpty) {
			++result;
			p = p.tail;
		}
		return result;
	}
	,prepend: function(slot) {
		return new msignal_SlotList(slot,this);
	}
	,append: function(slot) {
		if(slot == null) return this;
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		if(this.tail == msignal_SlotList.NIL) return new msignal_SlotList(slot).prepend(this.head);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		return this;
	}
	,contains: function(listener) {
		if(!this.nonEmpty) return false;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return true;
			p = p.tail;
		}
		return false;
	}
	,find: function(listener) {
		if(!this.nonEmpty) return null;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
			p = p.tail;
		}
		return null;
	}
	,__class__: msignal_SlotList
	,__properties__: {get_length:"get_length"}
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
msignal_SlotList.NIL = new msignal_SlotList(null,null);
haxe_IMap.__meta__ = { obj : { 'interface' : null}};
haxe_ds_ObjectMap.count = 0;
mmvc_api_IContext.__meta__ = { obj : { 'interface' : null}};
images_core_View.ADDED = "added";
images_core_View.REMOVED = "removed";
images_core_View.ACTIONED = "actioned";
images_core_View.UNHIDEGALLERY = "unhide_gallery";
images_core_View.idCounter = 0;
mmvc_api_IViewContainer.__meta__ = { obj : { 'interface' : null}};
mmvc_api_IMediator.__meta__ = { obj : { 'interface' : null}};
mmvc_impl_Mediator.__meta__ = { fields : { injector : { type : ["minject.Injector"], inject : null}, contextView : { type : ["mmvc.api.IViewContainer"], inject : null}, mediatorMap : { type : ["mmvc.api.IMediatorMap"], inject : null}}};
images_app_ApplicationViewMediator.__meta__ = { fields : { lightbox : { type : ["images.gallery.model.Lightbox"], inject : null}}};
mmvc_api_ICommand.__meta__ = { obj : { 'interface' : null}};
mmvc_impl_TriggerCommand.__meta__ = { fields : { contextView : { type : ["mmvc.api.IViewContainer"], inject : null}, commandMap : { type : ["mmvc.api.ICommandMap"], inject : null}, injector : { type : ["minject.Injector"], inject : null}, mediatorMap : { type : ["mmvc.api.IMediatorMap"], inject : null}, triggerMap : { type : ["mmvc.api.ITriggerMap"], inject : null}}};
images_gallery_command_LoadGalleryCommand.__meta__ = { fields : { list : { type : ["images.gallery.model.Gallery"], inject : null}}};
images_gallery_command_LoadLightboxCommand.__meta__ = { fields : { lightbox : { type : ["images.gallery.model.Lightbox"], inject : null}}};
mcore_data_Collection.__meta__ = { obj : { 'interface' : null}};
mmvc_impl_TriggerMediator.__meta__ = { fields : { triggerMap : { type : ["mmvc.api.ITriggerMap"], inject : null}}};
images_gallery_view_GalleryViewMediator.__meta__ = { fields : { lightbox : { type : ["images.gallery.model.Lightbox"], inject : null}}};
images_gallery_view_LightboxViewMediator.__meta__ = { fields : { lightbox : { type : ["images.gallery.model.Lightbox"], inject : null}}};
js_Boot.__toStr = {}.toString;
mcore_loader_Loader.__meta__ = { obj : { 'interface' : null}};
minject_point_InjectionPoint.__meta__ = { obj : { 'interface' : null}};
mmvc_api_ICommandMap.__meta__ = { obj : { 'interface' : null}};
mmvc_api_IMediatorMap.__meta__ = { obj : { 'interface' : null}};
mmvc_api_ITriggerMap.__meta__ = { obj : { 'interface' : null}};
mmvc_api_IViewMap.__meta__ = { obj : { 'interface' : null}};
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
