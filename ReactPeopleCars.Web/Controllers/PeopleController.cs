using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleCars.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPeopleCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private IConfiguration _configuration;

        public PeopleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("getall")]
        [HttpGet]
        public List<Person> GetAll()
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            return repo.GetAll();
        }

        [Route("getallcars")]
        [HttpGet]
        public List<Car> GetAllCars(int id)
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            return repo.GetAllCarsById(id);
        }

        [Route("addperson")]
        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            repo.Add(person);
        }

        [Route("addcar")]
        [HttpPost]
        public void AddCar(Car car)
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            repo.AddCar(car);
        }

        [Route("getnamebyid")]
        [HttpGet]
        public string GetNameById(int id)
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            return repo.GetNameById(id);
        }

        [Route("deletecars")]
        [HttpPost]
        public void DeleteCars(int id)
        {
            var repo = new PersonCarsRepository(_configuration.GetConnectionString("ConStr"));
            repo.DeleteCars(id);
        }


    }
}
