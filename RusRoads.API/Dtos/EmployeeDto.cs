
using System.ComponentModel.DataAnnotations.Schema;
using RusRoads.API.Entities;

namespace RusRoads.API.Dtos;

public class EmployeeDto
{


    public int Id { get; set; }
    public string Fio { get; set; } = string.Empty;

    public int SubdivisionId { get; set; }
    public SubdivisionDto? Subdivision { get; set; }

    public DateTime Birthday { get; set; }
    public string Position { get; set; }

    public int? HeadId { get; set; } = null;



    public int? HelperId { get; set; } = null;

    public string JobPhone { get; set; }
    public string Phone { get; set; }
    public string Cabinet { get; set; }
    public string Email { get; set; }
    public DateTime? DismissDate { get; set; } = null;

}