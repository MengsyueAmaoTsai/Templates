```yml
name: Asp.Net Api Template CI

on:
  push:
    branches:
      - feature/api/aspnet
      - develop

env:
  DOTNET_VERSION: 8.0.x
  BUILD_CONFIGURATION: Release

jobs:
  build:
    runs-on: windows-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup .NET SDK
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: ${{ env.DOTNET_VERSION }}

      - name: Install template
        run: dotnet new install ./templates/Api/AspNet

      - name: Build and test ASP.NET api template
        run: |
          mkdir TestAspNetApp
          Push-Location TestAspNetApp

          dotnet new api-aspnet -n TestAspNetApp -o .

          dotnet build ./TestAspNetApp.Api.sln -c ${{ env.BUILD_CONFIGURATION }} 
          dotnet test ./TestAspNetApp.Api.sln -c ${{ env.BUILD_CONFIGURATION }} 
          dotnet publish ./src/TestAspNetApp.Api/TestAspNetApp.Api.csproj -c ${{ env.BUILD_CONFIGURATION }} -o ./artifacts

          Pop-Location
          Remove-Item -Recurse -Force TestAspNetApp
```

```yml
name: Develop Pipeline

on:
  workflow_run:
    workflows:
      - Asp.Net Api Template CI

    types:
      - completed

defaults:
  run:
    shell: pwsh

env:
  PROJECT_ID: RichillCapital.Templates
  BUILD_CONFIGURATION: Debug
  ARTIFACTS_DIRECTORY: ./artifacts

jobs:
  pack-debug-artifacts:
    runs-on: windows-latest

    if: github.ref_name == 'develop'

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup NuGet.exe
        uses: NuGet/setup-nuget@v1
        with:
          nuget-version: latest

      - name: Generate version
        id: version
        run: echo "::set-output name=version::$(date +'%Y.%m.%d').$(git rev-list --count HEAD)"

      - name: Pack templates
        run: |
          nuget pack ./${{ env.PROJECT_ID }}.nuspec -OutputDirectory ${{ env.ARTIFACTS_DIRECTORY }} -NoDefaultExcludes -Prop Configuration=${{ env.BUILD_CONFIGURATION }} -Version ${{ steps.version.outputs.version }}

      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: ${{ env.PROJECT_ID }}-${{ steps.version.outputs.version }}-${{ env.BUILD_CONFIGURATION }}
          path: ${{ env.ARTIFACTS_DIRECTORY }}
```
