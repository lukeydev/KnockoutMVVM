using System.Collections.Generic;

namespace MvpApp.Controllers
{
    public class Product
    {
        public long Id { get; set; }
        public long ModelId { get; set; }
        public double SalePrice { get; set; }
        public double ListPrice { get; set; }
        public int Rating { get; set; }
        public string Photo { get; set; }
        public long CategoryId { get; set; }
        public string ItemNumber { get; set; }
        public string Description { get; set; }
        public Category Category { get; set; }
        public Model Model { get; set; }
    }
}