
'use strict';
const getRawBody = require('raw-body');
const r = require('./route.js')
module.exports.handler = function(req, resp, context) {
    console.log('hello world')
    console.log(req.url)
    
    const status = {
        'ok': 200,
        'created': 201,
        'notModified': 304,
        'notFound': 404,
        'noContent': 204
    }    

    resp.setHeader('content-type', 'application/json')
    var uri = (req.url).split('/')
    if(uri.length == 0) {
        resp.send(JSON.stringify({'code': 400, 'body': 'Bad Request'}, null, ''))
    } else {
        var route = uri[uri.length-1]
        console.log(route)
        switch(req.method) {
            case 'GET':
                //resp.send(JSON.stringify({'code': 200, 'body': r.get(route, null)}))
                resp.send(JSON.stringify(r.get(route)))
                break
            case 'PUT':
                if (route === 'removeall') {
                    resp.send(JSON.stringify(r.put(route, null)))                    
                } else {
                    getRawBody(req, (err, body) => {
                        //resp.send(JSON.stringify(routes.post(route, body.toString(),null, ' ')));
                                            
                        console.log("body: " + body)
                        if (body === undefined) {
                            //throw new Error('invalid item data')
                            resp.send(status.notFound, {message: 'invalid item data'})                    
                            return
                        }  
                        let item_del = JSON.parse(body).item
                        if (typeof item_del !== 'string') {
                            //throw new Error('invalid item data')
                            resp.send(status.notFound, {message: 'invalid item data'})                    
                            return
                        }
                        let remove_resp = r.put(route, item_del)
                        resp.send(JSON.stringify(remove_resp))
                    })
                }
                break
            case 'POST':                
                getRawBody(req, (err, body) => {
                    console.log("body: " + body)
                    if (body === undefined) {
                        console.log("body is undefined")
                        resp.send(status.notFound, {message: 'invalid item data'})                    
                        return
                    }
                    let item = JSON.parse(body).item
                    if (item === undefined) {
                        console.log("item is undefined")
                        resp.send(status.notFound, {message: 'invalid item data'})                    
                        return
                    }
                    resp.send(JSON.stringify(r.post(route, item)))
                    return 
                })
                break           
        }
    }
}