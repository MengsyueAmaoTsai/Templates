$testFailed = $false

$template = "./src/lib/NuGet"
$projectDirectory = "./MyNuGetLibrary"

dotnet new install $template --force

dotnet new lib-nuget -n MyNuGetLibrary -o $projectDirectory
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

dotnet build ./MyNuGetLibrary.sln -c Release --nologo

# Clean up
Pop-Location
if (Test-Path $projectDirectory) {
    Remove-Item -Recurse -Force $projectDirectory
}
