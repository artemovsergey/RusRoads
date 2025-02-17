using AutoMapper;
using RusRoads.API.Dtos;
using RusRoads.API.Entities;

namespace RusRoads.API.Mappers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Subdivision, SubdivisionDto>();
        CreateMap<Employee, EmployeeDto>();
    }
}