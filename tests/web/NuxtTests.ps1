$testFailed = $false

$template = "./src/web/Nuxt"
$projectDirectory = "./MyNuxtApp"

dotnet new install $template --force

dotnet new web-nuxt -n my-nuxt-app -o $projectDirectory
Push-Location $projectDirectory

if (Test-Path "./.nuxt") {
    Write-Host "Test failed: .nuxt directory should not exist."
    $testFailed = $true
}

if (Test-Path "./.output") {
    Write-Host "Test failed: .output directory should not exist."
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
pnpm run lint 
pnpm run test
pnpm run build

docker build -t .

# Clean up
Pop-Location
if (Test-Path $projectDirectory) {
    Remove-Item -Recurse -Force $projectDirectory
}
