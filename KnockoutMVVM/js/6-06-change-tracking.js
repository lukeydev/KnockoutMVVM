$(function () {
    var photoPath = "/images/";

    infuser.defaults.templateSuffix = ".tmpl.html";
    infuser.defaults.templateUrl = "/templates";

    // Could create a utility function to do this
    my.objectInArray = function (searchFor, property) {
        var retVal = false;
        $.each(this, function (index, item) {
            if (item.hasOwnProperty(property)) {
                if (item[property]() === searchFor) {
                    retVal = item[property];
                    return retVal;
                }
            }
        });
        return retVal;
    };
    Array.prototype.objectInArray = my.objectInArray;

    // function helper 
    my.formatCurrency = function (value) {
        return "$" + value.toFixed(2);
    };

    // for creating (guitar) Model Models :)
    my.Model = function () {
        this.id = ko.observable();
        this.brand = ko.observable();
        this.name = ko.observable();
    };

    my.Category = function () {
        this.id = ko.observable();
        this.name = ko.observable();
    };

    // for creating Product Models
    my.Product = function (selectedItem) {
        var self = this;
        self.id = ko.observable();
        self.salePrice = ko.observable();
        self.photo = ko.observable();
        self.model = ko.observable();
        self.category = ko.observable();
        self.description = ko.observable();
        self.rating = ko.observable();
        self.isSelected = ko.computed(function () {
            return selectedItem() === self;
        });
        self.isGuitar = ko.computed(function () {
            return this.category() ? this.category().id() === 1 : false;
        }, self),
        self.shortDesc = ko.computed(function () {
            return this.model() ? this.model().brand() + " " + this.model().name() : "";
        }, self),
        self.photoUrl = ko.computed(function () {
            return photoPath + this.photo();
        }, self),
        self.rating.subscribe(function () {
            this.stateHasChanged(true);
        }, self),
        self.stateHasChanged = ko.observable(false);
    };

    my.CartItem = function () {
        var self = this;
        self.product = ko.observable();
        self.quantity = ko.observable();
        self.extPrice = ko.computed(function () {
            return this.product() ? this.product().salePrice() * this.quantity() : 0;
        }, self);
    };

    my.DialogOptions = function () {
        var self = this;
        self.open = ko.observable(false);
        self.title = ko.observable();
        self.text = ko.observable();
        self.accept = function () {
            self.open(false);
        };
        self.cancel = function () {
            self.open(false);
        };
    };

    // The ViewModel
    my.vm = (function () {
        var metadata = {
            pageTitle: "Knockout: Change Tracking",
            personal: {
                link: "http://twitter.com/john_papa",
                text: "@john_papa"
            },
            topics: [
                { desc: "ajax" },
                { desc: "change tracking" },
                { desc: "jQuery UI dialog" },
                { desc: "external templates" },
                { desc: "containerless templates" },
                { desc: "item selection, within an observable array" },
                { desc: "change tracking" },
                { desc: "foreach" },
                { desc: "custom binding handler: jqDialog"}]
        },
            shoppingCart = ko.observableArray([]),
            tracker = new ko.ChangeTracker(shoppingCart),
            dialogOptions = new my.DialogOptions(),
            defaultAnimationSpeed = 500,
            products = ko.observableArray([]),
            selectedProduct = ko.observable(),
            sortFunction = function (a, b) {
                return a.shortDesc().toLowerCase() > b.shortDesc().toLowerCase() ? 1 : -1;
            },
            selectProduct = function (p) {
                selectedProduct(p);
            },
            hideItem = function (elem) {
                if (elem.nodeType === 1) {
                    var effect = function () {
                        return $(elem).fadeOut(defaultAnimationSpeed);
                    };
                    effect();
                }
            },
            showItem = function (elem) {
                if (elem.nodeType === 1) {
                    var effect = function () {
                        return $(elem).hide().fadeIn(defaultAnimationSpeed);
                    };
                    effect();
                }
            },
            addToCart = function (product) {
                if (!shoppingCart().objectInArray(product, "product")) {
                    var cartItem = new my.CartItem()
                                                .product(product)
                                                .quantity(1);
                    shoppingCart.push(cartItem);
                    products.remove(product);
                }
            },
            removeFromCart = function (cartItem) {
                if (shoppingCart().indexOf(cartItem) > -1) {
                    products.push(cartItem.product());
                    shoppingCart.remove(cartItem);
                }
            },
            grandTotal = ko.computed(function () {
                var total = 0;
                $.each(shoppingCart(), function () {
                    total += this.extPrice();
                });
                return total;
            }),
            loadProductsCallback = function (json) {
                my.vm.tracker().markCurrentStateAsClean();
                $.each(json, function (i, p) {
                    products.push(new my.Product(selectedProduct)
                            .id(p.Id)
                            .salePrice(p.SalePrice)
                            .photo(p.Photo)
                            .category(new my.Category()
                            .id(p.Category.Id)
                            .name(p.Category.Name)
                                )
                            .model(new my.Model()
                            .id(p.Model.Id)
                            .name(p.Model.Name)
                            .brand(p.Model.Brand)
                                )
                            .description(p.Description)
                            .rating(p.Rating)
                            .stateHasChanged(false)
                    );
                });
                products.sort(sortFunction);
            },
            loadProducts = function () {
                my.shoppingDataService.getSaleItems(my.vm.loadProductsCallback);
            },
            placeOrderCallback = function (json) {
                my.vm.tracker().markCurrentStateAsClean();
                dialogOptions.title("Place Order").text(json.message).open(true);
            },
            placeOrder = function () {
                my.ajaxService.ajaxPostJson("PlaceOrder", shoppingCart, my.vm.placeOrderCallback);
            };
        return {
            metadata: metadata,
            tracker: tracker,
            dialogOptions: dialogOptions,
            selectedProduct: selectedProduct,
            selectProduct: selectProduct,
            products: products,
            loadProductsCallback: loadProductsCallback,
            loadProducts: loadProducts,
            placeOrderCallback: placeOrderCallback,
            placeOrder: placeOrder,
            hideItem: hideItem,
            showItem: showItem,
            shoppingCart: shoppingCart,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            grandTotal: grandTotal
        };
    })();

    //my.vm.tracker = new ko.ChangeTracker(my.vm.shoppingCart);
    my.vm.loadProducts();
    ko.applyBindings(my.vm);
});

