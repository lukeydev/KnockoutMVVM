$(function () {
    var photoPath = "/images/";

    // function helper 
    my.formatCurrency = function (value) {
        return "$" + value.toFixed(2);
    };

    // for creating (guitar) Model Models :)
    my.Model = function() {
        this.brand = ko.observable();
        this.name = ko.observable();
    };

    // for creating Product Models
    my.Product = function () {
        this.id = ko.observable();
        this.salePrice = ko.observable();
        this.photo = ko.observable();
        this.model = ko.observable();
        //this.shortDescription = ko.observable();
        this.shortDesc = ko.computed(function () {
            return this.model() ? this.model().brand() + " " + this.model().name() : "";
        }, this),
        this.photoUrl = ko.computed(function () {
            return photoPath + this.photo();
        }, this);
    };

    // for creating LineItem objects
    my.LineItem = function () {
        var self = this;
        self.product = ko.observable();
        self.quantity = ko.observable(1); // default
        self.extendedPrice = ko.computed(function () {
            //PAPA:  'this' wont work here, because 'this' is the DOM windows
            var x = this;
            return self.product() ? self.product().salePrice() * parseInt("0" + self.quantity(), 10) : 0;
        });
    };

    // The ViewModel
    my.vm = function () {
        var 
            metadata = {
                pageTitle: "Knockout: Control of Flow and Binding Contexts",
                personal: {
                    link: "http://twitter.com/john_papa",
                    text: "@john_papa"
                }
            },
            products = ko.observableArray([]),
            lines = ko.observableArray([]),
            addLine = function () {
                //PAPA:  'this' will work here
                //my.vm.lines.push(new my.LineItem());
                var x = this;
                lines.push(new my.LineItem());
            },
            removeLine = function (line) {
                //PAPA:  'this' won't work here, because 'this' is the LineItem
                //my.vm.lines.remove(line);
                lines.remove(line);
                //this.lines.remove(line);
                var x = this;
            },
        //private custom sort function
            sortFunction = function (a, b) {
                return a.shortDesc().toLowerCase() > b.shortDesc().toLowerCase() ? 1 : -1;
            };
        loadProducts = function () {
            $.each(my.sampleData.data.Products, function (i, p) {
                //PAPA:  'this' wont work here, because 'this' is the LineItem
                //my.vm.products.push(new my.Product()
                products.push(new my.Product()
                        .id(p.Id)
                        .salePrice(p.SalePrice)
                        .photo(p.Photo)
                        .model(new my.Model()
                            .name(p.Model.Name)
                            .brand(p.Model.Brand)
                        ));
            });
            products().sort(sortFunction);
        },
            grandTotal = ko.computed(function () {
                var total = 0;
                // 'this' ends up being the DOM window or HTML document
                var x = this;
                $.each(lines(), function () {
                    // "this" is part of the inner function, so its for a line item
                    total += this.extendedPrice();
                });
                return total;
            });
        return {
            metadata: metadata,
            products: products,
            lines: lines,
            removeLine: removeLine,
            addLine: addLine,
            loadProducts: loadProducts,
            grandTotal: grandTotal
        };
    } ();

    my.vm.loadProducts();
    ko.applyBindings(my.vm);
});
