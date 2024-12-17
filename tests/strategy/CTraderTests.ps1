$testFailed = $false

$template = "./src/strategy/CTrader"
$projectDirectory = "./MyCTraderStrategy"

dotnet new install $template --force
dotnet new strategy-ct -n MyCTraderStrategy -o $projectDirectory
Push-Location $projectDirectory

if (Test-Path "./.template.config") {
    Write-Host "Test failed: .template.config directory should not exist."
    $testFailed = $true
}

if (-not $testFailed) {
    Write-Host "All tests passed."
}

dotnet build ./MyCTraderStrategy/MyCTraderStrategy.csproj -c Release /p:AlgoPublish=true /p:IncludeSource=false

# Clean up
Pop-Location
if (Test-Path $projectDirectory) {
    Remove-Item -Recurse -Force $projectDirectory
}