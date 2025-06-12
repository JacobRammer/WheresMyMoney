using App.Mediatr.Payees;
using Domain.Enums.Transactions;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Payees
{
    public class PayeeController : BaseApiController
    {

        /// <summary>
        /// Gets all <see cref="Payee"/>s from the DB
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllPayees()
        {
            return HandleResults(await Mediator.Send(new GetAllPayees.Query()));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayee(Guid id)
        {
            return HandleResults(await Mediator.Send(new DeletePayee.Command { IdOfPayeeToDelete = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayee(Payee payee)
        {
            return HandleResults(await Mediator.Send(new CreatePayee.Command { PayeeToCreate = payee }));
        }
    }
}