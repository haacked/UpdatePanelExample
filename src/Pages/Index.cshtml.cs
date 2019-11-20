using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace MvcExplorations.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }
        
        [Required]
        [BindProperty]
        public string TheValue { get; set; }
        
        public string TheMessage { get; private set; }

        public IActionResult OnGet()
        {
            TheMessage = "Nothing yet";
            return Page();
        }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                return OnGet();
            }

            TheMessage = $"Yay, you posted '{TheValue}'";

            if (Request.IsAjaxRequest())
            {
                // Typically you'd return a partial here.
                return Content(TheMessage);
            }

            return Page();
        }
    }
}
