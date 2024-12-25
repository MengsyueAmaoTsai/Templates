$testFailed = $false

$template = "./src/web/Next"
$projectDirectory = "./MyNextApp"

dotnet new install $template --force

dotnet new web-next -n my-next-app -o $projectDirectory
Push-Location $projectDirectory

if (Test-Path "./.next") {
    Write-Host "Test failed: .next directory should not exist."
    $testFailed = $true
}

if (Test-Path "./out") {
    Write-Host "Test failed: out directory should not exist."
    $testFailed = $true
}

if (Test-Path "./node_modules") {
    Write-Host "Test failed: node_modules directory should not exist."
    $testFailed = $true
}

if (Test-Path "./.template.config") {
    Write-Host "Test failed: .template.config directory should not exist."
    $testFailed = $true
}

if (-not $testFailed) {
    Write-Host "All tests passed."
}

pnpm i 
pnpm run build

# Clean up
Pop-Location
if (Test-Path $projectDirectory) {
    Remove-Item -Recurse -Force $projectDirectory
}

