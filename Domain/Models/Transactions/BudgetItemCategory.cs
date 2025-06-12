using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Enums.Transactions
{
    public class Payee
    {
        /// <summary>
        /// The ID of this <see cref="Payee"/>
        /// </summary>
        [Required]
        public Guid Id { get; set; }

        /// <summary>
        /// The title of the <seealso cref="Payee"/>
        /// </summary>
        public string? PayeeName { get; set; }
    }
}