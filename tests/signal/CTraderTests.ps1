$testFailed = $false

$template = "./src/signal/CTrader"
$projectDirectory = "./MyCTraderSignalSource"

dotnet new install $template --force

dotnet new web-nuxt -n MyCTraderSignalSource -o $projectDirectory
Push-Location $projectDirectory

if (Test-Path "./.template.config") {
    Write-Host "Test failed: .template.config directory should not exist."
    $testFailed = $true
}

if (-not $testFailed) {
    Write-Host "All tests passed."
}

dotnet build ./MyCTraderSignalSource.sln -c Release /p:AlgoPublish=true /p:IncludeSource=false

# Clean up
Pop-Location
if (Test-Path $projectDirectory) {
    Remove-Item -Recurse -Force $projectDirectory
}

dotnet new uninstall $template