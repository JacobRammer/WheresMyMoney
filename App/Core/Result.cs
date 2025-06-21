using Domain.Models.Accounts;

namespace App.Core;

/// <summary>
/// The result of the Mediatr command
/// </summary>
/// <typeparam name="T">the type of return value</typeparam>
public class Result<T>
{
    public bool IsSuccess { get; set; }
    public bool IsNotFound { get; set; }

    public T Value { get; set; }

    public string Error { get; set; }

    public static Result<T> Success(T value) => new Result<T>() { IsSuccess = true, Value = value };

    public static Result<T> Failure(string error) => new Result<T>() { IsSuccess = false, Error = error };
    public static Result<T> NotFound(string error) => new Result<T>() { IsNotFound = true, Error = error };
}