using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleCars.Data
{
    public class PersonCarsRepository
    {
        private readonly string _connectionString;
        public PersonCarsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person> GetAll()
        {
            using var context = new PeopleCarDataContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }
        public void Add(Person person)
        {
            using var context = new PeopleCarDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void AddCar(Car car)
        {
            using var context = new PeopleCarDataContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
        }
        public string GetNameById(int id)
        {
            using var context = new PeopleCarDataContext(_connectionString);
            var person = context.People.FirstOrDefault(p => p.Id == id);

            return $"{person.FirstName} {person.LastName}";
        }

        public List<Car> GetAllCarsById(int id)
        {
            using var context = new PeopleCarDataContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == id).ToList();
        }

       
        public void DeleteCars(int id)
        {
            using var context = new PeopleCarDataContext(_connectionString);
            var cars = context.Cars.Where(c => c.PersonId == id).ToList();
            context.Cars.RemoveRange(cars);
            context.SaveChanges();
        }
    }
}
