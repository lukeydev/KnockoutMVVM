// Utilities
// John Papa http://johnpapa.net
//                      http://twitter.com/@john_papa
// Depends on scripts:
//                         Knockout 
//
//  Usage:      
//              To Setup Tracking, add this tracker property to your viewModel    
//                                                     ===> viewModel.tracker = new ChangeTracker(viewModel);
//
//              Hook these into your view ...
//                  Did It Change?          ===> viewModel.tracker().somethingHasChanged();
//
//              Hook this into your view model functions (ex: load, save) ...
//                  Resync Changes        ===> viewModel.tracker().markCurrentStateAsClean;
//
//              Optionally, you can pass your own hashFunction for state tracking.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(function (my, global) {
    "use strict";
    var ko = global.ko;
    my.ChangeTracker = function (objectToTrack, hashFunction) {
        hashFunction = hashFunction || ko.toJSON;
        var lastCleanState = ko.observable(hashFunction(objectToTrack)),
            result = {
                somethingHasChanged: ko.dependentObservable(function () {
                    return hashFunction(objectToTrack) !== lastCleanState();
                }),
                markCurrentStateAsClean: function () {
                    lastCleanState(hashFunction(objectToTrack));
                }
            };
        return function () {
            return result;
        };
    };
}(my, this));