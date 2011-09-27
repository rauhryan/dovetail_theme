using DovetailTheme.Actions;
using DovetailTheme.Actions.Home;
using FubuMVC.Core;
using FubuMVC.Spark;

namespace DovetailTheme
{
    public class ConfigureFubuMVC : FubuRegistry
    {
        public ConfigureFubuMVC()
        {
            // This line turns on the basic diagnostics and request tracing
            IncludeDiagnostics(true);

            // All public methods from concrete classes ending in "Controller"
            // in this assembly are assumed to be action methods
            Actions
                .IncludeTypes(x=>x.Name.EndsWith("Action"))
                .IncludeClassesSuffixedWithController();

            // Policies
            Routes
                .HomeIs<HomeAction>(x => x.Get(null))
                .IgnoreControllerNamesEntirely()
                .IgnoreMethodSuffix("Html")
                .RootAtAssemblyNamespace();

            this.UseSpark();

            // Match views to action methods by matching
            // on model type, view name, and namespace
            Views.TryToAttachWithDefaultConventions();
       
        }
    }
}