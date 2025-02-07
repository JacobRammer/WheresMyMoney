using System.Reflection.Metadata;
using App.Mediatr.BudgetCategory;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.BudgetGroup;

public class BudgetGroupController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return HandleResults(await Mediator.Send(new GetAll.Query()));
    }
}