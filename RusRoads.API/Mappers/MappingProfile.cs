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
  
        CreateMap<EmployeeDto, Employee>()
            // .ForMember(dest => dest.SubdivisionId, opt => opt.MapFrom(src => src.Subdivision.Id))
            // .ForMember(dest => dest.Subdivision, opt => opt.Ignore())
            .ForMember(dest => dest.Events, opt => opt.Ignore())
            .ForMember(dest => dest.Events, opt => opt.Ignore())
            .ForMember(dest => dest.Head, opt => opt.Ignore())
            .ForMember(dest => dest.Helper, opt => opt.Ignore())
            .ForMember(dest => dest.ManagedId, opt => opt.Ignore())
            .ForMember(dest => dest.ManagedSubdivision, opt => opt.Ignore())
            .ForMember(dest => dest.Subdivision, opt => opt.Ignore())
            .ForMember(dest => dest.DismissDate, opt => opt.Ignore());


        CreateMap<Event,EventDto>().ReverseMap();



        
    }
}