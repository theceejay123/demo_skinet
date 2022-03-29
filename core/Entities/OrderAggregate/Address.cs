namespace core.Entities.OrderAggregate;

public class Address
{
    public Address()
    {
    }

    public Address(string firstName, string lastName, string street, string city, string state, string postalCode)
    {
        FirstName = firstName;
        LastName = lastName;
        Street = street;
        City = city;
        State = state;
        PostalCode = postalCode;
        
    }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string PostalCode { get; set; }
}
