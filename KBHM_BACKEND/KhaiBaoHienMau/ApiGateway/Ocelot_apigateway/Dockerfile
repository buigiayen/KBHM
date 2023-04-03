#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["ApiGateway/Ocelot_apigateway/hienmau.bvdktinhthanhhoa.com.vn.pfx", "ApiGateway/Ocelot_apigateway/"]
COPY ["ApiGateway/Ocelot_apigateway/Ocelot_apigateway.csproj", "ApiGateway/Ocelot_apigateway/"]
COPY ["Services.lib/Services.lib.csproj", "Services.lib/"]
RUN dotnet restore "ApiGateway/Ocelot_apigateway/Ocelot_apigateway.csproj"
COPY . .
WORKDIR "/src/ApiGateway/Ocelot_apigateway"
RUN dotnet build "Ocelot_apigateway.csproj" -c Release -o /app/build


FROM build AS publish
RUN dotnet publish "Ocelot_apigateway.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Ocelot_apigateway.dll"]
