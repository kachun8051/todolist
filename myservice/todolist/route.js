const lists = []

const status = {
    'ok': 200,
    'created': 201,
    'notModified': 304,
    'notFound': 404,
    'noContent': 204
}

function findItem2(_item) {
    let foundindex = -1;
    var i = 0;
    for(i = 0; i < lists.length; i++){    
      if (lists[i].toUpperCase() === _item.toUpperCase()) {
        foundindex = i;
      }
    }
    return foundindex;
}

const date = new Date()

exports.post = (route, item) => {
    console.log('route in route.js:' + route)
    console.log('item in route.js: ' + item)
    if (lists === undefined) {
        //resp.send(status.notFound, {message: 'no lists found'})                    
        return {'code': status.notFound, 'body': 'no lists found'} 
    } 
    switch(route){
        case "add":
            try{
                console.log("item: " + item)
                let foundindex = lists.indexOf(item)
                //console.log(lists)
                //console.log("index found: " + foundindex)
                if (foundindex === -1) {
                    console.log('pushing')
                    lists.push(item)
                    console.log('pushed')
                    return {'code': status.created, 'body': item}
                    //resp.send(status.created, {item: item_1})
                } else {
                    return {'code': status.ok, 'body': `item (${item}) is existed!`}      
                    //resp.send(status.ok, {item: item_1, message: 'item is existed!'})      
                }
            } catch(err) {
                return {'code': status.notFound, 'body': err.message}
                //resp.send(status.notFound, {message: err.message})
            } finally {
                //resp.end()
            }
        default:
            return {'code': 400, 'body': 'Bad Request'};
    }
} 

exports.put = (route, item) => {
    console.log('route in route.js:' + route)
    console.log('item in route.js: ' + item)
    if (lists === undefined) {
        //resp.send(status.notFound, {message: 'no lists found'})                    
        return {'code': status.notFound, 'body': 'no lists found'} 
    } 
    switch(route){
        case "removeall":
            lists.splice(0, lists.length)
            return {'code': status.ok, 'body': "remove all successfully"}
        case "remove":
            try {
                let foundindex_1 = findItem2(item) //lists.indexOf(item_1.toUpperCase())
                console.log("index found: " + foundindex_1)
                if (foundindex_1 === -1) {      
                    //res.send(status.ok, {item: item, message: `item (${item}) is NOT existed!`})      
                    return {'code': status.ok, 'body': `item (${item}) is NOT existed!`} 
                } else {      
                    console.log('splicing')
                    lists.splice(foundindex_1, 1)
                    console.log('spliced')
		            //res.send(status.ok, {item: item, message: `item (${item}) is deleted successfully.`})
                    return {'code': status.ok, 'body': item}
                }
            } catch (err) {
                return {'code': status.notFound, 'body': err.message}
            }
        default:
            return {'code': 400, 'body': 'Bad Request'};        
    }
} 

exports.get = (route, item) => {
    console.log('route in route.js:' + route)
    console.log('item in route.js: ' + item)
    if (lists === undefined) {
        //resp.send(status.notFound, {message: 'no lists found'})                    
        return {'code': status.notFound, 'body': 'no lists found'} 
    } 
    switch(route){
        case "list":
            return {'code': 200, 'body': lists};
        case "count":
            return {'code': 200, 'body': lists.count()}
        default:
            return {'code': 400, 'body': 'Bad Request'};
    }
}