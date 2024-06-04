FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://*:8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["ClimatePlatform.csproj", "."]

RUN dotnet restore "./ClimatePlatform.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "ClimatePlatform.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ClimatePlatform.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ClimatePlatform.dll"]