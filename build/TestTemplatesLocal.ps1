# Testing RichillCapital.Templates.Api.AspNet creation and build test published 

Write-Host "Testing RichillCapital.Templates.Api.AspNet template"

mkdir TestAspNetApp
Push-Location TestAspNetApp

dotnet new api-aspnet -n TestAspNetApp -o ./

dotnet build ./TestAspNetApp.Api.sln -c Release

docker compose up -d 

dotnet test ./TestAspNetApp.Api.sln -c Release 

docker compose down

dotnet publish ./TestAspNetApp.Api.sln -c Release -o ./artifacts

docker build -t .

Pop-Location

Remove-Item -Recurse -Force TestAspNetApp

Write-Host "RichillCapital.Templates.Api.AspNet template test passed"