# Testing RichillCapital.Templates.Api.AspNet creation and build test published 

Write-Host "Testing RichillCapital.Templates.Api.AspNet template"

mkdir TestAspNetApp
Push-Location TestAspNetApp

dotnet new api-aspnet -n TestAspNetApp -o ./

dotnet build ./TestAspNetApp.Api.sln -c Release --no-logo
dotnet test ./TestAspNetApp.Api.sln -c Release --no-logo
dotnet publish ./TestAspNetApp.Api.sln -c Release --no-logo -o ./artifacts

Pop-Location

Remove-Item -Recurse -Force TestAspNetApp

Write-Host "RichillCapital.Templates.Api.AspNet template test passed"