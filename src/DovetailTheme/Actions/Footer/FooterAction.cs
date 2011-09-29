using System;

namespace DovetailTheme.Actions.Footer
{
    public class FooterAction
    {
        public FooterModel Get(FooterRequest request)
        {
            return new FooterModel()
                   {
                       CompanyName = "Dovetail Software, Inc.", //should come from DLL
                       Version = this.GetType().Assembly.GetName().Version,
                       CopyrightYear = DateTime.Now.Year.ToString()

                   };
        }
    }

    public class FooterRequest
    {
    }

    public class FooterModel
    {
        public Version Version { get; set; }
        public string CopyrightYear { get; set; }
        public string CompanyName { get; set; }
    }
}