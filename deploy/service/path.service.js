var PF = require('pathfinding');
var Q = require('q');
var _ = require('underscore');

var service = {};

service.findPath = findPath;

module.exports = service;

function findPath(data){
    console.log(Object.keys(data));
    var deferred = Q.defer();

    deferred.resolve("DA");

    return deferred.promise;
}