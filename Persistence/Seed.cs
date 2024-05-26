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
            if (!userManager.Users.Any() && !context.Activities.Any())
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

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Venue = "The Louvre",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 1",
                        Date = DateTime.UtcNow.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Category = "music",
                        City = "London",
                        Venue = "Wembly Stadium",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 2",
                        Date = DateTime.UtcNow.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Category = "food",
                        City = "London",
                        Venue = "Jamies Italian",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 3",
                        Date = DateTime.UtcNow.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 4",
                        Date = DateTime.UtcNow.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "British Museum",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 5",
                        Date = DateTime.UtcNow.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Punch and Judy",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.UtcNow.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "O2 Arena",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.UtcNow.AddMonths(7),
                        Description = "Activity 7 months in future",
                        Category = "travel",
                        City = "Berlin",
                        Venue = "All",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.UtcNow.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    }
                };

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
                        ContactNumber = "123-456-7890",
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
                        ContactNumber = "222-456-7890",
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
                        ContactNumber = "333-456-7890",
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
                        ContactNumber = "222-456-7890",
                        CowCount = 4,
                        Landmark = "Near the school",
                        Latitude = 43.123456,
                        Longitude = -81.123456,
                        Pincode = "123456",
                        MilkProduction = 350,
                    },
                };

                await context.DairyFarms.AddRangeAsync(dairyFarms);
                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
