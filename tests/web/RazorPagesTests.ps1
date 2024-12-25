$testFailed = $false

$template = "./src/web/RazorPages"
$projectDirectory = "./MyRazorPagesApp"

dotnet new install $template --force

dotnet new web-razor -n MyRazorPagesApp -o $projectDirectory
Push-Location $projectDirectory

$binDirectories = Get-ChildItem -Recurse -Directory -Path . -Filter bin

if ($binDirectories.Count -gt 0) {
    Write-Host "Test failed: bin directories should not exist."
    $testFailed = $true
}

if (Test-Path "./.template.config") {
    Write-Host "Test failed: .template.config directory should not exist."
    $testFailed = $true
}

if (-not $testFailed) {
    Write-Host "All tests passed."
}

dotnet build ./MyRazorPagesApp.Web.sln -c Release --nologo
dotnet test ./MyRazorPagesApp.Web.sln -c Release --no-restore --no-build --nologo
dotnet publish ./src/MyRazorPagesApp.Web/MyRazorPagesApp.Web.csproj -c Release --no-restore --no-build --nologo

# Clean up
Pop-Location
if (Test-Path $projectDirectory) {
    Remove-Item -Recurse -Force $projectDirectory
}
