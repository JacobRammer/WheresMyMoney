using Domain.Enums;

namespace Domain.Models.Accounts;

/// <summary>
/// An account that represents a credit account (ie: credit card or line of credit)
/// </summary>
public class CreditAccount : AccountBase
{
    public AccountType Type => AccountType.Credit;
}