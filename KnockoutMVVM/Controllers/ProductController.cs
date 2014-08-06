using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using MvpApp.Controllers;

namespace KnockoutMVVM.Controllers
{
    public class ProductController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetSaleItems()
        {
            return Json(GetMockData(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult PlaceOrder(List<CartItem> cartItems)
        {
            var message = "Failed PlaceOrder";
            if (cartItems == null) return Json(new { message });

            double total = cartItems.Sum(cartItem => cartItem.Quantity*cartItem.Product.SalePrice);
            message = string.Format("saved {0} items for a total of ${1}", cartItems.Count, total);
            return Json(new { message }, JsonRequestBehavior.AllowGet);
        }

        private List<Product> GetMockData()
        {
            var acousticCat = new Category() { Name = "Acoustic Guitars", Id = 1 };
            var strapsCat = new Category() { Name = "Straps", Id = 4 };
            var capoCat = new Category() { Name = "Capos", Id = 3 };
            var saleItems = new List<Product>()
                                {
                                    new Product(){Id = 4,ModelId = 1, SalePrice = 1649.01, ListPrice = 2199.00, Rating = 5, Photo = "Taylor 314-CE Left-Handed Grand Auditorium Acoustic-Electric Guitar.png", CategoryId = 1, ItemNumber = "T314CE", Description = "Taylor 314-CE Left-Handed Grand Auditorium Acoustic-Electric Guitar", Model = new Model(){ Name = "314ce", Brand = "Taylor", Id = 1 }, Category = acousticCat},
                                    new Product(){ModelId = 3, SalePrice = 4775.00, ListPrice = 7199.00, Rating = 5, Photo = "T814ce_tobacco+sunburst.jpg", CategoryId = 1, ItemNumber = "T814CE", Description = "Taylor 814-CE Acoustic Electric Guitar in Tobacco Sunburst",Model = new Model(){Name = "814ce", Brand = "Taylor", Id = 3 },Category = acousticCat, Id = 3 },new Product(){ModelId = 4, SalePrice = 5899.00, ListPrice = 7999.00, Rating = 5, Photo = "T914CE.jpg", CategoryId = 1, ItemNumber = "T914CE", Description = "Taylor 814-CE Acoustic Electric Guitar", Model = new Model(){Name = "914ce", Brand = "Taylor", Id = 4 }, Category = acousticCat, Id = 3 },
                                    new Product(){ModelId = 5, SalePrice = 5898.00, ListPrice = 7998.00, Rating = 5, Photo = "T916ce_tobacco+sunburst.jpg", CategoryId = 1, ItemNumber = "T916CE", Description = "Taylor 916-CE Acoustic Electric Guitar in Tobacco Sunburst", Model = new Model(){Name = "916ce", Brand = "Taylor", Id = 5 }, Category = acousticCat, Id = 4 },
                                    new Product(){ModelId = 6, SalePrice = 8999.00, ListPrice = 10599.00, Rating = 5, Photo = "TDMSM_front_print.jpg", CategoryId = 1, ItemNumber = "T814CE", Description = "Taylor DMSM Acoustic Electric Guitar", Model = new Model(){Name = "DMSM", Brand = "Taylor", Id = 6 }, Category = acousticCat, Id = 5 },
                                    new Product(){ModelId = 8, SalePrice = 4199.00, ListPrice = 5199.00, Rating = 5, Photo = "Taylor Koa Series K66ce Grand Symphony 12-String Cutaway Acoustic Electric Guitar.png", CategoryId = 1, ItemNumber = "TK66CE", Description = "Taylor Koa Series K66ce Grand Symphony 12-String Cutaway Acoustic Electric Guitar", Model = new Model(){Name = "K66e", Brand = "Taylor", Id = 8 }, Category = acousticCat, Id = 11 },
                                    new Product(){ModelId = 9, SalePrice = 299.00, ListPrice = 399.00, Rating = 3, Photo = "Taylor Baby Taylor Left-Handed Acoustic Guitar.png", CategoryId = 1, ItemNumber = "TBTL", Description = "Taylor Baby Taylor Left-Handed Acoustic Guitar", Model = new Model(){Name = "Baby", Brand = "Taylor", Id = 9 }, Category = acousticCat, Id = 12 },
                                    new Product(){ModelId = 10, SalePrice = 1999.00, ListPrice = 2399.00, Rating = 4, Photo = "Taylor T5 Standard Acoustic-Electric Guitar with Spruce Top.png", CategoryId = 1, ItemNumber = "TT5E", Description = "Taylor T5 Standard Acoustic-Electric Guitar with Spruce Top", Model = new Model(){Name = "T5", Brand = "Taylor", Id = 10 }, Category = acousticCat, Id = 13 },
                                    new Product(){ModelId = 11, SalePrice = 149.99, ListPrice = 169.99, Rating = 4, Photo = "El Dorado Vintage Hand-Tooled Leather Guitar Strap.png", CategoryId = 4, ItemNumber = "87123", Description = "El Dorado Vintage Hand-Tooled Leather Guitar Strap", Model = new Model(){Name = "Vintage", Brand = "El Dorado", Id = 11 }, Category = strapsCat, Id = 14 },
                                    new Product(){ModelId = 12, SalePrice = 16.99, ListPrice = 19.99, Rating = 3, Photo = "Moody 2 half Inch Luxury Black Leather Guitar Strap with Tobacco Leather Back.png", CategoryId = 4, ItemNumber = "89120", Description = "Moody 2 half Inch Luxury Black Leather Guitar Strap with Tobacco Leather Back", Model = new Model(){Name = "Luxury", Brand = "Moody", Id = 12 }, Category = strapsCat, Id = 15 },
                                    new Product(){ModelId = 13, SalePrice = 150.00, ListPrice = 180.00, Rating = 2, Photo = "LM Products Iron Cross Stud 2 Inch Guitar Strap.png", CategoryId = 4, ItemNumber = "12972", Description = "LM Products Iron Cross Stud 2 Inch Guitar Strap", Model = new Model(){Name = "Iron Cross", Brand = "LM", Id = 13 }, Category = strapsCat, Id = 17 },
                                    new Product(){ModelId = 14, SalePrice = 64.99, ListPrice = 64.99, Rating = 4, Photo = "Jodi Head 3 Inch Denny Wide Art Deco Guitar Strap - Brown and Tan Sequin Sparkle.png", CategoryId = 4, ItemNumber = "98612", Description = "Jodi Head 3\" Denny Wide Art Deco Guitar Strap - Brown and Tan Sequin Sparkle", Model = new Model(){Name = "Deco", Brand = "Jodi", Id = 14 }, Category = strapsCat, Id = 18 },
                                    new Product(){ModelId = 15, SalePrice = 59.99, ListPrice = 64.99, Rating = 3, Photo = "Levy\u0027s Leather Guitar Strap with Dog Tags.png", CategoryId = 4, ItemNumber = "71203", Description = "Levy\u0027s Leather Guitar Strap with Dog Tags", Model = new Model(){Name = "Dog Tags", Brand = "Levy\u0027s", Id = 15 }, Category = strapsCat, Id = 19 },
                                    new Product(){ModelId = 16, SalePrice = 14.99, ListPrice = 19.99, Rating = 5, Photo = "Dunlop Trigger Classical Guitar Capo.png", CategoryId = 3, ItemNumber = "76123", Description = "Dunlop Trigger Classical Guitar Capo", Model = new Model(){Name = "Trigger", Brand = "Dunlop", Id = 16 }, Category = capoCat, Id = 20 },
                                    new Product(){ModelId = 17, SalePrice = 16.99, ListPrice = 17.99, Rating = 4, Photo = "Paige 6-String Guitar Capo.png", CategoryId = 3, ItemNumber = "36581", Description = "Paige 6-String Guitar Capo", Model = new Model(){Name = "Basic Capo", Brand = "Paige", Id = 17 }, Category = capoCat, Id = 21 },
                                    new Product(){ModelId = 18, SalePrice = 24.99, ListPrice = 25.99, Rating = 4, Photo = "Glider GL-1 Guitar Capo.png", CategoryId = 3, ItemNumber = "23421", Description = "Glider GL-1 Guitar Capo", Model = new Model(){Name = "GL-1", Brand = "Glider", Id = 18 }, Category = capoCat, Id = 22 },
                                    new Product(){ModelId = 19, SalePrice = 14.99, ListPrice = 18.99, Rating = 1, Photo = "Planet Waves NS Classical Guitar Capo.png", CategoryId = 3, ItemNumber = "25232", Description = "Planet Waves NS Classical Guitar Capo", Model = new Model(){Name = "NS", Brand = "Planet Waves", Id = 19 }, Category = capoCat, Id = 23 },
                                    new Product(){ModelId = 2, SalePrice = 649.00, ListPrice = 899.00, Rating = 4, Photo = "Taylor 314-CE Left-Handed Grand Auditorium Acoustic-Electric Guitar.png", CategoryId = 1, ItemNumber = "T110CE", Description = "Taylor 114-CE Left-Handed Grand Auditorium Acoustic-Electric Guitar", Model = new Model(){Name = "110ce", Brand = "Taylor", Id = 2 }, Category = acousticCat, Id = 25 }
                            };
            return saleItems;
        }

    }
}

