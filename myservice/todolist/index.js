
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
                resp.send(JSON.stringify(r.get(route, null)))
                break
            case 'DELETE':
                getRawBody(req, (err, body) => {
                    //resp.send(JSON.stringify(routes.post(route, body.toString(),null, ' ')));
                    if (body === undefined) {
                        console.log("body is undefined")
                    }                    
                    console.log("body: " + body)
                    let item_del = JSON.parse(body).item
                    if (item_del === undefined) {
                        console.log("item is undefined")
                    }
                    if (body === undefined || typeof item_del !== 'string') {
                        //throw new Error('invalid item data')
                        resp.send(status.notFound, {message: 'invalid item data'})                    
                        return
                    }
                    let respfromdel = r.get(route, item_del)
                    console.log('remove response: ' + respfromdel)
                    resp.send(JSON.stringify(respfromdel))
                    return 
                });
            case 'POST':
                //console.log('item? ' + req.body.item)
                getRawBody(req, (err, body) => {
                    //resp.send(JSON.stringify(routes.post(route, body.toString(),null, ' ')));
                    if (body === undefined) {
                        console.log("body is undefined")
                    }                    
                    console.log("body: " + body)
                    let item = JSON.parse(body).item
                    if (item === undefined) {
                        console.log("item is undefined")
                    }
                    if (body === undefined || typeof item !== 'string') {
                        //throw new Error('invalid item data')
                        resp.send(status.notFound, {message: 'invalid item data'})                    
                        return
                    }
                    resp.send(JSON.stringify(r.get(route, item)))
                    return 
                });                
        }
    }
}