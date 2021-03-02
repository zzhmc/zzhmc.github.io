class IndexDB{
	//打开/创建数据库
	constructor(dbName, version, opt={}){
		const {updateCallback, successCallback, errorCallback} = opt;
		
		const request = indexedDB.open(dbName, version);
		request.onerror = errorCallback || this.errCallback || function(e){
			console.error("数据库打开出错", e);
		};
		let update = false;
		request.onsuccess = (e)=>{
			if (!update)
				this.db = request.result;
			if (successCallback) successCallback();
			console.log("数据库打开success")
		};
		request.onupgradeneeded = (e)=>{
			this.db = e.target.result;
			update = true;
			if (updateCallback) updateCallback();
			console.log("数据库update");
		};
	}
	
	//设置错误回调
	setErrCallback(callback){
		this.errCallback = callback;
	};
	//设置成功回调
	setSuccessCallback(callback){
		this.successCallback = callback;
	};
	
	// 删除数据库
	remove(){
		indexedDB.deleteDatabase(this.db.name);
	}
	
	
	//获取所有表名
	getTableNames(){
		return this.db.objectStoreNames;
	}
	
	//判断表存在
	hasTable(tableName){
		return this.db.objectStoreNames.contains(tableName);
	}
	
	//新建表
	createTable(tableName, {keyPath,autoIncrement}, indexs=[]){
		if ( this.hasTable(tableName) ) return; //已存在
		
		const objectStore = this.db.createObjectStore(tableName, {
			keyPath, //主键
			autoIncrement //自动生成主键
		});
		for (const i of indexs) //索引
			objectStore.createIndex(i.name, i.attr, {
				unique: i.unique //是否可重复
			});
		
		return this;
	}
	
	// 清空表
	clearTable(tableName, opt={}){
		const {successCallback, errorCallback} = opt,
			request = this.db.transaction([tableName], "readwrite")
				.objectStore( tableName )
				.clear();
		
		request.onsuccess = successCallback || this.successCallback;
		request.onerror = errorCallback || this.errCallback || function(e){
			console.error("表clear失败", e);
		};
	}
	
	
	//添加数据
	addData(tableName, data, opt={}){
		const {successCallback, errorCallback} = opt,
			request = this.db.transaction([tableName], "readwrite")
				.objectStore( tableName )
				.add( data );
		
		//request.oncomplete = successCallback || this.successCallback;
		request.onsuccess = successCallback || this.successCallback;
		request.onerror = errorCallback || this.errCallback || function(e){
			console.error("数据add失败", e);
		};
		
		return this;
	}
	
	//更新数据
	updateData(tableName, data, opt={}){
		const {successCallback, errorCallback} = opt,
			request = this.db.transaction([tableName], "readwrite")
				.objectStore( tableName )
				.put( data );
		
		request.onsuccess = successCallback || this.successCallback;
		request.onerror = errorCallback || this.errCallback || function(e){
			console.error("数据update失败", e);
		};
		
		return this;
	}
	
	//以主键/索引 读取数据
	read(tableName, keyValue, opt={}){
		const {index, successCallback, errorCallback} = opt;
		let request = this.db.transaction([tableName], "readonly")
				.objectStore( tableName );
		if (index)
			request = request.index( index );
		request = request.get( keyValue );
		
		request.onsuccess = function(e){
			(successCallback || this.successCallback)(request.result, e);
		};
		request.onerror = errorCallback || this.errCallback || function(e){
			console.error("数据readByKey失败", e);
		};
		
		return this;
	}
	
	//获取所有数据
	readAll(tableName, opt={}){
		const {successCallback, errorCallback} = opt,
			request = this.db.transaction([tableName], "readonly")
				.objectStore( tableName )
				.getAll();
		
		request.onsuccess = (e)=>{
			(successCallback || this.successCallback)(e.target.result, e);
		};
		request.onerror = errorCallback || this.errCallback || function(e){
			console.error("数据readAll失败", e);
		};
		
		return this;
	}
	
	//遍历所有数据
	readStep(tableName, opt={}){
		/* range:
			"only", "A"
			"lowerBound", "A", true(不包含A)/false(包含A)
			"upperBound", "A", true(不包含A)/false(包含A)
			"bound", "A", "B", true(不包含A)/false(包含A), true(不包含B)/false(包含B)
		dirt: null/"prev"
		*/
		const {index, range, dirt, stepCallback, successCallback, errorCallback} = opt;
		let request = this.db.transaction([tableName], "readonly")
				.objectStore( tableName );
		if (index)
			request = request.index( index );
		request = request.openCursor( range? IDBKeyRange[range[0]](...range.slice(1)): null, dirt );
		
		request.onsuccess = function(e){
			const cursor = e.target.result;
			if (cursor){
				if (stepCallback && stepCallback(cursor.value, cursor) === false) return;
				cursor.continue();
			}else{
				if (successCallback) successCallback(cursor);
			}
		};
		request.onerror = errorCallback || this.errCallback || function(e){
			console.error("数据readAll失败", e);
		};
		
		return this;
	}
	
	//以主键 移除数据
	remove(tableName, keyValue, opt={}){
		const {successCallback, errorCallback} = opt,
			request = this.db.transaction([tableName], "readwrite")
				.objectStore( tableName )
				.delete( keyValue );
		
		request.onsuccess = successCallback || this.successCallback;
		request.onerror = errorCallback || this.errCallback || function(e){
			console.error("数据removeByKey失败", e);
		};
		
		return this;
	}
	
	/*//以索引 移除数据
	removeByIndex(tableName, indexName, indexValue, opt={}}){
		const {successCallback, errorCallback} = opt,
			request = this.db.transaction([tableName], "readwrite")
				.objectStore( tableName )
				.index( indexName )
				.delete( indexValue );
		
		request.onsuccess = successCallback || this.successCallback;
		request.onerror = errorCallback || this.errCallback || function(e){
			console.error("数据removeByIndex失败", e);
		};
		
		return this;
	}*/
}