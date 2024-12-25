ARG DOTNET_VERSION=8.0

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_VERSION} AS build

WORKDIR /app

COPY . .

RUN dotnet restore ./RazorPagesApp.Web.sln --nologo
RUN dotnet publish ./src/RazorPagesApp.Web/RazorPagesApp.Web.csproj -c Release -o ./artifacts --no-restore --nologo

FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_VERSION} AS runtime
WORKDIR /app

COPY --from=build ./app/artifacts ./

ENTRYPOINT [ "dotnet", "RazorPagesApp.Web.dll" ]