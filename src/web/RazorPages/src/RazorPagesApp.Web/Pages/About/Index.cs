using System.Reflection;
using System.Runtime.InteropServices;

using Microsoft.AspNetCore.Mvc;

namespace RazorPagesApp.Web.Pages.About;

public sealed class AboutViewModel(IHostEnvironment _environment) : ViewModel
{
    public required string AppVersion { get; set; }
    public required string EnvironmentName { get; set; }

    public required string DotNetVersion { get; set; }

    public ActionResult OnGet()
    {
        AppVersion = Assembly.GetEntryAssembly()?.GetName().Version?.ToString() ?? string.Empty;
        EnvironmentName = _environment.EnvironmentName;
        DotNetVersion = RuntimeInformation.FrameworkDescription;
        return Page();
    }
}