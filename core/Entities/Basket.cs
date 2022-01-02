namespace core.Entities
{
    public class Basket
    {
        public Basket()
        {
        }

        public Basket(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<Item> Items { get; set; } = new List<Item>();
    }
}
