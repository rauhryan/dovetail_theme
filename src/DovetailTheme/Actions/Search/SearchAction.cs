using FubuMVC.Core;

namespace DovetailTheme.Actions.Search
{
    public class SearchAction
    {
        public SearchResultModel Get(SearchRequest request)
        {
            return new SearchResultModel();
        }
    }

    public class SearchRequest
    {
    }

    public class SearchResultModel
    {
    }
}