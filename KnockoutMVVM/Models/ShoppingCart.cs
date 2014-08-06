using System.Collections.Generic;
using System.Linq;

namespace MvpApp.Controllers
{
    public class ShoppingCart
    {
        //public double OrderTotal
        //{
        //    get { return CartItems == null ? 0 : CartItems.Sum(item => (item.Product.SalePrice*item.Quantity)); }
        //}
        //public long Id { get; set; }
        public IList<CartItem> CartItems { get; set; }
    }
}