using System.ComponentModel.DataAnnotations;

namespace Attribute
{
    public class GenderAttribute : ValidationAttribute
    {
        public GenderAttribute(string other)
        {
            _other = other.ToLower();
        }
        public GenderAttribute()
        {
        }
        private string _other = "male";
        public override bool IsValid(object value)
        {
            if (!(value is string))
            {
                return false;   // just for trying...

            }
            string str = ((string)value).ToLower();

            return str == "male" || str == "female" || str == _other;
        }

    }
}
