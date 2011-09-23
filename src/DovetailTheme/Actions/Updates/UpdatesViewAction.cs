using System.Collections.Generic;

namespace DovetailTheme.Actions.Updates
{
    public class UpdatesViewAction
    {
        public UpdatesListView Execute(UpdatesRequest request)
        {
            return new UpdatesListView()
                   {
                       Items =  {new UpdateItem(){Description = "hi"}}
                   };
        }
    }


    public class UpdatesListView
    {
        public IList<UpdateItem> Items { get; set; }
    }

    public class UpdateItem
    {
        public string Description { get; set; }
    }

    public class UpdatesRequest
    {
        
    }
}