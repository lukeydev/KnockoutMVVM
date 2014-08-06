$(function () {
    var photoPath = "/images/";

    infuser.defaults.templateSuffix = ".tmpl.html";
    infuser.defaults.templateUrl = "/templates";

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
        //this.shortDescription = ko.observable();
        self.shortDesc = ko.computed(function () {
            return this.model() ? this.model().brand() + " " + this.model().name() : "";
        }, self),
        self.photoUrl = ko.computed(function () {
            return photoPath + this.photo();
        }, self);
    };

    // The ViewModel
    my.vm = function () {
        var metadata = {
            pageTitle: "Knockout: afterAdd and beforeRemove",
            personal: {
                link: "http://twitter.com/john_papa",
                text: "@john_papa"
            },
            topics: [{ desc: "swapping templates" },
                { desc: "array filtering" },
                { desc: "item selection, within an observable array" },
                { desc: "$root and $parent" },
                { desc: "foreach" },
                { desc: "with" },
                { desc: "if & ifnot" },
                { desc: "Or conditions"}]
        },
            products = ko.observableArray([]),
            selectedProduct = ko.observable(),
            showAll = ko.observable(),
            tmpl = ko.observable(),
            showDetails = ko.observable(false),
            productView = function () {
                return showDetails() ? "productDetails" : "productSummary";
            },
            showElement = function (elem) {
                if (elem.nodeType === 1) $(elem).hide().slideDown();
            },
            hideElement = function (elem) {
                if (elem.nodeType === 1) $(elem).slideUp(function () { $(elem).remove(); });
            },
            sortFunction = function (a, b) {
                return a.shortDesc().toLowerCase() > b.shortDesc().toLowerCase() ? 1 : -1;
            },
            selectProduct = function (p) {
                selectedProduct(p);
            },
            productsToShow = ko.computed(function () {
                if (showAll()) {
                    return products();
                }
                return ko.utils.arrayFilter(products(), function (p) {
                    return (p.isGuitar()); // Accoustic Guitars only
                });
            }),
        loadProducts = function () {
            $.each(my.sampleData.data.Products, function (i, p) {
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
                );
            });
            products().sort(sortFunction);
        };
        return {
            metadata: metadata,
            products: products,
            showAll: showAll,
            selectedProduct: selectedProduct,
            showDetails: showDetails,
            hideElement: hideElement,
            showElement: showElement,
            selectProduct: selectProduct,
            productsToShow: productsToShow,
            loadProducts: loadProducts,
            tmpl: tmpl,
            productView: productView
        };
    } ();

    my.vm.loadProducts();
    ko.applyBindings(my.vm);
});
