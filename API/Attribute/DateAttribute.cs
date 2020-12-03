using System;
using System.ComponentModel.DataAnnotations;

namespace Attribute
{
    public class DateAttribute : ValidationAttribute //TODO change the name of the class and add a nice message
    {
        public override bool IsValid(object value)
        {
            if (!(value is DateTime))
            {
                return false;   // just for trying...

            }
            DateTime dt = (DateTime)value;
            return dt.Date <= DateTime.Today.AddYears(-18);

        }


    }
}
