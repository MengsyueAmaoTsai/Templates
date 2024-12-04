$testFailed = $false

$template = "./src/api/AspNet"
$projectDirectory = "./MyAspNetApp"

dotnet new install $template --force

dotnet new api-aspnet -n MyAspNetApp -o $projectDirectory
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

dotnet build ./MyAspNetApp.Api.sln -c Release --nologo
dotnet test ./MyAspNetApp.Api.sln -c Release --no-restore --no-build --nologo
dotnet publish ./src/MyAspNetApp.Api/MyAspNetApp.Api.csproj -c Release --no-restore --no-build --nologo

docker build -t aspnet-api .

# Clean up
Pop-Location
if (Test-Path $projectDirectory) {
    Remove-Item -Recurse -Force $projectDirectory
}
