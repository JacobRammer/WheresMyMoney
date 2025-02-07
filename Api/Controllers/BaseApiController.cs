using App.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase
{
    private IMediator _mediator;
    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

    /// <summary>
    /// Result returned from Mediatr commands
    /// </summary>
    /// <param name="result">the result of the command</param>
    /// <typeparam name="T">the type of data returned</typeparam>
    /// <returns></returns>
    protected ActionResult HandleResults<T>(Result<T> result)
    {
        if (result == null)
            return NotFound();
        if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);
        if (result.IsSuccess && result.Value == null)
            return NotFound();
        return BadRequest(result.Error);
    }
}