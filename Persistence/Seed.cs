using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager, 
            RoleManager<IdentityRole> roleManager, 
            IConfiguration config)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Deep Singh Chauhan",
                        UserName = "deep",
                        Email = "deep@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Nirbhay Singh",
                        UserName = "nirbhay",
                        Email = "nirbhay@test.com"
                    }
                };

                if (!context.Roles.Any(r => r.Name == SD.AdminEndUser))
                {
                    await roleManager.CreateAsync(new IdentityRole(SD.AdminEndUser));
                    await roleManager.CreateAsync(new IdentityRole(SD.SalesEndUser));
                    await roleManager.CreateAsync(new IdentityRole(SD.DataEntryEndUser));
                    await roleManager.CreateAsync(new IdentityRole(SD.DairyOwnerEndUser));
                    await roleManager.CreateAsync(new IdentityRole(SD.CustomerEndUser));
                }

                var tempUser = config["TempUserCred"];
                if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != "Development")
                {
                    tempUser = Environment.GetEnvironmentVariable("DairyFarm-TempUserCred");
                }

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, tempUser);
                    await userManager.AddToRoleAsync(user, SD.AdminEndUser);
                }

                var dairyFarms = new List<DairyFarm>
                {
                    new DairyFarm{
                        AddedBy = users[0],
                        AddedDate = DateTime.UtcNow,
                        Address = "123 Main St",
                        City = "London",
                        Area = "Ontario",
                        BuffaloCount = 10,
                        BusinessName = "Ramesh Dairy",
                        ContactName = "Ramesh",
                        ContactNumber = "1234567890",
                        CowCount = 2,
                        Landmark = "Near the big tree",
                        Latitude = 43.123456,
                        Longitude = -81.123456,
                        Pincode = "123456",
                        MilkProduction = 300,
                    },
                    new DairyFarm{
                        AddedBy = users[1],
                        AddedDate = DateTime.UtcNow,
                        Address = "456 Main St",
                        City = "London",
                        Area = "Ontario",
                        BuffaloCount = 12,
                        BusinessName = "Surya Dairy",
                        ContactName = "Vimal",
                        ContactNumber = "2224567890",
                        CowCount = 4,
                        Landmark = "Near the temple",
                        Latitude = 43.123456,
                        Longitude = -81.123456,
                        Pincode = "123456",
                        MilkProduction = 200,
                    },
                    new DairyFarm{
                        AddedBy = users[0],
                        AddedDate = DateTime.UtcNow,
                        Address = "789 Main St",
                        City = "London",
                        Area = "Ontario",
                        BuffaloCount = 5,
                        BusinessName = "Verma Dairy",
                        ContactName = "Gopichand",
                        ContactNumber = "3334567890",
                        CowCount = 1,
                        Landmark = "Near the pani tanki",
                        Latitude = 43.123456,
                        Longitude = -81.123456,
                        Pincode = "123456",
                        MilkProduction = 100,
                    },
                    new DairyFarm{
                        AddedBy = users[0],
                        AddedDate = DateTime.UtcNow,
                        Address = "555 Main St",
                        City = "London",
                        Area = "Ontario",
                        BuffaloCount = 20,
                        BusinessName = "Yadav Dairy",
                        ContactName = "Manish",
                        ContactNumber = "2224567890",
                        CowCount = 4,
                        Landmark = "Near the school",
                        Latitude = 43.123456,
                        Longitude = -81.123456,
                        Pincode = "123456",
                        MilkProduction = 350,
                    },
                };

                await context.DairyFarms.AddRangeAsync(dairyFarms);
                await context.SaveChangesAsync();
            }
        }
    }
}
