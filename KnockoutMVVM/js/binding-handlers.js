(function () {

    //------------------------------------------------------
    // See these and more custom binding
    // handlers at http://learn.knockoutjs.com
    //------------------------------------------------------

    ko.bindingHandlers.fadeVisible = {
        init: function (element, valueAccessor) {
            // Start visible/invisible according to initial value
            var shouldDisplay = valueAccessor();
            $(element).toggle(shouldDisplay);
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            // On update, fade in/out
            var shouldDisplay = valueAccessor(),
                allBindings = allBindingsAccessor(),
                duration = allBindings.fadeDuration || 500; // 500ms is default duration unless otherwise specified

            shouldDisplay ? $(element).fadeIn(duration) : $(element).fadeOut(duration);
        }
    };

    ko.bindingHandlers.slideVisible = {
        init: function (element, valueAccessor) {
            // Start visible/invisible according to initial value
            //var shouldDisplay = valueAccessor();
            $(element).toggle(valueAccessor());
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var 
            // First get the latest data that we're bound to
                value = valueAccessor(),
            // Now get the other bindings in the same data-bind attr
                allBindings = allBindingsAccessor(),

            // Next, whether or not the supplied model property is observable, get its current value
                valueUnwrapped = ko.utils.unwrapObservable(value),

            // 400ms is default duration unless otherwise specified
                duration = allBindings.slideDuration || 400;

            // Now manipulate the DOM element
            if (valueUnwrapped == true) {
                $(element).slideDown(duration); // Make the element visible
            } else {
                $(element).slideUp(duration); // Make the element invisible
            }
        }
    };

    ko.bindingHandlers.jqButton = {
        init: function (element) {
            $(element).button(); // Turns the element into a jQuery UI button
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = valueAccessor(),
                options = ko.utils.extend(value.options || { }, ko.bindingHandlers.jqDialog.defaultOptions);
            // Here we just update the "disabled" state, but you could update other properties too
            $(element).button("option", "disabled", value.enable === false);
            //$(element).button("option", "label", value.enable ? "Finished" : "Um, Not Gunna Happen");
        }
    };

    ko.bindingHandlers.jqDialog = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var model = ko.utils.unwrapObservable(valueAccessor()),
                options = ko.utils.extend(model.options || {}, ko.bindingHandlers.jqDialog.defaultOptions);

            //setup our buttons
            options.buttons = {
                "Accept": model.accept.bind(viewModel, viewModel),
                "Cancel": model.cancel.bind(viewModel, viewModel)
            };

            //initialize the dialog
            $(element).dialog(options);

            //handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).dialog("destroy");
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).dialog(ko.utils.unwrapObservable(value.open) ? "open" : "close");

            if (value.title) {
                var title = value.title();
                if (title) {
                    $(element).dialog("option", "title", title);
                }
            }
            //handle positioning
            if (value.position) {
                var target = value.position();
                if (target) {
                    var pos = $(target).position();
                    $(element).dialog("option", "position", [pos.left + $(target).width(), pos.top + $(target).height()]);
                }
            }
        },
        defaultOptions: {
            autoOpen: false,
            resizable: false,
            modal: true
        }
    };

    ko.bindingHandlers.starRating = {
        init: function (element, valueAccessor) {
            $(element).addClass("starRating");
            for (var i = 0; i < 5; i++) {
                $("<span>").appendTo(element);
            }
            // Handle mouse events on the stars
            $("span", element).each(function (index) {
                $(this).hover(
                    function () {
                        $(this).prevAll().add(this).addClass("hoverChosen");
                    },
                    function () {
                        $(this).prevAll().add(this).removeClass("hoverChosen");
                    }).click(function () {
                        var ratingObservable = valueAccessor(); // Get the associated observable
                        ratingObservable(index + 1); // Write the new rating to it
                    });
            });
        },
        update: function (element, valueAccessor) {
            // Give the first x stars the "chosen" class, where x <= rating
            var ratingObservable = valueAccessor();
            $("span", element).each(function (index) {
                $(this).toggleClass("chosen", index < ratingObservable());
            });
        }
    };


})();