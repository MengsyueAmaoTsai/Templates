$testFailed = $false

$template = "./src/strategy/TradingView"
$projectDirectory = "./MyTradingViewStrategy"

dotnet new install $template --force
dotnet new strategy-tv -n MyTradingViewStrategy -o $projectDirectory
Push-Location $projectDirectory

if (Test-Path "./.template.config") {
    Write-Host "Test failed: .template.config directory should not exist."
    $testFailed = $true
}

if (-not $testFailed) {
    Write-Host "All tests passed."
}

# Clean up
Pop-Location
if (Test-Path $projectDirectory) {
    Remove-Item -Recurse -Force $projectDirectory
}
