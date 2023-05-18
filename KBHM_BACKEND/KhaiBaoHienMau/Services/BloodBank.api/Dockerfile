#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Services/BloodBank.api/BloodBank.api.csproj", "Services/BloodBank.api/"]
RUN dotnet restore "Services/BloodBank.api/BloodBank.api.csproj"
COPY . .
WORKDIR "/src/Services/BloodBank.api"
RUN dotnet build "BloodBank.api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BloodBank.api.csproj" -c Release -o /app/publish /p:UseAppHost=false


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /etc/ssl/openssl.cnf
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /usr/lib/ssl/openssl.cnf 
ENTRYPOINT ["dotnet", "BloodBank.api.dll"]